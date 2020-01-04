import React from 'react';

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            user: null,
            timer: null,
            display: 60
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.setField = this.setField.bind(this);
    }
    setField(field, value) {
        this.setState({ [field]: value });
    }
    login() {
        api.login(userInfo => {
            this.setState({ authenticated: true, user: userInfo.id });
            this.start();
        });
    }
    logout() {
        api.logout(() => this.setState({ authenticated: false, user: null }));
        this.stop();
    }
    stop() {
        if (this.state.timer) {
            clearTimeout(this.state.timer);
            this.setState({
                timer: null,
                display: 60
            })
        }
    }
    start() {
        if (this.state.timer !== null)
            return;
        let timer = setInterval(() => {
            this.setState(state => {
                if (state.display === 0) {
                    clearTimeout(state.timer);
                    state.timer = null;
                    state.display = 60;
                    this.logout();
                } else {
                    state.display = state.display - 1;
                }
                return state;
            });
        }, 1000);
        this.setState({ timer: timer });
    }
    async componentDidMount() {
        console.log("AppProvider mounted")
        this._isMounted = true;

        let url = LOGIN_API + "/api/user/current";
        let res = await fetch(url, {
            method: 'GET'
            , mode: 'cors'
            , credentials: 'include'
        });
        if (res.status === 200) {
            let user = await res.json();
            this.setState({ authenticated: true, user: user.username });
            this.start();
        } else {
            this.setState({ authenticated: false, user: null });
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.stop();
    }
    render() {

        return <AppContext.Provider
            value={{
                state: this.state,
                setField: this.setField,
                login: this.login,
                logout: this.logout
            }}>
            {this.props.children}
        </AppContext.Provider>
    }
}

const LOGIN_API_URL = process.env.LOGIN_API_URL || 'http://backend.login.com';
const LOGIN_API_PORT = process.env.LOGIN_API_PORT || '9090';
const LOGIN_API = LOGIN_API_URL + ":" + LOGIN_API_PORT;

const api = {
    isAuthenticated: (success, failure) => {
        let url = LOGIN_API + "/api/user/current";
        fetch(url, {
            method: 'GET'
            , mode: 'cors'
            , credentials: 'include'
        }).then(res => {
            if (res.status === 200) return res.json();
            else throw new Error();
        }).then(json => success(json))
            .catch(err => {
                console.error(err);
                failure();
            });
    },
    login: (cb) => {
        let url = LOGIN_API + "/app/login";
        let credentials = new FormData();
        credentials.append('username', 'bobbyb71');
        credentials.append('password', 'jdbcpostgresql');
        fetch(url, {
            method: 'POST'
            , mode: 'cors'
            , credentials: 'include'
            , body: credentials
        }).then(res => {
            if (res.status === 200) return res.json();
            else throw new Error();
        }).then(userInfo => {
            cb(userInfo);
        })
            .catch(err => {
                console.error(err);
            });
    },
    logout: (cb) => {
        let url = LOGIN_API + "/app/logout";
        fetch(url, {
            method: 'GET'
            , mode: 'cors'
            , credentials: 'include'
        }).then(res => {
            if (res.status === 200) cb();
            else throw new Error();
        }).catch(err => {
            console.error(err);
        });
    }
};