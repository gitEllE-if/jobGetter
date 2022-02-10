import { Provider } from '@domain/Provider.js';
import { Vacancy } from '@domain/Vacancy.js';
import { instance as api } from "@api";
import { CITY, PROFESSION } from './ catalog';

export class SuperJobProvider extends Provider {
    static name = 'superJob';
    static _url = 'https://api.superjob.ru/2.0/';
    static _header = {'X-Api-App-Id': 'v3.r.135601008.45261558155cd62d2442ddf23443bce73cb1b592.cc8935b587ce50fb47744fd800d93921505b98e8'};

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
        return url;
    }

    convertVacanciesListResponse(items) {
        return items.map((item) => {
            return this.convertVacancyResponse(item)
        })
    }

    convertVacancyResponse(item) {
        let payment = '';
        if (item.payment_from || item.payment_to){
            payment += item.payment_from ? `[${item.payment_from},` : '[,';
            payment += item.payment_to ? `${item.payment_to}]` : ')';
        } else {
            payment = null;
        }
        return new Vacancy(
            SuperJobProvider.name,
            item.id,
            item.profession,
            item.client_logo,
            payment,
            item.payment_from,
            item.payment_to,
            item.currency ? item.currency.toUpperCase() : null,
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
