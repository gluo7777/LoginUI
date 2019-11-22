import { Button, Checkbox, Container, Fade, FormControlLabel, Grid, Grow, makeStyles, Step, StepLabel, Stepper, TextField, Typography } from '@material-ui/core';
import 'date-fns';
import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as Client from '../http/Client';

export default function Registration() {
    return (
        <RegistrationApp>
            <RegistrationForms />
        </RegistrationApp>
    );
}

const QUESTIONS = [
    ''
    , 'In what county were you born?'
    , 'What is your oldest cousin’s first name?'
    , 'What is the title and artist of your favorite song?'
    , 'What is your work address?'
    , 'What is your oldest sibling’s middle name?'
    , 'Would you date your cousin if you were not related?'
    , 'What is your car’s license plate number?'
];

const STATES = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

const RegistrationContext = React.createContext(null);

function RegistrationApp(props) {
    // TODO: uncomment
    // const [data, setData] = useState({
    //     firstName: '',
    //     lastName: '',
    //     gender: '',
    //     dob: '',
    //     address1: '',
    //     address2: '',
    //     apt: '',
    //     city: '',
    //     state: '',
    //     zipcode: '',
    //     email: '',
    //     phone: '',
    //     username: '',
    //     password1: '',
    //     password2: '',
    //     question1: '',
    //     question2: '',
    //     answer1: '',
    //     answer2: '',
    //     newsletter: false
    // });
    const [data, setData] = useState({
        firstName: 'William',
        lastName: 'Luo',
        gender: 'male',
        dob: '1900-11-05',
        address1: '2300 Nuclear Drive',
        address2: '',
        apt: '#400',
        city: 'Portland',
        state: 'Texas',
        zipcode: '55543',
        email: 'butt@buttmail.com',
        phone: '1234321111',
        username: 'willyb1',
        password1: 'abc123',
        password2: 'abc123',
        question1: 'In what county were you born?',
        question2: 'What is your work address?',
        answer1: 'idk',
        answer2: 'stfu',
        newsletter: true
    });

    const setDataField = (key, value) => setData({
        ...data,
        [key]: value,
    });

    return <RegistrationContext.Provider value={{ data, setDataField }}>
        {props.children}
    </RegistrationContext.Provider>
}

const useStyles = makeStyles(theme => ({
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

function RegistrationForms() {
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

    const handleStepChange = (diff) => async () => {
        const newStep = step + diff;
        if (newStep >= 0 && newStep < forms.length) {
            setStep(newStep);
        } else if (newStep === forms.length) {
            const accountInfo = buildAccountInfoRequest(data);
            const success = await Client.registerAccount(accountInfo);
            if (success) {
                // redirect to login page
                console.log("Succesfully registered user!");
                setAction('login');
            } else {
                // show error pop up
                console.log("Failed to register!")
                setAction('error');
            }
        }
    };

    return (
        <Container component="main" maxWidth="md" className={classes.container}>
            <Typography variant="h5" component="h1" className={classes.heading}>Registration</Typography>
            <Container>
                <Stepper activeStep={step} className={classes.stepper}>
                    {forms.map(form =>
                        <Step key={form.label} completed={false}>
                            <StepLabel>{form.label}</StepLabel>
                        </Step>
                    )}
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
        </Container>
    );
}

function buildAccountInfoRequest(formData) {
    let accountInfo = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        dateOfBirth: formData.dob,
        email: formData.email,
        username: formData.username,
        password: formData.password1
    };

    accountInfo.address = {
        addressLine1: formData.address1,
        addressLine2: formData.address2,
        roomNumber: formData.apt,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
        phoneNumber: formData.phone
    };

    accountInfo.preference = {
        newsletter: formData.newsletter
    };

    accountInfo.securityQuestions = [
        {
            question: formData.question1,
            answer: formData.answer1
        },
        {
            question: formData.question2,
            answer: formData.answer2
        }
    ];

    return accountInfo;
}

function DataTextField(props) {
    const { fieldId, fieldLabel, children, ...rest } = props;
    const { data, setDataField } = React.useContext(RegistrationContext);
    const handleChange = event => setDataField(fieldId, event.target.value);
    return (
        <TextField id={fieldId} name={fieldId} label={fieldLabel} value={data[fieldId]} onChange={handleChange} fullWidth required {...rest}>
            {children}
        </TextField>
    );
}

function DataCheckBox(props) {
    const { data, setDataField } = React.useContext(RegistrationContext);
    const handleChange = event => setDataField(props.fieldId, event.target.checked);
    return <FormControlLabel control={<Checkbox checked={data[props.fieldId]} onChange={handleChange} />} label={props.fieldLabel} />;
}

function PersonalForm() {
    return (
        <Grid container spacing={1} justify="flex-start">
            <Grid item xs={6}>
                <DataTextField fieldId="firstName" fieldLabel="First Name" />
            </Grid>
            <Grid item xs={6}>
                <DataTextField fieldId="lastName" fieldLabel="Last Name" />
            </Grid>
            <Grid item xs={6} container>
                <DataTextField fieldId="dob" fieldLabel="Date of Birth" type="date" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={6}>
                <DataTextField fieldId="gender" fieldLabel="Gender" select SelectProps={{ native: true }}>
                    <option key="" value=""></option>
                    <option key="male" value="male">Male</option>
                    <option key="female" value="female">Female</option>
                </DataTextField>
            </Grid>
            <Grid item sm={12}>
                <DataTextField fieldId="address1" fieldLabel="Address Line 1" />
            </Grid>
            <Grid item sm={12}>
                <DataTextField fieldId="address2" fieldLabel="Address Line 2" required={false} />
            </Grid>
            <Grid item sm={1}>
                <DataTextField fieldId="apt" fieldLabel="APT#" required={false} />
            </Grid>
            <Grid item sm={4}>
                <DataTextField fieldId="city" fieldLabel="City" />
            </Grid>
            <Grid item sm={2}>
                <DataTextField fieldId="state" fieldLabel="State" select SelectProps={{ native: true }}>
                    <option key="" value=""></option>
                    {STATES.map((state, i) => <option key={i} value={state}>{state}</option>)}
                </DataTextField>
            </Grid>
            <Grid item sm={4}>
                <DataTextField fieldId="zipcode" fieldLabel="Zip Code" />
            </Grid>
            <Grid item sm={6}>
                <DataTextField fieldId="email" fieldLabel="Email" type="email" />
            </Grid>
            <Grid item sm={6}>
                <DataTextField fieldId="phone" fieldLabel="Phone Number" required={false} />
            </Grid>
            <Grid item sm={12}>
                <DataCheckBox fieldId="newsletter" fieldLabel="Subscribe to newsletter" />
            </Grid>
        </Grid>
    );
}

const isBlank = text => !text || text.trim() === "";

function AccountForm() {
    const { data } = React.useContext(RegistrationContext);
    return (
        <Grid container spacing={1} justify="space-between">
            <Grid item xs={6}>
                <DataTextField fieldId="username" fieldLabel="Username" />
            </Grid>
            <Grid item xs={12} container spacing={1}>
                <Grid item xs={6}>
                    <DataTextField fieldId="password1" fieldLabel="Password" type="password" />
                </Grid>
                {
                    !isBlank(data.password1) ?
                        <Grow in={true} timeout={1000}>
                            <Grid item xs={6}>
                                <DataTextField fieldId="password2" fieldLabel="Re-enter Password" type="password" />
                            </Grid>
                        </Grow> : null
                }
            </Grid>
            {[...Array(2).keys()].map(k => {
                let key = k + 1;
                return <React.Fragment key={k}>
                    <Grid item xs={12}>
                        <DataTextField fieldId={`question${key}`} fieldLabel={`Question ${key}`} select SelectProps={{ native: true }}>
                            {QUESTIONS.map(question => <option key={question}>{question}</option>)}
                        </DataTextField>
                    </Grid>
                    {!isBlank(data[`question${key}`]) ?
                        <Grid item xs={12}>
                            <Fade in={true}>
                                <DataTextField fieldId={`answer${key}`} fieldLabel={`Answer to Question ${key}`} />
                            </Fade>
                        </Grid> : null}
                </React.Fragment>
            })}
        </Grid>
    );
}

/**
 * @todo
 * - add field legend
 * - add edit under each section that will go back to that page
 */
function ReviewForm() {
    const { data } = React.useContext(RegistrationContext);

    const ReviewField = (props) => (
        <Grid item xs={props.xs || 6}>
            <TextField variant="outlined" type={props.type || 'text'} id={`${props.field}Review`} name={`${props.field}Review`} label={props.label} fullWidth={props.fullWidth || false} value={data[props.field] || ''} disabled />
        </Grid>
    );

    const ReviewHeading = (props) => (
        <Grid item xs={12} container justify="flex-start" spacing={2}>
            <Grid item>
                <Typography variant="h6" component="h2">{props.children}</Typography>
            </Grid>
            <Grid item>
                <Button color="secondary" variant="contained" size="small" onClick={props.onClick}>Edit</Button>
            </Grid>
        </Grid>
    );

    return (
        <Grid container spacing={1} justify="flex-start">
            <ReviewHeading>Personal Information</ReviewHeading>
            <ReviewField field="firstName" label="First Name" fullWidth />
            <ReviewField field="lastName" label="Last Name" fullWidth />
            <ReviewField xs={4} field="gender" label="Gender" fullWidth />
            <ReviewField xs={6} field="dob" label="Date of Birth" fullWidth />
            <ReviewField xd={12} field="address1" label="Address 1" fullWidth />
            <ReviewField xd={12} field="address2" label="Address 2" fullWidth />
            <ReviewField xd={1} field="apt" label="APT#" fullWidth />
            <ReviewField xd={3} field="city" label="City" fullWidth />
            <ReviewField xd={1} field="state" label="State" fullWidth />
            <ReviewField xd={3} field="zipcode" label="Zip Code" fullWidth />
            <ReviewField xd={12} field="email" label="Email" fullWidth />
            <ReviewField xd={12} field="phone" label="Phone" fullWidth />
            <ReviewHeading>Account Information</ReviewHeading>
            <ReviewField field="username" label="User Name" fullWidth />
            <ReviewField type="password" field="password2" label="Password" fullWidth />
            <ReviewField xs={12} field="question1" label="Question 1" fullWidth />
            <ReviewField xs={12} field="answer1" label="Answer 1" fullWidth />
            <ReviewField xs={12} field="question2" label="Question 2" fullWidth />
            <ReviewField xs={12} field="answer2" label="Answer 2" fullWidth />
        </Grid>
    );
}