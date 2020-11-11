import axios from "axios";
import common from "./common";
import { responseFormat } from "./util/util.common";
import AsyncStorage from "@react-native-community/async-storage";

// const HOST = `http://${common.config.HOST}:${common.config.PORT}`
const HOST = `http://${common.config.API}`;
// const HOST = `https://${common.config.API}`;

let headers: { [key in string]: string } = {};

/* __SUPPPORT__ */
export async function initialize() {
    try {
        // Token
        let token = await AsyncStorage.getItem('socketcluster.authToken');
        if (token) headers = Object.assign(headers, { authorization: `Bearer ${token}` })
    } catch (error) {
        console.error(error)
    }
}

export function config(option: { [key in string]: string }) {
    headers = Object.assign(headers, option)
}

export function getHeaders() {
    return headers;
}

export function getHost() {
    return HOST;
}

/* __API__ */
export async function register(payload: { email: string, password: string, confirmPassword: string, firstName: string, lastName: string }) {
    try {
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
            await AsyncStorage.setItem('socketcluster.authToken', token);
        }

        return data;
    } catch (error) {
        console.error(error)
    }
}

export async function login(email: string, password: string) {
    try {
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
            await AsyncStorage.setItem('socketcluster.authToken', token);
        }

        return data;

    } catch (error) {
        console.error(error)
    }
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
    try {
        // Request
        let response = await axios.post(`${HOST}/auth/logout`, {}, { headers });
        // Format data
        let data = responseFormat(response);
        // Handle
        if (data.success) {
            headers = Object.assign(headers, { authorization: '' })
            await AsyncStorage.removeItem('socketcluster.authToken')
        }
        return data;
    } catch (error) {
        console.error(error)
    }
}

export async function getUser() {
    let response = await axios.get(`${HOST}/user`, { headers });
    return responseFormat(response);
}

export async function uploadAvatar(payload: FormData) {
    // Request
    let response = await axios.post(`${HOST}/upload/avatar`, payload,
        {
            headers: Object.assign({}, headers, {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data;',
            })
        }
    );
    // Format data
    let data = responseFormat(response);
    // Return
    return data;
}