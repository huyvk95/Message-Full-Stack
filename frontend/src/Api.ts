import axios from "axios";
import common from "./common";
import { responseFormat } from "./util/CommonUtils";

let headers = {};

export async function login(email: string, password: string) {
    // Request
    let response = await axios.post(`${common.config.HOST}/auth/login`, { email, password });
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
    // Get token
    let token = localStorage.getItem('authorization');
    // If token not exits
    if (!token) return responseFormat()
    //Set header token
    headers = Object.assign(headers, { authorization: `Bearer ${token}` })
    // Request
    let response = await axios.post(`${common.config.HOST}/auth/token`, {}, { headers });
    // Format data
    let data = responseFormat(response);
    // Check token exist or expired
    if (!data.success) {
        localStorage.removeItem('authorization')
    }

    return data;
}

export async function logout() {
    // Request
    let response = await axios.post(`${common.config.HOST}/auth/logout`);
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