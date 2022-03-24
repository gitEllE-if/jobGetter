import { Provider } from '@domain/Provider.js';
import { Vacancy } from '@domain/Vacancy.js';
import { instance as api } from "@api";
import { CITY, PROFESSION } from './ catalog';
import { URL_SUPERJOB, HEADER_SUPERJOB } from '@constants';
import store from '@store';

export class SuperJobProvider extends Provider {
    static name = 'superJob';
    static _url = URL_SUPERJOB;
    static _header = HEADER_SUPERJOB;

    find(filter) {
        return api.get('/provider', {headers: {
            'provider_url': SuperJobProvider._url + 'vacancies/?' + this.convertFilterToQueryStr(filter),
            'key': Object.keys(SuperJobProvider._header)[0],
            'value':Object.values(SuperJobProvider._header)[0]
          }})
            .then((response) => {
                console.log(response);
                if (response.error) {
                    throw new Error(response.error.message)
                }
                return this.convertVacanciesListResponse(response.data.objects);
            })
    }

    convertFilterToQueryStr(filter) {
        let url = '';
        url = `keyword=${filter.text}&` + `count=${filter.count}`;
        if (filter.city) {
            url += `&town=${CITY[filter.city]}`;
        }
        if (filter.profession) {
            url += `&catalogues=${PROFESSION[filter.profession]}`;
        }
        if (filter.page) {
            url += `&page=${filter.page}`;
        }
        return url;
    }

    convertVacanciesListResponse(items) {
        return items.map((item) => {
            return this.convertVacancyResponse(item)
        })
    }

    convertVacancyResponse(item) {
        let payment = '';
        let payment_from_rub = item.payment_from;
        let payment_to_rub = item.payment_to;
        const currency = item.currency ? item.currency.toUpperCase() : null;
        if (item.payment_from || item.payment_to){
            payment += item.payment_from ? `[${item.payment_from},` : '[,';
            payment += item.payment_to ? `${item.payment_to}]` : ')';
        } else {
            payment = null;
        }
        if (currency && currency !== 'RUB') {
            if (item.payment_from) {
                payment_from_rub = item.payment_from * store.state.currency[currency]?.Value;
                payment_from_rub = payment_from_rub ? payment_from_rub.toFixed(2) : payment_from_rub;
            }
            if (item.payment_to) {
                payment_to_rub = item.payment_to * store.state.currency[currency]?.Value;
                payment_to_rub = payment_to_rub ? payment_to_rub.toFixed(2) : payment_to_rub;
            }
        }
        return new Vacancy(
            SuperJobProvider.name,
            item.id,
            item.profession,
            item.client_logo,
            payment,
            item.payment_from,
            item.payment_to,
            currency,
            payment_from_rub,
            payment_to_rub,
            new Date(item.date_published * 1000).toISOString(),
            item.town.title,
            item.candidat,
            item.work,
            item.link,
            item.firm_name,
            item.vacancyRichText,
            item.type_of_work.title,
            item.experience.title,
            item.experience.title == 'Без опыта' ? true : false,
            item.place_of_work.title == 'Удалённая работа (на дому)' ? true : false,
            0
        )
    }
}
