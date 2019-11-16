// Code for consuming API

const LOGIN_API_URL = process.env.LOGIN_API_URL || 'http://backend.login.com';
const LOGIN_API_PORT = process.env.LOGIN_API_PORT || '9090';
const LOGIN_API = LOGIN_API_URL + ":" + LOGIN_API_PORT;

export async function login(username, password) {
    let url = LOGIN_API + "/app/login";

    let credentials = new FormData();
    credentials.append('username', username);
    credentials.append('password', password);

    let res = await fetch(url, {
        method: 'POST'
        , mode: 'cors'
        , credentials: 'include'
        , body: credentials
    });

    return res.status === 200;
};

export async function logout() {
    let url = LOGIN_API + "/app/logout";

    let res = await fetch(url, {
        method: 'GET'
        , mode: 'cors'
        , credentials: 'include'
    });

    return res.status === 200;
}