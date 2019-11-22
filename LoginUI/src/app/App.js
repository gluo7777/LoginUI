import { createMuiTheme, CssBaseline, responsiveFontSizes } from '@material-ui/core';
import { lightBlue, orange } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import React, { Suspense, lazy, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import 'typeface-roboto';
import * as Configuration from '../common/Configuration';

let theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: orange
  }
});

theme = responsiveFontSizes(theme, {});

const Login = lazy(() => import('../login/Login'));
const Registration = lazy(() => import('../registration/Registration'));
const Home = lazy(() => import('../home/Home'));

export function App() {
  return (
    <Configuration.GlobalApp>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Suspense fallback={<Loading />}>
            <Switch>
              <RedirectLogin path="/home">
                <Home />
              </RedirectLogin>
              <RedirectLogin path="/admin">
                <Home />
              </RedirectLogin>
              <Route path="/login">
                <Login redirectpath="/home" />
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
          </Suspense>
        </Router>
      </ThemeProvider>
    </Configuration.GlobalApp>
  );
}

function Loading() {
  return (
    <div>
      <h1>Loading...</h1>
      <h5>Placeholder for loading screen...</h5>
    </div>
  )
}

function RedirectLogin({ children, ...rest }) {
  const { app } = React.useContext(Configuration.GlobalContext);
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