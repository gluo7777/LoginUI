import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, Icon, Link, makeStyles, TextField, Typography } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import React from 'react';
import * as Configuration from './Configuration';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import * as Client from './lib/Client';

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

export default function Login(props) {
    const classes = loginStyles();
    const location = useLocation();
    const history = useHistory();
    const { from } = location.state || { from: { pathname: props.redirectpath } };
    const [state, setState] = React.useState({ username: '', password: '' });
    const { app, setField } = React.useContext(Configuration.GlobalContext);

    const login = async (event) => {
        event.preventDefault();
        history.replace(from);
        let success = await Client.login(state.username, state.password);
        if (success) {
            setField(Configuration.AUTHENTICATED, true);
        } else {
            console.log("Failed to login.");
            // display login error message
            // state changes
        }
    }

    if (app.authenticated)
        return (
            <Redirect to={{
                pathname: props.redirectpath,
                state: { from: location }
            }} />
        )
    else
        return (
            <Container component="main" maxWidth="sm">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <Icon>lock</Icon>
                    </Avatar>
                    <Typography variant="h5" component="h1">Please sign in</Typography>
                    <form className={classes.form} action="/login" method="POST">
                        <TextField variant="outlined" id="username" name="username" label="Username"
                            margin="normal" required fullWidth value={state.username}
                            onChange={event => setState({ ...state, username: event.target.value })}
                        />
                        <TextField variant="outlined" id="password" name="password" type="password"
                            label="Password" margin="normal" required fullWidth value={state.password}
                            onChange={event => setState({ ...state, password: event.target.value })}
                        />
                        <FormControlLabel value="rememberme" control={<Checkbox color="secondary" />} label="Remember Me" labelPlacement="end" margin="normal" />
                        <Button variant="contained" type="submit" color="primary" fullWidth onClick={login}>Sign in</Button>
                        <Grid container className={classes.gridContainer}>
                            <Grid item >
                                <Typography className={classes.link} color="textSecondary" variant="body1" >
                                    Forgot Password?
                            </Typography>
                            </Grid>
                            <Grid item >
                                <Typography className={classes.link} color="textPrimary" variant="body1" >
                                    <Link href="/registration">Register for an account!</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
};