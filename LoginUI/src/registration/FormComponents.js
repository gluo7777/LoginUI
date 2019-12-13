import { Checkbox, FormControlLabel, TextField, Input, FormControl, InputLabel, InputAdornment, IconButton, FormHelperText } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import 'date-fns';
import React from 'react';
import { RegistrationContext } from './Registration';

export function DataTextField(props) {
    const { fieldId, fieldLabel, children, error, onChange, ...rest } = props;
    const { data, setDataField } = React.useContext(RegistrationContext);
    const handleChange = event => {
        setDataField(fieldId, event.target.value);
        if (onChange) {
            onChange(event.target.value);
        }
    }
    return (
        <TextField
            id={fieldId} name={fieldId} label={fieldLabel} value={data[fieldId]}
            onChange={handleChange} fullWidth required error={error || false} {...rest}
        >
            {children}
        </TextField>
    );
}

export function PasswordField(props) {
    const { fieldId, fieldLabel, children, error, helperText, onChange, ...rest } = props;
    const { data, setDataField } = React.useContext(RegistrationContext);
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const handleChange = event => {
        setDataField(fieldId, event.target.value);
        if (onChange) {
            onChange(event.target.value);
        }
    };
    return (
        <FormControl error={error || false}>
            <InputLabel htmlFor={fieldId}>{fieldLabel}</InputLabel>
            <Input id={fieldId} name={fieldId} value={data[fieldId]} onChange={handleChange} fullWidth required {...rest}
                type={passwordVisible ? "text" : "password"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            onMouseDown={event => event.preventDefault()}
                        >
                            {passwordVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }>
                {children}
            </Input>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
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