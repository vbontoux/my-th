import React from "react"

import {Row, Button} from "reactstrap"
import {Icon} from "@mdi/react"
import {mdiFacebook} from "@mdi/js"
import {FacebookProvider, Login} from 'react-facebook-sdk'
import {Auth} from "aws-amplify";
import {PulseLoader} from "react-spinners";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            onLogin: props.onLogin,
            connecting: false
        }
    }

    handleResponse = (data) => {
        console.log("[FB] User logged in");
        console.log(data);
        Auth.federatedSignIn("facebook", {
            token: data.tokenDetail.accessToken,
            expires_at: data.tokenDetail.expiresIn
        }, {email: data.profile.email}).then(credentials => {
            console.log("[AWS_Cogn] Connection success.");
            console.log(credentials);
            this.setConnecting();
            this.state.onLogin(true);
        }).catch(e => {
            console.log("[AWS_Cogn] " + e);
            this.setConnecting()
        });
    };

    handleError = (error) => {
        console.log("[FB] " + error);
        this.setConnecting();
    };

    setConnecting(bool = false) {
        console.log(this.state.connecting + " / " + bool);
        this.setState({
            connecting: bool
        })
    }

    render() {
        let icon = <Icon path={mdiFacebook}
                         size={1}
                         color="#fff"/>;
        if (this.state.connecting) {
            icon = <PulseLoader
                sizeUnit={"em"}
                size={0.4}
                color={'#ffffff'}
                loading={true}/>
        }
        return (
            <div id="loginForm">
                <Row style={{minWidth: "200px"}}>
                    <FacebookProvider appId="587504355016303">
                        <Login scope="email" onResponse={this.handleResponse} onError={this.handleError}
                               render={({isLoading, isWorking, onClick}) => (
                                   <Button color="primary" style={{width: '90%', margin: "0 auto"}} onClick={(...args) => {this.setConnecting(true);onClick(...args)}}>{icon}</Button>
                               )}>
                        </Login>
                    </FacebookProvider>
                </Row>
            </div>
        );
    }
}