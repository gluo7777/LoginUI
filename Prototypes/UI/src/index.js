import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterAsyncAuth1 from './RouterAsyncAuth1';
import RouterAsyncAuth2 from './RouterAsyncAuth2';
import RouterAsyncTimeoutModal from './RouterSessionTimeoutDialog/RouterAsyncTimeoutModal';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<RouterAsyncTimeoutModal />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
