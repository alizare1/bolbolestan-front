import axios from "axios";

export async function login(email, password) {
    const resp = await axios.post(
        `http://localhost:8080/api/token`,
        {'email': email, 'password': password}
    );
    return resp.data;
}

export async function signup(data) {
    const resp = await axios.post(
        `http://localhost:8080/api/signup`,
        data
    );
    return resp.data;
}

export async function resetPassword(email) {
    const resp = await axios.post(
        `http://localhost:8080/api/resetPassword`,
        {'email': email}
    );
    return resp.data;
}


export async function setNewPassword(password, jwt) {
    const resp = await axios.post(
        `http://localhost:8080/api/resetPassword/${jwt}`,
        {'password': password}
    );
    return resp.data;
}