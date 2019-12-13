import { Button, Container, Grid, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import * as Client from '../http/Client';
import { AccountForm } from './AccountForm';
import { buildAccountInfoRequest } from './common';
import { PersonalForm } from './PersonalForm';
import { RegistrationContext, useStyles } from './Registration';
import { ReviewForm } from './ReviewForm';
export function ParentForm() {
    const classes = useStyles();
    const { data } = React.useContext(RegistrationContext);
    const [step, setStep] = useState(0);
    const [action, setAction] = useState('register');
    if (action === 'login') {
        return <Route>
            <Redirect to={{
                pathname: "/login"
            }}>
            </Redirect>
        </Route>;
    }
    const forms = [
        { label: 'Personal Information', form: <PersonalForm /> },
        { label: 'Account Information', form: <AccountForm /> },
        { label: 'Finish and Review', form: <ReviewForm /> }
    ];
    // validate when each page before clicking next
    const handleStepChange = (diff) => async () => {
        const newStep = step + diff;
        if (newStep >= 0 && newStep < forms.length) {
            setStep(newStep);
        }
        else if (newStep === forms.length) {
            const accountInfo = buildAccountInfoRequest(data);
            const success = await Client.registerAccount(accountInfo);
            if (success) {
                // redirect to login page
                console.log("Succesfully registered user!");
                setAction('login');
            }
            else {
                // show error pop up
                console.log("Failed to register!");
                setAction('error');
            }
        }
    };
    return (<Container component="main" maxWidth="md" className={classes.container}>
        <Typography variant="h5" component="h1" className={classes.heading}>Registration</Typography>
        <Container>
            <Stepper activeStep={step} className={classes.stepper}>
                {forms.map(form => <Step key={form.label} completed={false}>
                    <StepLabel>{form.label}</StepLabel>
                </Step>)}
            </Stepper>
            {forms[step].form}
            <Grid container spacing={1} item sm={12} justify="space-between">
                <Grid item sm={6} container justify="flex-start">
                    <Button color="secondary" variant="contained" onClick={handleStepChange(-1)}>Back</Button>
                </Grid>
                <Grid item sm={6} container justify="flex-end">
                    <Button color="primary" variant="contained" onClick={handleStepChange(1)}>{step === forms.length - 1 ? "Finish" : "Next"}</Button>
                </Grid>
            </Grid>
        </Container>
    </Container>);
}
