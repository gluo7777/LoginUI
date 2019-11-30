import React from 'react';

export const GlobalContext = React.createContext();

export const AUTHENTICATED = 'authenticated';

const WRITABLE = [AUTHENTICATED];

export function GlobalApp(props) {
    const [app, setApp] = React.useState({
        authenticated: false
    });

    const setField = (field, value) => {
        if (WRITABLE.indexOf(field) !== -1) {
            setApp({ ...app, [field]: value });
        } else {
            throw Error(`Cannot write to ${field}. Allowed fields are ${WRITABLE}.`)
        }
    };

    const setAuthenticated = flag => setField(AUTHENTICATED, flag);

    return (
        <GlobalContext.Provider
            value={{
                app: app,
                setField: setField,
                setAuthenticated: setAuthenticated
            }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export const GlobalContextConsumer = GlobalContext.Consumer;

