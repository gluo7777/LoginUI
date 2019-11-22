import { Grid } from '@material-ui/core';
import React from 'react';
import { DataCheckBox, DataTextField } from './common';
import DATA from './data';

export function PersonalForm() {
    return (<Grid container spacing={1} justify="flex-start">
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
                {DATA.states.map((state, i) => <option key={i} value={state}>{state}</option>)}
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
    </Grid>);
}
