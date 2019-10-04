import { Button, Checkbox, Container, FormControlLabel, Grid, makeStyles, TextField, Typography, Stepper, Step, StepLabel } from '@material-ui/core';
import 'date-fns';
import React, { useState } from 'react';

const QUESTIONS = [
    'In what county were you born?'
    , 'What is your oldest cousin’s first name?'
    , 'What is the title and artist of your favorite song?'
    , 'What is your work address?'
    , 'What is your oldest sibling’s middle name?'
    , 'Would you date your cousin if you were not related?'
    , 'What is your car’s license plate number?'
];

const RegistrationContext = React.createContext(null);

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

function PersonalForm() {

    const { data, setData } = React.useContext(RegistrationContext);

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
        console.log(`Setting personal info: ${event.target.name}=${event.target.value}.`)
    };

    return (
        <Grid container spacing={1} justify="space-between">
            <Grid item xs={6}>
                <TextField id="firstName" name="firstName" label="First Name" fullWidth required value={data.firstName} onChange={handleChange}></TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField id="lastName" name="lastName" label="Last Name" fullWidth required value={data.lastName} onChange={handleChange}></TextField>
            </Grid>
            <Grid item xs={6} container>
                <TextField type="date" InputLabelProps={{ shrink: true }} id="dob" name="dob" label="Date of Birth" fullWidth required value={data.dob} onChange={handleChange}></TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    select
                    label="Gender"
                    id="gender"
                    name="gender"
                    value={data.gender}
                    onChange={handleChange}
                    fullWidth
                    required
                    SelectProps={{
                        native: true
                    }}
                >
                    <option key="" value="">
                    </option>
                    <option key="male" value="male">
                        Male
            </option>
                    <option key="female" value="female">
                        Female
            </option>
                </TextField>
            </Grid>
            <Grid item sm={12}>
                <TextField id="address1" name="address1" label="Address 1" fullWidth value={data.address1} onChange={handleChange}></TextField>
            </Grid>
            <Grid item sm={12}>
                <TextField id="address2" name="address2" label="Address 2" fullWidth value={data.address2} onChange={handleChange}></TextField>
            </Grid>
            <Grid item sm={12}>
                <TextField type="email" name="email" label="Email" fullWidth value={data.email} onChange={handleChange}></TextField>
            </Grid>
            <Grid item sm={12}>
                <FormControlLabel control={<Checkbox />}
                    label="Subscribe to newsletter" />
            </Grid>
        </Grid>
    );
}

function AccountForm() {
    const { data, setData } = React.useContext(RegistrationContext);

    const [inner, setInner] = React.useState({
        firstPassSet: false
    });

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
        console.log(`Setting account info: ${event.target.name}=${event.target.value}.`)
    };

    return (
        <Grid container spacing={1} justify="space-between">
            <Grid item xs={8}>
                <TextField id="username" name="username" label="Username" required value={data.username} onChange={handleChange}></TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField id="password1" type="password" name="password1" label="Password" fullWidth required value={data.password1}
                    onChange={event => {
                        let value = event.target.value;
                        handleChange(event);
                        setInner({ ...inner, firstPassSet: value && value !== '' })
                    }}></TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField id="password2" type="password" name="password2" label="Re-enter Password" fullWidth required value={data.password2} onChange={handleChange} disabled={!inner.firstPassSet}></TextField>
            </Grid>
            {[...Array(2).keys()].map(k => {
                let key = k + 1;
                return <React.Fragment key={k}>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label={`Question ${key}`}
                            id={`question${key}`}
                            name={`question${key}`}
                            value={data[`question${key}`]}
                            onChange={handleChange}
                            fullWidth
                            required
                            SelectProps={{
                                native: true
                            }}
                        >
                            {QUESTIONS.map(question => <option key={question}>{question}</option>)}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id={`answer${key}`} name={`answer${key}`} label={`Answer to Question ${key}`} fullWidth required value={data[`answer${key}`]} onChange={handleChange}></TextField>
                    </Grid>
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
    const { data, setData } = React.useContext(RegistrationContext);

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
        console.log(`Setting account info: ${event.target.name}=${event.target.value}.`)
    };

    return (
        <Grid container spacing={1} justify="space-between">
            <Grid item xs={6}>
                <TextField id="firstName" name="firstName" label="First Name" fullWidth required value={data.firstName} disabled></TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField id="lastName" name="lastName" label="Last Name" fullWidth required value={data.lastName} disabled></TextField>
            </Grid>
        </Grid>
    );
}

/**
 * @todo
 * - add validator for each form when next is clicked. can pass down click notifier to child form so they can do their own validation
 * @param {props} props 
 */
export default function Registration(props) {
    const classes = useStyles();
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        address1: '',
        address2: '',
        email: '',
        username: '',
        password1: '',
        password2: '',
        question1: '',
        question2: '',
        answer1: '',
        answer2: ''
    });
    const [step, setStep] = useState(0);

    const forms = [
        { label: 'Personal Information', form: <PersonalForm /> },
        { label: 'Account Information', form: <AccountForm /> },
        { label: 'Finish and Review', form: <ReviewForm /> }
    ];

    const handleStepChange = (diff) => () => {
        const newStep = step + diff;
        if (newStep >= 0 && newStep < forms.length) {
            setStep(newStep);
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
                <RegistrationContext.Provider value={{ data, setData }}>
                    {forms[step].form}
                </RegistrationContext.Provider>
                <p>firstName={data.firstName}</p>
                <p>username={data.username}</p>
                <Grid container spacing={2} item sm={12} justify="space-between">
                    <Grid item sm={6} container justify="flex-start">
                        <Button color="secondary" variant="contained" onClick={handleStepChange(-1)}>Back</Button>
                    </Grid>
                    <Grid item sm={6} container justify="flex-end">
                        <Button color="primary" variant="contained" onClick={handleStepChange(1)}>NEXT</Button>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}