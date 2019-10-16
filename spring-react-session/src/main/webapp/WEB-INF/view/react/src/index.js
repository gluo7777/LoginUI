import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    if (process.env.REACT_APP_EXAMPLES) {
        import(`./examples/${process.env.REACT_APP_EXAMPLES}/App`).then(App => ReactDOM.render(<App.App />, document.getElementById('root')));
    } else {
        import('./App').then(App => ReactDOM.render(<App.App />, document.getElementById('root')));
    }
} else if (process.env.NODE_ENV === 'prod') {
    import('./App').then(App => ReactDOM.render(<App.App />, document.getElementById('root')));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
