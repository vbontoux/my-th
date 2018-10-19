import React from "react";
import {NavItem, Button, NavLink} from "reactstrap";
import {PulseLoader} from 'react-spinners'
import {Popover, PopoverBody} from "reactstrap";
import {Icon} from '@mdi/react'
import {mdiExitRun} from '@mdi/js'

import '../styles/utils.css'

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

        let icon = <div>Log out <Icon path={mdiExitRun} size={1} color={"#fff"} className={'right-icon'}/></div>;
        if (this.state.loggingOut)
            icon = <PulseLoader
                sizeUnit={"em"}
                size={0.4}
                loading={true} className="spinner"/>;
        return (
            <div>
                <NavItem>
                    <NavLink id="accountNavbarLink" onClick={this.toggleLoginPopover.bind(this)}>
                        <img src={this.props.user.avatar} alt="avatar"
                             className="avatarImage"/>{this.props.user.username}
                    </NavLink>
                </NavItem>
                <Popover target="accountNavbarLink" placement="bottom" isOpen={this.state.loginPopoverOpen}>
                    <PopoverBody>
                        <Button onClick={this.logOut.bind(this)} className="logoutBtn" block>{icon}</Button>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}