// Code for consuming API

const LOGIN_API_URL = process.env.LOGIN_API_URL || 'http://backend.login.com';
const LOGIN_API_PORT = process.env.LOGIN_API_PORT || '80';
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
        if (res.status === 200) {
            let user = await res.json();
            return user;
        }
        return null;
    } catch (e) {
        console.error("API Login failed with following error: ", e);
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
        console.error("API Logout failed with following error: ", e);
    }
}

/**
 * returns userId or null if not logged in
 * @param {Function} onSuccess - @param userInfo - for json response handling
 * @param {Function} onFailure - called when user is not logged in
 */
export async function fetchCurrentUser() {
    let url = LOGIN_API + "/api/user/current";

    try {
        let res = await fetch(url, {
            method: 'GET'
            , mode: 'cors'
            , credentials: 'include'
        });

        if (res.status === 200) {
            let json = await res.json();
            return json;
        }

        return null;
    } catch (e) {
        console.error("API failed to retrieve current user with error: ", e);
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
        console.error("API Registration failed with following error: ", e);
    }

}