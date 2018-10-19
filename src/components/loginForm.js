import React from "react"

import {Button} from "reactstrap"
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
        }, {
            email: data.profile.email,
            username: data.profile.name,
            last_name: data.profile.last_name,
            first_name: data.profile.first_name,
            avatar:  'https://graph.facebook.com/v3.1/' + data.profile.id + '/picture'
        }).then(credentials => {
            console.log("[AWS_Cogn] Connection success.");
            console.log(credentials);
            this.setConnecting();
            Auth.currentAuthenticatedUser().then(user => {
                this.state.onLogin(user)
            });
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
                         size={1}/>;
        if (this.state.connecting) {
            icon = <PulseLoader
                sizeUnit={"em"}
                size={0.4}
                color={'#999999'}
                loading={true}/>
        }
        return (
            <div id="loginForm">
                    <FacebookProvider appId="587504355016303">
                        <Login scope="email" onResponse={this.handleResponse} onError={this.handleError}
                               render={({isLoading, isWorking, onClick}) => (
                                   <Button outline color="primary" className="facebookButton" block
                                           onClick={(...args) => {
                                               this.setConnecting(true);
                                               onClick(...args)
                                           }} disabled={this.state.connecting}>{icon}</Button>
                               )}>
                        </Login>
                    </FacebookProvider>
            </div>
        );
    }
}