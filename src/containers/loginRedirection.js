import React, {Component} from 'react';
import Background from "../components/Background";
import {Container} from "reactstrap";
import {Icon} from '@mdi/react'
import {mdiFacebook} from '@mdi/js'

import "../styles/loginRedirection.css"
import ButtonSpinable from "../components/ButtonSpinable";
import {Button} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import LoginButton from "../components/LoginButton";
import queryString from 'query-string'
import {stateToUserProps} from "../reducers/user";
import {connect} from "react-redux";


class LoginRedirection extends Component {


    constructor(props) {
        super(props);
    }

    redirect_to_next = () => {
        const values = queryString.parse(this.props.location.search);
        this.props.history.push(values.next ? values.next : "/");
    };

    connectionError(e) {
        console.error(e);
    }

    componentDidMount() {
        if (this.props.user.isAuthenticated)
            this.redirect_to_next()
    }

    render() {
        return (
            <Background className={"loginRedirectionWrapper"}>
                <Container style={{margin: "auto"}}>
                    <h1 className={"wideHeader"}>my-TreasureHunt fun bots builder</h1>
                    <p className={"baitDisplay"}>Create Awesome <b>fun-bots</b> on Messenger ! No coding and <b>Free</b>
                    </p>
                    <p className={"description"}>Engage your audience in real life through treasure hunt, course, vote,
                        race, instant win or sweepstake. Enrich your visuals now ! </p>
                    <LoginButton className={"bigRoundBtn facebook"} success={this.redirect_to_next}
                                 error={this.connectionError}>
                        <span>Login using your facebook account</span>
                    </LoginButton>
                    < Link to={"/"}> < Button className={"bigRoundBtn aboutBtn"}><span>Learn more</span></Button></Link>
                </Container>
            </Background>
        );
    }
}

export default withRouter(connect(stateToUserProps)(LoginRedirection));