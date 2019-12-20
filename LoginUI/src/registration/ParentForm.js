import { Button, Container, Grid, Step, StepLabel, Stepper, Typography, Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import * as Client from '../http/Client';
import { AccountForm } from './AccountForm';
import { buildAccountInfoRequest } from './FormComponents';
import { PersonalForm } from './PersonalForm';
import { RegistrationContext, useStyles } from './Registration';
import { ReviewForm } from './ReviewForm';
import { makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

const parentStyles = makeStyles(theme => ({
    stepLabel: {
        cursor: 'pointer'
    }
}));

export function ParentForm() {
    const classes = useStyles();
    const parentClasses = parentStyles();
    const { data } = React.useContext(RegistrationContext);
    const [step, setStep] = useState(0);
    const [action, setAction] = useState('register');
    const [errors, setErrors] = React.useState({});
    const [errorTexts, setErrorTexts] = React.useState({});
    const [alert, setAlert] = React.useState({
        open: false,
        message: ""
    });
    const validationMethods = {
        hasError: (field) => {
            let error = errors[field];
            return error !== undefined ? error : false;
        },
        hasErrorText: (field) => {
            let text = errorTexts[field];
            return text !== undefined ? text : "";
        },
        setErrorAndText: (field, isValid, text) => {
            if (isValid) {
                setErrors({
                    ...errors
                    , [field]: false
                });
                setErrorTexts({
                    ...errorTexts
                    , [field]: ""
                })
            } else {
                setErrors({
                    ...errors
                    , [field]: true
                });
                setErrorTexts({
                    ...errorTexts
                    , [field]: text
                })
            }
        }
    };

    if (action === 'login') {
        return <Route>
            <Redirect to={{
                pathname: "/login"
            }}>
            </Redirect>
        </Route>;
    }
    const forms = [
        { label: 'Personal Information', form: <PersonalForm {...validationMethods} /> },
        { label: 'Account Information', form: <AccountForm {...validationMethods} /> },
        {
            label: 'Finish and Review',
            form: <ReviewForm {...validationMethods} errors={errors} errorTexts={errorTexts}
                editActions={{
                    personal: () => setStep(0)
                    , account: () => setStep(1)
                }}
            />
        }
    ];
    // validate when each page before clicking next
    const handleStepChange = (diff) => async () => {
        const newStep = step + diff;
        if (newStep >= 0 && newStep < forms.length) {
            setStep(newStep);
        }
        else if (newStep === forms.length) {
            // check and notify of errors
            for (let field in errors) {
                if (errors[field]) {
                    setAlert({
                        ...alert,
                        open: true,
                        message: "There are errors in the form."
                    });
                    return;
                }
            }
            // Call API to register user
            const accountInfo = buildAccountInfoRequest(data);
            const success = await Client.registerAccount(accountInfo);
            if (success) {
                // redirect to login page
                setAction('login');
            }
            else {
                // show error pop up
                setAlert({
                    ...alert,
                    open: true,
                    message: "Failed to register account. Please try again later."
                });
                return;
            }
        }
    };
    return (
        <Container component="main" maxWidth="md" className={classes.container}>
            <Typography variant="h5" component="h1" className={classes.heading}>Registration</Typography>
            <Container>
                <Stepper activeStep={step} className={classes.stepper}>
                    {forms.map((form, i) => <Step key={i} completed={false}>
                        <StepLabel className={parentClasses.stepLabel} onClick={() => setStep(i)}>{form.label}</StepLabel>
                    </Step>)}
                </Stepper>
                <ErrorSnackBar open={alert.open} message={alert.message} onClose={() => setAlert({ ...alert, open: false })} />
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
        </Container>
    );
}

const snackBarStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing(1)
    }
}));

export default function ErrorSnackBar(props) {
    const { message, open, onClose } = props;
    const classes = snackBarStyles();

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
        >
            <SnackbarContent
                className={classes.error}
                message={
                    <span id="message-id" className={classes.message}>
                        <ErrorIcon className={classes.icon} />
                        {message}
                    </span>
                }
                action={[
                    //         <Button key="undo" color="primary" size="small" onClick={onClose}>
                    //             HELP
                    // </Button>,
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
}

ErrorSnackBar.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
};
