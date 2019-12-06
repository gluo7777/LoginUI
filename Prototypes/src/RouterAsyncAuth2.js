import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';

const AppContext = React.createContext();

class AppProvider extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: null,
      timer: null,
      display: 60
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  login() {
    api.login(userInfo => {
      this.setState({ authenticated: true, user: userInfo.id });
      this.start();
    });
  }
  logout() {
    api.logout(() => this.setState({ authenticated: false, user: null }));
    this.stop();
  }
  stop() {
    if (this.state.timer) {
      clearTimeout(this.state.timer);
      this.setState({
        timer: null,
        display: 60
      })
    }
  }
  start() {
    if (this.state.timer !== null)
      return;
    let timer = setInterval(() => {
      this.setState(state => {
        if (state.display === 0) {
          clearTimeout(state.timer);
          state.timer = null;
          state.display = 60;
          this.logout();
        } else {
          state.display = state.display - 1;
        }
        return state;
      });
    }, 1000);
    this.setState({ timer: timer });
  }
  async componentDidMount() {
    console.log("AppProvider mounted")
    this._isMounted = true;

    let url = LOGIN_API + "/api/user/current";
    let res = await fetch(url, {
      method: 'GET'
      , mode: 'cors'
      , credentials: 'include'
    });
    if (res.status === 200) {
      let user = await res.json();
      this.setState({ authenticated: true, user: user.username });
      this.start();
    } else {
      this.setState({ authenticated: false, user: null });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.stop();
  }
  render() {

    return <AppContext.Provider
      value={{
        state: this.state,
        login: this.login,
        logout: this.logout
      }}>
      {this.props.children}
    </AppContext.Provider>
  }
}

class App extends React.Component {

  render() {
    return (
      <AppProvider>
        <Router>
          <React.Suspense fallback={<Loading />}>
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
          </React.Suspense>
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
