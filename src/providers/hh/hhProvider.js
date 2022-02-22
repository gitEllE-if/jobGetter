import { Provider } from '@domain/Provider.js';
import { Vacancy } from '@domain/Vacancy.js';
import { instance as api } from "@api";
import { CITY, PROFESSION } from './ catalog';
import { URL_HH, HEADER_HH } from '@constants';
import store from '@store';

export class HHprovider extends Provider {
    static name = 'hh';
    static _url = URL_HH;
    static _header = HEADER_HH;

    find(filter) {
        api.interceptors.request.use(config => {
            config.headers.common[Object.keys(HHprovider._header)[0]] = Object.values(HHprovider._header)[0];
            return config;
        });
        return api.get(
            HHprovider._url + 'vacancies?' +
            this.convertFilterToQueryStr(filter)
        )
            .then((response) => {
                console.log(response);
                if (response.status != 200) {
                    throw new Error(response.statusText)
                }
                let getVacanciesList = async () => { return await this.convertVacanciesListResponse(response.data.items); };
                return getVacanciesList().then((result) => { return result });
            })
    }

    getVacancyById(id) {
        api.interceptors.request.use(config => {
            config.headers.common[Object.keys(HHprovider._header)[0]] = Object.values(HHprovider._header)[0];
            return config;
        });
        return api.get(HHprovider._url + 'vacancies/' + id)
            .then((response) => {
                if (response.status != 200) {
                    throw new Error(response.statusText)
                }
                return response.data;
            })
    }

    convertFilterToQueryStr(filter) {
        let url = '';
        url = `text=${filter.text}&` + `per_page=${filter.count}&` + 'vacancy_search_order=publication_time';
        if (filter.city) {
            url += `&area=${CITY[filter.city]}`;
        }
        if (filter.profession) {
            url += `&specialization=${PROFESSION[filter.profession]}`;
        }
        return url;
    }

    convertVacanciesListResponse(items) {
        const vacanciesArr = items.map((item) => {
            let getConvertedVacancy = async () => { return await this.convertVacancyResponse(item) };
            return getConvertedVacancy().then((result) => { return result });
        })
        return Promise.all(vacanciesArr)
            .then(async (vacancies) => {
                const newVacancies = [].concat(...vacancies);
                return newVacancies;
            })
    }

    convertVacancyResponse(item) {
        const getVacancy = async () => { return await this.getVacancyById(item.id) };
        return getVacancy().then((vacancyData) => {
            let salary = '';
            let salary_from = null;
            let salary_to = null;
            let currency = null;
            if (item.salary) {
                salary += item.salary.from ? `[${item.salary.from},` : '[,';
                salary += item.salary.to ? `${item.salary.to}]` : ')';
                currency = item.salary.currency;
                currency = currency === 'RUR' ? 'RUB' : currency,
                salary_from = item.salary.from;
                salary_to = item.salary.to;
            }
            else {
                salary = null;
            }
            let salary_from_rub = salary_from;
            let salary_to_rub = salary_to;
            if (currency && currency !== 'RUB') {
                if (salary_from) {
                    salary_from_rub = salary_from * store.state.currency[currency]?.Value;
                    salary_from_rub = salary_from_rub ? salary_from_rub.toFixed(2) : salary_from_rub;
                }
                if (salary_to) {
                    salary_to_rub = salary_to * store.state.currency[currency]?.Value;
                    salary_to_rub = salary_to_rub ? salary_to_rub.toFixed(2) : salary_to_rub;
                }
            }
            return new Vacancy(
                HHprovider.name,
                item.id,
                item.name,
                item.employer.logo_urls ? item.employer.logo_urls[90] : null,
                salary,
                salary_from,
                salary_to,
                currency,
                salary_from_rub,
                salary_to_rub,
                item.published_at,
                item.area.name,
                item.snippet.requirement ? item.snippet.requirement.replace(/[<highlighttext>|</highlighttext>]/g, '') : null,
                item.snippet.responsibility ? item.snippet.responsibility.replace(/[<highlighttext>|</highlighttext>]/g, '') : null,
                item.alternate_url,
                item.employer.name,
                vacancyData.description,
                item.schedule.name,
                vacancyData.experience.name,
                vacancyData.experience.name == 'Нет опыта' ? true : false,
                item.schedule.name == 'Удаленная работа' ? true : false,
                0
            )
        }
        )
    }
}
