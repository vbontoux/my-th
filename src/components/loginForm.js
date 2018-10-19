import React from "react"

import {Button} from "reactstrap"
import {Icon} from "@mdi/react"
import {mdiFacebook} from "@mdi/js"
import {Auth} from "aws-amplify";
import {PulseLoader} from "react-spinners";


export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            onLogin: props.onLogin,
            fbLoading: true,
            connecting: false
        }
    };

    FacebookToAWS(tokenData, userData) {
        console.debug("[DEBUG] MTH - AWS Log in : ");
        console.log(tokenData, userData);
        Auth.federatedSignIn("facebook", {...tokenData}, {
            email: userData.email,
            username: userData.name,
            first_name: userData.first_name,
            last_name: userData.last_name,
            fbid: userData.id,
            avatar: "https://graph.facebook.com/v3.1/" + userData.id + "/picture"
        }).then(credentials => {
            console.log("[AWS_Cogn] Connection success.");
            console.log(credentials);
            this.setFacebookLoading();
            Auth.currentAuthenticatedUser().then(user => {
                this.state.onLogin(user)
            });
        }).catch(e => {
            console.log("[AWS_Cogn] " + e);
            this.setFacebookLoading()
        });
    };

    fbLogin = () => {
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
    }

    handleError = (error) => {
        console.log("[FB] " + error);
        this.setFacebookLoading();
    };

    setFacebookLoading(bool = false) {
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
                <Button color="primary" className="facebookButton" block
                        disabled={this.state.connecting} onClick={this.fbLogin}>
                    {icon}
                </Button>
            </div>
        );
    }
}