import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { encrypt, decrypt } from '@utils/crypto.js';
import { instanceAuth as api, instance as apiGet } from '@api';
import { URL_CURRENCY, DEFAULT_CURRENCY } from '@constants';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        userLogin: 'unknown',
        user: null,
        vacancies: [],
        currency: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        },
        setUserLogin(state, login) {
            state.userLogin = login;
        },
        setVacancies(state, newVacancies) {
            state.vacancies = newVacancies;
        },
        delVacancy(state, idx) {
            state.vacancies.splice(idx, 1);
        },
        setCurrency(state, newCurrency) {
            state.currency = newCurrency;
        }
    },
    actions: {
        async getUser({ commit }) {
            try {
                const response = await api.get('/user');
                let { result } = response.data;
                if (result) {
                    result = JSON.parse(decrypt(result));
                    response.data.result = result;
                    commit('setUserLogin', result.login);
                    commit('setUser', result);
                }
                else {
                    commit('setUserLogin', 'unknown');
                }
                return response.data;
            }
            catch (err) {
                console.log('==> user get fail ' + err);
                return null;
            }
        },
        async updateUser({ commit }, payload) {
            try {
                const { id, newParam } = payload;
                const res = await api.put("/user/" + id, { user: encrypt(JSON.stringify(newParam)) });
                const { status } = res.data;
                if (status == "ok") {
                    const newUser = { ...this.state.user, [Object.keys(newParam)[0]]: Object.values(newParam)[0] }
                    commit('setUser', newUser);
                }
                return res.data;
            } catch (err) {
                console.log("==> change user failure " + err);
                return null;
            }
        },
        async updateUserPhoto({ commit }, payload) {
            try {
                const { id, photo } = payload;
                const res = await api.post("/user_photo/" + id, { photo });
                const { result, status } = res.data;
                if (status == "ok") {
                    const newUser = { ...this.state.user, photo_url: result.url }
                    commit('setUser', newUser);
                }
                return res.data;
            } catch (err) {
                console.log("==> change user photo failure " + err);
                return null;
            }
        },
        async login({ commit }, data) {
            try {
                const response = await api.post('/user', { user: encrypt(`${data.login}:${data.password}:${data.action}`) });
                let { token, user } = response.data;
                if (token) {
                    commit('setToken', token);
                    window.localStorage.setItem('tokenAuth', token);
                }
                if (user) {
                    user = JSON.parse(decrypt(user));
                    commit('setUser', user);
                    response.data.user = user;
                }
                return response.data;
            }
            catch (err) {
                console.log('==> user login fail ' + err);
                return null;
            }
        },
        async getVacanciesFromBD({ commit }) {
            try {
                const res = await api.get('/vacancies');
                const { result, status } = res.data;
                if (status == "ok") {
                    commit('setVacancies', result);
                    return result;
                }
                return null;
            } catch (err) {
                console.log(`==> get vacancies failure ` + err);
                return null;
            }
        },
        async getVacancies({ commit }, newVacancies) {
            try {
                commit('setVacancies', newVacancies);
            } catch (err) {
                console.log(`==> get vacancies failure ` + err);
                return null;
            }
        },
        async delVacancy({ commit }, id) {
            try {
                const res = await api.delete("/vacancy/" + id);
                const { status } = res.data;
                if (status == "ok" || this.state.userLogin == "unknown") {
                    const idx = this.state.vacancies.findIndex(el => el.origin_id === id);
                    if (idx !== -1) {
                        commit('delVacancy', idx);
                    }
                }
            } catch (err) {
                console.log("==> delete vacancy failure " + err);
            }
        },
        async pinVacancy({ commit }, payload) {
            try {
                const { id, pinned } = payload;
                const res = await api.put("/vacancy/" + id, { pinned });
                const { status } = res.data;
                if (status == "ok" || this.state.userLogin == "unknown") {
                    const newVacancies = this.state.vacancies.map(el => {
                        if (el.origin_id === id) {
                            return { ...el, pinned: pinned }
                        }
                        return el;
                    });
                    commit('setVacancies', newVacancies);
                }
            } catch (err) {
                console.log("==> change vacancy failure " + err);
            }
        },
        async getCurrency({ commit }){
            try {
                const res = await apiGet.get(URL_CURRENCY);
                const { Valute } = res.data;
                if (res?.requesr?.status == 200) {
                    commit('setCurrency', Valute);
                    return Valute;
                }
                return null;
            } catch (err) {
                console.log(`==> get currency failure ` + err);
                return null;
            } finally {
                if (!this.state.currency) {
                    commit('setCurrency', DEFAULT_CURRENCY);
                }
            }
        }
    },
    getters: {
        userLogin_getter: state => state.userLogin,
        user_getter: state => state.user,
        vacancies_getter: state => state.vacancies,
        vacancyById_getter: state => (id) => { return state.vacancies.find(vacancy => vacancy.origin_id == id) },
        vacanciesFavorite_getter: state => { return state.vacancies.filter(vacancy => vacancy.pinned == true) },
        vacanciesFvrtCnt_getter: state => { return state.vacancies.filter(vacancy => vacancy.pinned == true).length }
    },
    plugins: [new VuexPersistence().plugin]
})
