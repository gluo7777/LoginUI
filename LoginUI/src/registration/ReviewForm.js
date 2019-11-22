import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { RegistrationContext } from './Registration';

/**
 * @todo
 * - add field legend
 * - add edit under each section that will go back to that page
 */
export function ReviewForm() {
    const { data } = React.useContext(RegistrationContext);
    const ReviewField = (props) => (<Grid item xs={props.xs || 6}>
        <TextField variant="outlined" type={props.type || 'text'} id={`${props.field}Review`} name={`${props.field}Review`} label={props.label} fullWidth={props.fullWidth || false} value={data[props.field] || ''} disabled />
    </Grid>);
    const ReviewHeading = (props) => (<Grid item xs={12} container justify="flex-start" spacing={2}>
        <Grid item>
            <Typography variant="h6" component="h2">{props.children}</Typography>
        </Grid>
        <Grid item>
            <Button color="secondary" variant="contained" size="small" onClick={props.onClick}>Edit</Button>
        </Grid>
    </Grid>);
    return (<Grid container spacing={1} justify="flex-start">
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
    </Grid>);
}
