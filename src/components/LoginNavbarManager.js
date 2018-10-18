import React from "react";
import AccountNavbarEntry from './AccountNavbarEntry'
import LoginNavbarEntry from './LoginNavbarEntry'

import "../styles/loginPopoverStyle.css"

export default class LoginNavbarManager extends React.Component {

    toggleLoginPopover() {
        this.setState({
            loginPopoverOpen: !this.state.loginPopoverOpen
        });
    }

    render() {
        if (this.props.user.isAuthenticated)
            return (<AccountNavbarEntry onLogout={this.props.onLogout} user={this.props.user}/>);
        else
            return (<LoginNavbarEntry onLogin={this.props.authManager}/>);
    }
}