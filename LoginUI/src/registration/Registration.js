import { makeStyles } from '@material-ui/core';
import 'date-fns';
import React, { useState } from 'react';
import DATA from './data';
import { ParentForm } from './ParentForm';

const DEFAULT_VALUES = DATA.fields.placeholders;

export default function Registration() {
    const validations = {};
    for (let key in DEFAULT_VALUES) {
        validations[key] = {
            error: false
            , checkForErrorMsg: () => null
        };
    }
    const [data, setData] = useState({
        ...DEFAULT_VALUES
        , validations: validations
    });
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


