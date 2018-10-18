import React from "react";
import {NavItem, Button} from "reactstrap";
import {PulseLoader} from 'react-spinners'
import {Popover, PopoverHeader, PopoverBody} from "reactstrap";

export default class LoginNavbarEntry extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginPopoverOpen: false,
            loggingOut: false
        }
    }

    logOut() {
        this.setState({loggingOut: true});
        this.props.onLogout()
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
                    <img src={this.props.user.avatar} alt="avatar" className="avatarImage"/>{this.props.user.username}
                </NavItem>
                <Popover target="loginPopoverNavbarButton" placement="bottom" isOpen={this.state.loginPopoverOpen}>
                    <PopoverHeader> My account </PopoverHeader>
                    <PopoverBody style={{minWidth: "200px"}}>
                        <Button onClick={this.logOut.bind(this)} className="widePopoverButton" style={{width: "100%"}}>Log out<PulseLoader
                            sizeUnit={"em"}
                            size={0.4}
                            color={'#ffffff'}
                            loading={this.state.loggingOut}/></Button>
                    </PopoverBody>
                </Popover>

            </div>
        );
    }
}