import axios from 'axios';

let token = localStorage.tokenAuth || null;

function sendRequest() {
    const axiosSettings = {
        headers: {
            'Accept': 'application/json'
        },
        crossdomain: true
    }
    return axios.create(axiosSettings);
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
