import axios from "axios";
import common from "./common";
import util from "./util";
import { responseFormat } from "./util/CommonUtils";

let headers: { [key in string]: string } = {};

/* __SUPPPORT__ */
export function initialize() {
    // Token
    let token = localStorage.getItem('authorization');
    if (token) headers = Object.assign(headers, { authorization: `Bearer ${token}` })
}

export function config(option: { [key in string]: string }) {
    headers = Object.assign(headers, option)
}

export function getHeaders() {
    return headers;
}

/* __API__ */
export async function register(email: string, password: string, confirmPassword: string) {
    // Request
    let response = await axios.post(`${common.config.HOST}/auth/register`, { email, password, confirmPassword }, { headers });
    // Format data
    let data = responseFormat(response);
    // Save token
    if (data.success) {
        // Get token
        let token = data.data.authorization;
        // Asign token
        headers = Object.assign(headers, { authorization: `Bearer ${token}` })
        // Save token
        localStorage.setItem('authorization', token);
    }

    return data;
}

export async function login(email: string, password: string) {
    // Request
    let response = await axios.post(`${common.config.HOST}/auth/login`, { email, password }, { headers });
    // Format data
    let data = responseFormat(response);
    // Save token
    if (data.success) {
        // Get token
        let token = data.data.authorization;
        // Asign token
        headers = Object.assign(headers, { authorization: `Bearer ${token}` })
        // Save token
        localStorage.setItem('authorization', token);
    }

    return data;
}

export async function token() {
    // Request
    let response = await axios.post(`${common.config.HOST}/auth/token`, {}, { headers });
    // Format data
    let data = responseFormat(response);
    // Check token exist or expired
    if (!data.success) {    // If success fail remove header authorization and localstorage
        headers = Object.assign(headers, { authorization: '' })
        localStorage.removeItem('authorization')
    }

    return data;
}

export async function verify(uuid: string) {
    // Request
    let response = await axios.post(`${common.config.HOST}/auth/verify`, { uuid }, { headers });
    return responseFormat(response);;
}

export async function resendVerify() {
    // Request
    let response = await axios.post(`${common.config.HOST}/auth/resendVerify`, {}, { headers });
    return responseFormat(response);;
}

export async function logout() {
    // Request
    let response = await axios.post(`${common.config.HOST}/auth/logout`, {}, { headers });
    // Format data
    let data = responseFormat(response);
    // Handle
    if (data.success) {
        headers = Object.assign(headers, { authorization: '' })
        localStorage.removeItem('authorization')
    }
    return data;
}

export async function getUser() {
    let response = await axios.get(`${common.config.HOST}/user`, { headers });
    return responseFormat(response);
}