import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import Amplify from "aws-amplify";
import config from "./config"

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID
    }
});

class DebugRouter extends Router {
    constructor(props) {
        super(props);
        console.log('initial history is: ', JSON.stringify(this.history, null, 2))
        this.history.listen((location, action) => {
            console.log(
                `The current URL is ${location.pathname}${location.search}${location.hash}`
            );
            console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null, 2));
        });
    }
}

ReactDOM.render(<DebugRouter><App/></DebugRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
