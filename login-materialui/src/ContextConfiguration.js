import React from 'react';

export const AppContext = React.createContext({
    defaultApp: {
        page: 'login'
    }
});

export const Page = {
    login: 'login',
    registration: 'registration',
    home: 'home',
    error: 'error',
    recoverAccount: 'recoverAccount'
}