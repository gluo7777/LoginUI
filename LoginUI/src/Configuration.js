import React from 'react';

export const GlobalContext = React.createContext();

export const AUTHENTICATED = 'authenticated';

const WRITABLE = [AUTHENTICATED];

export function GlobalApp(props) {
    const [app, setApp] = React.useState({
        authenticated: isLoginSuccess()
    });
    const setField = (field, value) => {
        if (WRITABLE.indexOf(field) !== -1) {
            setApp({ ...app, [field]: value });
        } else {
            throw Error(`Cannot write to ${field}. Allowed fields are ${WRITABLE}.`)
        }
    };
    return (
        <GlobalContext.Provider
            value={{
                app: app,
                setField: setField
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export const GlobalContextConsumer = GlobalContext.Consumer;

function isLoginSuccess() {
    const query = new URLSearchParams(window.location.search);
    return query ?
        query.has("loginSuccess") && query.get("loginSuccess") === "true"
        : false;
}
