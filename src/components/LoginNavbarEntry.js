import React from "react";
import {NavItem, NavLink} from "reactstrap";
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
            <div>
            <NavItem>
                <NavLink id="loginPopoverLink" onClick={this.toggleLoginPopover.bind(this)}>Login</NavLink>
            </NavItem>
            <Popover target="loginPopoverLink" placement="bottom" isOpen={this.state.loginPopoverOpen}>
                <PopoverHeader> Login </PopoverHeader>
                <PopoverBody><LoginForm onLogin={this.onLogin}/></PopoverBody>
            </Popover>
            </div>
        );
    }
}