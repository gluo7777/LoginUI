import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, Icon, Link, makeStyles, TextField, Typography, FormGroup, FormLabel } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import React from 'react';

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
    return (
        <Container component="main" maxWidth="md" className={classes.container}>
            <Typography variant="h5" component="h1">Registration</Typography>
            <form className={classes.form}>
                <TextField variant="outlined" label="First Name" margin="normal" className={classes.textField} required />
                <TextField variant="outlined" label="Last Name" margin="normal" className={classes.textField} required />
            </form>
        </Container>
    );
}