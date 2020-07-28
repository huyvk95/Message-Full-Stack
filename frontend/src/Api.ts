import axios from "axios";
import common from "./common";
import { responseFormat } from "./util/CommonUtils";

export async function login(email: string, password: string) {
    let response = await axios.post(`${common.config.HOST}/auth/login`, { email, password });
    return responseFormat(response);
}

export async function logout() {
    let response = await axios.post(`${common.config.HOST}/auth/logout`);
    return responseFormat(response);
}

export async function getUser() {
    let response = await axios.get(`${common.config.HOST}/user`);
    return responseFormat(response);
}