import React from "react"
import {Icon} from "@mdi/react"
import {mdiFacebook} from "@mdi/js"
import {Auth} from "aws-amplify";
import {urls} from "../config"
import {connect} from "react-redux";

import ButtonSpinable from "./ButtonSpinable";
import {stateToUserProps} from "../reducers/user";

export class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            connecting: false
        }
    };

    FacebookToAWS(tokenData, userData) {
        console.debug("[DEBUG] MTH - AWS Log in : ", tokenData, userData);
        Auth.federatedSignIn("facebook", {...tokenData}, {
            email: userData.email,
            username: userData.name,
            first_name: userData.first_name,
            last_name: userData.last_name,
            fbid: userData.id,
            avatar: urls.getFbAvatar(userData.id)
        }).then(credentials => {
            console.debug("[AWS_Cogn] Connection success.", credentials);
            this.setConnecting();
            Auth.currentAuthenticatedUser().then(user => {
                this.props.dispatch({type: "LOGIN", userData: user})
            });
        }).catch(e => {
            console.error("[AWS_Cogn] " + e);
            this.setConnecting()
        });
    };

    fbLogin = () => {
        this.setConnecting(true);
        window.FB.login(r => {
            if (r.status === "connected") {
                let tokenData = {token: r.authResponse.accessToken, expires_at: r.authResponse.expiresIn};
                console.debug("[DEBUG] MTH - Facebook recieved connection", r);
                window.FB.api('/me', {fields: "email,name,last_name,first_name,id"}, userData => {
                    this.FacebookToAWS(tokenData, userData);
                });
            }
            else
                console.debug("MTH - Facebook recieved response", r);
        }, {fields: "public_profile, email"});
    };

    setConnecting(bool = false) {
        this.setState({
            connecting: bool
        })
    }

    render() {
        return (
            <div id="loginForm">
                <ButtonSpinable color="primary" className="facebookButton" block
                                loading={this.state.connecting}
                                onClick={this.fbLogin}>
                    <Icon path={mdiFacebook}
                          size={1}/>
                </ButtonSpinable>
            </div>
        );
    }
}

export default connect(stateToUserProps)(LoginForm);