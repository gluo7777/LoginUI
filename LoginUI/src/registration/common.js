import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import 'date-fns';
import React from 'react';
import { RegistrationContext } from './Registration';

export function DataTextField(props) {
    const { fieldId, fieldLabel, children, ...rest } = props;
    const { data, setDataField } = React.useContext(RegistrationContext);
    const handleChange = event => setDataField(fieldId, event.target.value);
    return (
        <TextField id={fieldId} name={fieldId} label={fieldLabel} value={data[fieldId]} onChange={handleChange} fullWidth required {...rest}>
            {children}
        </TextField>
    );
}

export function DataCheckBox(props) {
    const { data, setDataField } = React.useContext(RegistrationContext);
    const handleChange = event => setDataField(props.fieldId, event.target.checked);
    return <FormControlLabel control={<Checkbox checked={data[props.fieldId]} onChange={handleChange} />} label={props.fieldLabel} />;
}

export function buildAccountInfoRequest(formData) {
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

export const isBlank = text => !text || text.trim() === "";