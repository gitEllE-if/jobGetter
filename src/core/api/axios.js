import axios from 'axios';
import { eventBus } from '@plugins/EventBus';

let token = localStorage.tokenAuth || null;

function sendRequest() {
    const axiosSettings = {
        headers: {
            'Accept': 'application/json'
        },
        crossdomain: true,
        withCredentials: false
    }
    const axiosInstance = axios.create(axiosSettings);

    axiosInstance.interceptors.request.use(
        conf => {
            eventBus.$emit('beforeRequest');
            return conf;
        },
        error => {
            eventBus.$emit('requestError');
            return Promise.reject(error);
        }
    );
    axiosInstance.interceptors.response.use(
        response => {
            eventBus.$emit('afterResponse');
            return response;
        },
        error => {
            eventBus.$emit('responseError');
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}

function sendAuthRequest() {
    const axiosSettings = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + token
        },
        baseURL: process.env.VUE_APP_BASE_URL,
        crossdomain: true
    }
    return axios.create(axiosSettings);
}

export const instance = sendRequest();
export const instanceAuth = sendAuthRequest();
