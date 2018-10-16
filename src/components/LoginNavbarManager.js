import React from "react";
import AccountNavbarEntry from './AccountNavbarEntry'
import LoginNavbarEntry from './LoginNavbarEntry'

export default class LoginNavbarManager extends React.Component {

    toggleLoginPopover() {
        this.setState({
            loginPopoverOpen: !this.state.loginPopoverOpen
        });
    }

    render() {
        if (this.props.isAuthenticated) {
            return (<AccountNavbarEntry onLogout={this.props.authManager}/>);
        } else {
            return (<LoginNavbarEntry onLogin={this.props.authManager}/>);
        }
    }
}