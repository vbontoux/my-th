import React from "react"

import {Row, Button} from "reactstrap"
import {Icon} from "@mdi/react"
import {mdiFacebook} from "@mdi/js"
import {FacebookProvider, Login} from 'react-facebook-sdk'

export default class LoginForm extends React.Component {

    handleResponse = (data) => {
        console.log("[FB] User logged in");
        console.log(data);
    };

    handleError = (error) => {
        console.log("[FB] " + error);
    };

    render() {
        return (
            <div id="loginForm">
                <Row style={{minWidth: "200px"}}>
                    <FacebookProvider appId="587504355016303">
                        <Login scope="email" onResponse={this.handleResponse} onError={this.handleError}>
                            <Button color="primary" style={{width: '90%', margin:"0 auto"}}><Icon path={mdiFacebook} size={1} color="#fff"/></Button>
                        </Login>
                    </FacebookProvider>
                </Row>
            </div>
        );
    }
}