import React from "react";
import {NavItem, Button} from "reactstrap";
import {Popover, PopoverHeader, PopoverBody} from "reactstrap";

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

    render() {
        return (
            <div id="accountNavbarEntry">
                <NavItem id="loginPopoverNavbarButton" onClick={this.toggleLoginPopover.bind(this)}>
                    My account
                </NavItem>
                <Popover target="loginPopoverNavbarButton" placement="bottom" isOpen={this.state.loginPopoverOpen}>
                    <PopoverHeader> My account </PopoverHeader>
                    <PopoverBody>
                        <Button onClick={() => {this.props.onLogout(false)}}>Log out</Button>
                    </PopoverBody>
                </Popover>

            </div>
        );
    }
}