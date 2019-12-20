import { createMuiTheme, CssBaseline, responsiveFontSizes } from '@material-ui/core';
import { lightBlue, orange } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'typeface-roboto';
import * as Configuration from '../common/Configuration';
import Spinner from './Spinner';
import SessionProvider from './Session';

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
    <Configuration.GlobalProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider>
          <Router>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <ProtectedRoute path="/home">
                  <Configuration.GlobalContext.Consumer>
                    {context => <Home logout={context.logout} />}
                  </Configuration.GlobalContext.Consumer>
                </ProtectedRoute>
                <LoginRoute path="/login" redirectPath="/home" />
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
        </SessionProvider>
      </ThemeProvider>
    </Configuration.GlobalProvider>
  );
}

class LoginRoute extends React.Component {
  static contextType = Configuration.GlobalContext;
  // TODO: double re-authenticate when redirecting from ProtectedRoute. Consider removing authenticate here
  // async componentDidMount() {
  //   const context = this.context;
  //   await context.reauthenticate();
  // }
  render() {
    const { redirectPath, ...rest } = this.props;
    const context = this.context;
    return (<Route {...rest} render={args => {
      return context.app.authenticated ?
        <Redirect to={{
          pathname: redirectPath
          , state: { from: args.location }
        }} />
        : <Login login={context.login} />;
    }
    } />);
  }
}


class ProtectedRoute extends React.Component {
  static contextType = Configuration.GlobalContext;
  async componentDidMount() {
    const context = this.context;
    await context.reauthenticate();
  }
  render() {
    const context = this.context;
    const { children, ...rest } = this.props;
    return (<Route {...rest} render={args => {
      return context.app.authenticated ?
        children
        : <Redirect to={{
          pathname: "/login"
          , state: { from: args.location }
        }} />
    }
    } />)
  }
}