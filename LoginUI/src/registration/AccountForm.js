import { Fade, Grid, Grow } from '@material-ui/core';
import React from 'react';
import { DataTextField, isBlank, PasswordField } from './common';
import DATA from './data';
import { RegistrationContext } from './Registration';

export function AccountForm() {
    const { data } = React.useContext(RegistrationContext);
    // const [passwordVisible, setPasswordVisible] = React.useState(false);
    return (<Grid container spacing={1} justify="space-between">
        <Grid item xs={6}>
            {/* TODO: check if username exists */}
            <DataTextField fieldId="username" fieldLabel="Username" />
        </Grid>
        <Grid item xs={12} container spacing={1}>
            <Grid item xs={6}>
                <PasswordField fieldId="password1" fieldLabel="Password" />
            </Grid>
            {!isBlank(data.password1) ?
                <Grow in={true} timeout={1000}>
                    <Grid item xs={6}>
                        <PasswordField fieldId="password2" fieldLabel="Re-enter Password" />
                    </Grid>
                </Grow> : null}
        </Grid>
        {[...Array(2).keys()].map(k => {
            let key = k + 1;
            return <React.Fragment key={k}>
                <Grid item xs={12}>
                    <DataTextField fieldId={`question${key}`} fieldLabel={`Question ${key}`} select SelectProps={{ native: true }}>
                        {DATA.securityQuestions.map(question => <option key={question}>{question}</option>)}
                    </DataTextField>
                </Grid>
                {!isBlank(data[`question${key}`]) ?
                    <Grid item xs={12}>
                        <Fade in={true}>
                            <DataTextField fieldId={`answer${key}`} fieldLabel={`Answer to Question ${key}`} />
                        </Fade>
                    </Grid> : null}
            </React.Fragment>;
        })}
    </Grid>);
}
