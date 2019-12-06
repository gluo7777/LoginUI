import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import Timeout from './SessionTimeoutModal';
import { AppProvider, AppContext } from './AppProvider';

class App extends React.Component {

  render() {
    return (
      <AppProvider>
        <Router>
          <Timeout />
          <header>
            <AppContext.Consumer>
              {context =>
                <div>
                  <p>Timer: {context.state.display}</p>
                </div>
              }
            </AppContext.Consumer>
            <nav>
              <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/private">Private</Link></li>
              </ul>
            </nav>
          </header>
          <main>
            <Switch>
              <Route path="/home" children={<HomePage />} />
              <Route path="/login" render={
                props => <LoginPage redirectPath="/private" routeProps={props} />
              } />
              <ProtectedRoute path="/private">
                <PrivatePage />
              </ProtectedRoute>
              <Route path="*" render={
                props => {
                  return (
                    <Redirect to={{
                      pathname: "/home",
                      state: { from: props.location }
                    }} />
                  )
                }
              } />
            </Switch>
          </main>
        </Router>
      </AppProvider>
    );
  }
}

function LoginPage({ redirectPath, routeProps }) {
  console.log("login page")
  const { state, login } = React.useContext(AppContext);
  return state.authenticated ? <Redirect to={{
    pathname: redirectPath,
    state: { from: routeProps.location }
  }} /> : (
      <div>
        <h1>Login here!</h1>
        <button onClick={login}>Login</button>
      </div>
    )
}

function ProtectedRoute(props) {
  const { state } = React.useContext(AppContext);
  const { children, ...rest } = props;
  return <Route {...rest} render={args => {
    return state.authenticated ? children
      : <Redirect to={{
        pathname: "/login",
        state: { from: args.location }
      }} />
  }} />
}

class HomePage extends React.Component {
  static contextType = AppContext;
  render() {
    const { logout, state } = this.context;
    console.log(state);
    return <div>
      {state.user ? <h1>Welcome {state.user}</h1> : <h1>Welcome to my app!</h1>}
      <button onClick={() => logout()}>Logout</button>
    </div>
  }
}

class PrivatePage extends React.Component {
  static contextType = AppContext;
  render() {
    const { logout } = this.context;
    return <div>
      <h1>Only logged in users should see this!</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>;
  }
}

export default App;
