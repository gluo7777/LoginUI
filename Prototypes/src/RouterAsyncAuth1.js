import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';

class App extends React.Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      authenticated: false
    };
  }

  componentDidMount() {
    this._isMounted = true;

    api.isAuthenticated(
      () => {
        if (this._isMounted) this.setState({ authenticated: true })
      },
      () => {
        if (this._isMounted) this.setState({ authenticated: false })
      }
    )
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const login = () => {
      api.login(() => this.setState({ authenticated: true }));
    };

    const logout = () => {
      api.logout(() => this.setState({ authenticated: false }));
    }

    return (
      <Router>
        <React.Suspense fallback={<Loading />}>
          <header>
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
              <Route path="/home" render={
                props => (
                  <div>
                    <h1>Welcome to my app!</h1>
                  </div>
                )
              } />
              <Route path="/login" render={
                props => <LoginPage authenticated={this.state.authenticated} login={login} redirectPath="/private" routeProps={props} />
              } />
              <ProtectedRoute path="/private" authenticated={this.state.authenticated}>
                <PrivatePage logout={logout} />
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
        </React.Suspense>
      </Router>
    );
  }
}

function LoginPage({ authenticated, login, redirectPath, routeProps }) {
  return authenticated ? <Redirect to={{
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
  const { authenticated, children, ...rest } = props;
  return <Route {...rest} render={args => {
    return authenticated ? children
      : <Redirect to={{
        pathname: "/login",
        state: { from: args.location }
      }} />
  }} />
}

class PrivatePage extends React.Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    console.log("PrivatePage rendering");
    return <div>
      <h1>Only logged in users should see this!</h1>
      <button onClick={() => this.props.logout()}>Logout</button>
    </div>;
  }
}

const LOGIN_API_URL = process.env.LOGIN_API_URL || 'http://backend.login.com';
const LOGIN_API_PORT = process.env.LOGIN_API_PORT || '9090';
const LOGIN_API = LOGIN_API_URL + ":" + LOGIN_API_PORT;

const api = {
  isAuthenticated: (success, failure) => {
    let url = LOGIN_API + "/api/user/current";
    fetch(url, {
      method: 'GET'
      , mode: 'cors'
      , credentials: 'include'
    }).then(res => {
      if (res.status === 200) return res.json();
      else throw new Error();
    }).then(json => success(json))
      .catch(err => {
        console.error(err);
        failure();
      });
  },
  login: (cb) => {
    let url = LOGIN_API + "/app/login";
    let credentials = new FormData();
    credentials.append('username', 'bobbyb71');
    credentials.append('password', 'jdbcpostgresql');
    fetch(url, {
      method: 'POST'
      , mode: 'cors'
      , credentials: 'include'
      , body: credentials
    }).then(res => {
      if (res.status === 200) return res.json();
      else throw new Error();
    }).then(userInfo => {
      cb(userInfo);
    })
      .catch(err => {
        console.error(err);
      });
  },
  logout: (cb) => {
    let url = LOGIN_API + "/app/logout";
    fetch(url, {
      method: 'GET'
      , mode: 'cors'
      , credentials: 'include'
    }).then(res => {
      if (res.status === 200) cb();
      else throw new Error();
    }).catch(err => {
      console.error(err);
    });
  }
};

const Loading = () => (<div><h2>Loading...</h2></div>);

export default App;
