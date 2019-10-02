import { createMuiTheme, CssBaseline, makeStyles, responsiveFontSizes, TextField, Container, Typography, Icon, Avatar, Button, FormLabel, FormControlLabel, Checkbox, Grid, Link } from '@material-ui/core';
import { lightBlue, orange, deepOrange } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import 'typeface-roboto';

let theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: orange
  }
});

theme = responsiveFontSizes(theme, {});

const useStyles = makeStyles(theme => ({
  yes: {
    fontWeight: "bold"
  }
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Login />
    </ThemeProvider>
  );
}

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
  }
}));

const Login = () => {
  const classes = loginStyles();
  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon>lock</Icon>
        </Avatar>
        <Typography variant="h5" component="h1">Please sign in</Typography>
        <form className={classes.form}>
          <TextField variant="outlined" id="username" name="username" label="Username" margin="normal" required fullWidth />
          <TextField variant="outlined" id="password" name="password" type="password" label="Password" margin="normal" required fullWidth />
          <FormControlLabel value="rememberme" control={<Checkbox color="secondary" />} label="Remember Me" labelPlacement="end" margin="normal" />
          <Button variant="contained" type="submit" color="primary" fullWidth>Sign in</Button>
          <Grid container className={classes.gridContainer}>
            <Grid item >
              <Typography>
                <Link href="http://localhost:3000" color="textSecondary" variant="body1">
                  Forgot Password?
              </Link>
              </Typography>
            </Grid>
            <Grid item >
              <Typography>
                <Link href="http://localhost:3000" color="textPrimary" variant="body1">
                  Register for an account!
              </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default App;
