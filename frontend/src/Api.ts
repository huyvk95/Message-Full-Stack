import axios from "axios";
import common from "./common";
import { responseFormat } from "./util/CommonUtils";

const HOST = `http://${common.config.HOST}:${common.config.PORT}`

let headers: { [key in string]: string } = {};

/* __SUPPPORT__ */
export function initialize() {
    // Token
    let token = localStorage.getItem('socketcluster.authToken');
    if (token) headers = Object.assign(headers, { authorization: `Bearer ${token}` })
}

export function config(option: { [key in string]: string }) {
    headers = Object.assign(headers, option)
}

export function getHeaders() {
    return headers;
}

/* __API__ */
export async function register(payload: { email: string, password: string, confirmPassword: string, firstName: string, lastName: string }) {
    // Request
    let response = await axios.post(`${HOST}/auth/register`, payload, { headers });
    // Format data
    let data = responseFormat(response);
    // Save token
    if (data.success) {
        // Get token
        let token = data.data.authorization;
        // Asign token
        headers = Object.assign(headers, { authorization: `Bearer ${token}` })
        // Save token
        localStorage.setItem('socketcluster.authToken', token);
    }

    return data;
}

export async function login(email: string, password: string) {
    // Request
    let response = await axios.post(`${HOST}/auth/login`, { email, password }, { headers });
    // Format data
    let data = responseFormat(response);
    // Save token
    if (data.success) {
        // Get token
        let token = data.data.authorization;
        // Asign token
        headers = Object.assign(headers, { authorization: `Bearer ${token}` })
        // Save token
        localStorage.setItem('socketcluster.authToken', token);
    }

    return data;
}

export async function token() {
    // Request
    let response = await axios.post(`${HOST}/auth/token`, {}, { headers });
    // Format data
    let data = responseFormat(response);
    // Check token exist or expired
    if (!data.success) {    // If success fail remove header authorization and localstorage
        headers = Object.assign(headers, { authorization: '' })
        // localStorage.removeItem('socketcluster.authToken')
    }

    return data;
}

export async function verify(uuid: string) {
    // Request
    let response = await axios.post(`${HOST}/auth/verify`, { uuid }, { headers });
    return responseFormat(response);;
}

export async function resendVerify() {
    // Request
    let response = await axios.post(`${HOST}/auth/resendVerify`, {}, { headers });
    return responseFormat(response);;
}

export async function logout() {
    // Request
    let response = await axios.post(`${HOST}/auth/logout`, {}, { headers });
    // Format data
    let data = responseFormat(response);
    // Handle
    if (data.success) {
        headers = Object.assign(headers, { authorization: '' })
        localStorage.removeItem('socketcluster.authToken')
    }
    return data;
}

export async function getUser() {
    let response = await axios.get(`${HOST}/user`, { headers });
    return responseFormat(response);
}