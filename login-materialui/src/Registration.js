import { Button, Checkbox, Container, FormControlLabel, Grid, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import 'date-fns';
import React, { useState } from 'react';

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
    }
}));

export default function Registration() {
    const classes = useStyles();
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        address1: '',
        address2: '',
        email: ''
    });

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
        console.log(`Setting ${event.target.name}=${event.target.value}.`)
    };

    return (
        <Container component="main" maxWidth="md" className={classes.container}>
            <Typography variant="h5" component="h1">Registration</Typography>
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
                <Grid container spacing={2} item sm={12} justify="space-between">
                    <Grid item sm={6} container justify="flex-start">
                        <Button color="secondary" variant="contained" >Back</Button>
                    </Grid>
                    <Grid item sm={6} container justify="flex-end">
                        <Button color="primary" variant="contained">NEXT</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}