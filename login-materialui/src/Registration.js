import DateFnsUtils from '@date-io/date-fns';
import { Button, Checkbox, Container, FormControlLabel, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
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
    const [data, setData] = useState({ name: 'William' });
    return (
        <Container component="main" maxWidth="md" className={classes.container}>
            <Typography variant="h5" component="h1">Registration</Typography>
            <Grid container spacing={1} justify="space-between">
                <Grid item xs={6}>
                    <TextField id="f" name="f" label="First Name" fullWidth required></TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField id="l" name="l" label="Last Name" fullWidth required></TextField>
                </Grid>
                <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="dob"
                            label="Date of Birth"
                            value={Date()}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            onChange={() => console.log("Updated!")}
                            fullWidth
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>

                </Grid>
                <Grid item sm={12}>
                    <TextField id="a" name="a" label="Address 1" fullWidth></TextField>
                </Grid>
                <Grid item sm={12}>
                    <TextField id="a2" name="a2" label="Address 2" fullWidth></TextField>
                </Grid>
                <Grid item sm={12}>
                    <FormControlLabel control={<Checkbox />}
                        label="Use this address for payment details" />
                </Grid>
                <Grid container spacing={2} item sm={12} justify="space-between">
                    <Grid item sm={6} container justify="flex-start">
                        <Button color="secondary" variant="contained" onClick={() => console.log({ data })}>Back</Button>
                    </Grid>
                    <Grid item sm={6} container justify="flex-end">
                        <Button color="primary" variant="contained" onClick={() => setData({ msg: 'hello' })}>NEXT</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}