import React, { createContext, useContext, useState } from 'react';
import {
    BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, Redirect, useLocation, useHistory
} from 'react-router-dom';

const AppContext = createContext(null);

export function App() {

    const [app, setApp] = useState({
        authenticated: false
    });

    return (
        <AppContext.Provider value={{ app, setApp }}>
            <Router basename="/app">
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/settings">Settings</Link></li>
                            <li><Link to="/usingmatch">Using Match</Link></li>
                        </ul>
                    </nav>
                    {/* Renders first match */}
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <RedirectLogin path="/profile">
                            <Profile />
                        </RedirectLogin>
                        <RedirectLogin path="/settings">
                            <Settings />
                        </RedirectLogin>
                        <Route path="/wtf">
                            <h2>Dude, seriously?</h2>
                        </Route>
                        {/* Fall Back */}
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
                <SettingsFooter />
            </Router>
        </AppContext.Provider>
    )
}

function RedirectLogin({ children, ...rest }) {
    const { app } = React.useContext(AppContext);
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

function Home(props) {
    return (
        <div>
            <h2>Home</h2>
        </div>
    )
}

function Login(props) {
    const { app, setApp } = useContext(AppContext);
    const history = useHistory();
    const location = useLocation();

    const [loading, setLoading] = useState(false);

    const { from } = location.state || { from: { pathname: "/profile" } };

    const login = () => {
        setLoading(true);
        setTimeout(() => {
            history.replace(from)
            setLoading(false);
            setApp({ ...app, authenticated: true })
        }, 2500)
    };

    if (!loading)
        return (
            !app.authenticated ?

                <div>
                    <h2>Login</h2>
                    <button onClick={login}>Login</button>
                </div>

                : <Redirect to={{
                    pathname: "/profile"
                    , state: { from: location }
                }} />
        )
    else
        return <div>
            <h5>Loading...</h5>
        </div>
}

function Profile(props) {
    const { app, setApp } = useContext(AppContext);
    const logout = () => {
        setTimeout(() => {
            setApp({ ...app, authenticated: false })
        }, 2500);
    }
    return (
        <div>
            <h2>Profile</h2>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

function Settings(props) {
    const match = useRouteMatch();
    return (
        <div>
            <h2>Settings</h2>
            <ul>
                <li><Link to={`${match.url}/account`}>Account</Link></li>
                <li><Link to={`${match.url}/theme`}>Theme</Link></li>
                <li><Link to={`${match.url}/furry`}>Furry</Link></li>
            </ul>
            <Link to={`${match.url}/computer`}><button style={{ cursor: "pointer" }}>Computer</button></Link>
            <Link to="/"><button style={{ cursor: "pointer" }}>Go Home</button></Link>
            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Setting />
                </Route>
                <Route path={`${match.path}`}>
                    <h5>Click on one of the settings</h5>
                </Route>
            </Switch>
        </div>
    )
}

function Setting() {
    const { topicId } = useParams();
    return topicId === 'furry' ? <Redirect to="/wtf" /> : <h4>{topicId.toUpperCase()[0] + topicId.substr(1)} Settings</h4>
}

function SettingsFooter() {
    const match = useRouteMatch();
    console.log({ match });
    return match.path.startsWith("/settings") ? (
        <h6>Only show if on Settings</h6>
    ) : null;
}