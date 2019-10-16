import { createMuiTheme, CssBaseline, responsiveFontSizes } from '@material-ui/core';
import { lightBlue, orange } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import 'typeface-roboto';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import { GlobalApp, GlobalContext } from './Configuration';

let theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: orange
  }
});

theme = responsiveFontSizes(theme, {});

// const query = new URLSearchParams(window.location.search);
// const loginSuccess = query ? query.has("success") : false;
// const loginError = query ? query.has("error") : false;

const FROM_LOGIN = "/home";

export function App() {

  return (
    <GlobalApp>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <RedirectLogin path="/home">
              <Home />
            </RedirectLogin>
            <RedirectLogin path="/admin">
              <Home />
            </RedirectLogin>
            <Route path="/login">
              <Login redirectpath={FROM_LOGIN} />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="*">
              <Redirect to={{
                pathname: "/login"
              }} />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </GlobalApp>
  );
}

function RedirectLogin({ children, ...rest }) {
  const { app } = React.useContext(GlobalContext);
  const location = useLocation();
  return (
    <Route {...rest}>
      {
        app.authenticated ?
          children
          : <Redirect to={{
            pathname: "/login"
            , state: { from: location }
          }} />
      }
    </Route>
  )
}