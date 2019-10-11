import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, Icon, Link, makeStyles, TextField, Typography } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import React from 'react';
import { AppContext, Page } from './ContextConfiguration';

const loginStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        marginTop: theme.spacing(8)
    },
    form: {
        marginTop: theme.spacing(1)
    },
    avatar: {
        margin: theme.spacing(4),
        color: "#fff",
        backgroundColor: deepOrange[500]
    },
    gridContainer: {
        justifyContent: "space-between",
        marginTop: theme.spacing(2)
    },
    link: {
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    }
}));

export default function () {
    const classes = loginStyles();

    const { app, setApp } = React.useContext(AppContext);

    const goToPageHandler = (pageName) => () => {
        setApp({ ...app, page: pageName })
    };

    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Icon>lock</Icon>
                </Avatar>
                <Typography variant="h5" component="h1">Please sign in</Typography>
                <form className={classes.form} action="/login" method="POST">
                    <TextField variant="outlined" id="username" name="username" label="Username" margin="normal" required fullWidth />
                    <TextField variant="outlined" id="password" name="password" type="password" label="Password" margin="normal" required fullWidth />
                    <FormControlLabel value="rememberme" control={<Checkbox color="secondary" />} label="Remember Me" labelPlacement="end" margin="normal" />
                    <Button variant="contained" type="submit" color="primary" fullWidth>Sign in</Button>
                    <Grid container className={classes.gridContainer}>
                        <Grid item >
                            <Typography className={classes.link} color="textSecondary" variant="body1" onClick={goToPageHandler(Page.recoverAccount)}>
                                Forgot Password?
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Typography className={classes.link} color="textPrimary" variant="body1" onClick={goToPageHandler(Page.registration)}>
                                Register for an account!
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};