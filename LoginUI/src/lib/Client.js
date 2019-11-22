// Code for consuming API

const LOGIN_API_URL = process.env.LOGIN_API_URL || 'http://backend.login.com';
const LOGIN_API_PORT = process.env.LOGIN_API_PORT || '9090';
const LOGIN_API = LOGIN_API_URL + ":" + LOGIN_API_PORT;

export async function login(username, password) {
    let url = LOGIN_API + "/app/login";

    let credentials = new FormData();
    credentials.append('username', username);
    credentials.append('password', password);
    try {
        let res = await fetch(url, {
            method: 'POST'
            , mode: 'cors'
            , credentials: 'include'
            , body: credentials
        });
        return res.status === 200;
    } catch (e) {
        console.error("API Login failed with following error: ", e.msg);
    }
};

export async function logout() {
    let url = LOGIN_API + "/app/logout";

    try {
        let res = await fetch(url, {
            method: 'GET'
            , mode: 'cors'
            , credentials: 'include'
        });

        return res.status === 200;
    } catch (e) {
        console.error("API Logout failed with following error: ", e.msg);
    }
}

export async function registerAccount(accountInfo) {
    let url = LOGIN_API + "/api/registration";

    try {
        let res = await fetch(url, {
            method: 'POST'
            , mode: 'cors'
            , credentials: 'include'
            , headers: {
                "Content-Type": "application/json"
            }
            , body: JSON.stringify(accountInfo)
        });
        return res.status === 201;
    } catch (e) {
        console.error("API Registration failed with following error: ", e.msg);
    }

}