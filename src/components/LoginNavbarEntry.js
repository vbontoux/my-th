import React from "react";
import {NavItem} from "reactstrap";
import {Popover, PopoverHeader, PopoverBody} from "reactstrap";
import LoginForm from "./loginForm";


export default class LoginNavbarEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginPopoverOpen: false
        }
    }

    toggleLoginPopover() {
        this.setState({
            loginPopoverOpen: !this.state.loginPopoverOpen
        });
    }

    onLogin = (auth) => {
        this.props.onLogin(auth);
        //No need to hide, we unmount before
    };

    render() {
        return (
            <div id="loginNavbarEntry">
                <NavItem id="loginPopoverNavbarButton" onClick={this.toggleLoginPopover.bind(this)}>
                    Login
                </NavItem>
                <Popover target="loginPopoverNavbarButton" placement="bottom" isOpen={this.state.loginPopoverOpen}>
                    <PopoverHeader> Login </PopoverHeader>
                    <PopoverBody><LoginForm onLogin={this.onLogin}/></PopoverBody>
                </Popover>
            </div>
        );
    }
}