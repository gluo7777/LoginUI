import React from 'react';
import * as Client from '../http/Client';

export const GlobalContext = React.createContext();

// Property names
export const AUTHENTICATED = 'authenticated';
export const USERID = 'userId';

const WRITABLE = [AUTHENTICATED, USERID];

export class GlobalProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            userId: null
        }
        this.setField = (field, value) => {
            if (WRITABLE.indexOf(field) !== -1) {
                this.setState({ [field]: value });
            } else {
                throw Error(`Cannot write to ${field}. Allowed fields are ${WRITABLE}.`)
            }
        };
        this.setAuthenticated = isAuthenticated => this.setField(AUTHENTICATED, isAuthenticated);
        this.login = async (username, password) => {
            let user = await Client.login(username, password);
            let success = false;
            if (user && user.id) {
                success = true;
                this.setField(USERID, user.id);
            }
            console.log(`Login was ${success ? "successful" : "unsuccessful"}`);
            this.setAuthenticated(success);
        }
        this.logout = async () => {
            try {
                await Client.logout();
            } catch (error) {
                console.error(`Error during logout: ${error}`);
            } finally {
                this.setAuthenticated(false);
            }
        }
        this.reauthenticate = async () => {
            try {
                let user = await Client.fetchCurrentUser();
                if (user && user.id) {
                    this.setAuthenticated(true);
                    this.setField(USERID, user.id);
                }
                else {
                    this.setAuthenticated(false);
                    this.setField(USERID, null);
                }
            } catch (error) {
                console.error(`Error during reauthentication: ${error}`);
                this.setAuthenticated(false);
            }
        }
    }
    render() {
        return (
            <GlobalContext.Provider
                value={{
                    app: this.state
                    , setField: this.setField
                    , setAuthenticated: this.setAuthenticated
                    , login: this.login
                    , logout: this.logout
                    , reauthenticate: this.reauthenticate
                }}>
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

export const GlobalContextConsumer = GlobalContext.Consumer;

