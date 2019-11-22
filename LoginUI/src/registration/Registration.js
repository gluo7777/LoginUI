import { makeStyles } from '@material-ui/core';
import 'date-fns';
import React, { useState } from 'react';
import DATA from './data';
import { ParentForm } from './ParentForm';

export default function Registration() {
    const [data, setData] = useState(DATA.fields.placeholders);
    const setDataField = (key, value) => setData({
        ...data,
        [key]: value,
    });
    return (
        <RegistrationContext.Provider value={{ data, setDataField }}>
            <ParentForm />
        </RegistrationContext.Provider>
    );
}

export const RegistrationContext = React.createContext(null);

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center"
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing(1)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    stepper: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing(1),
        backgroundColor: 'transparent'
    },
    heading: {
        marginTop: theme.spacing(1)
    }
}));


