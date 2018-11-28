import React, {Component} from 'react';
import AccountNavbarEntry from "./AccountNavbarEntry";
import LoginNavbarEntry from "./LoginNavbarEntry";
import {stateToUserProps} from "../reducers/user";
import {connect} from "react-redux";

class UserNavItem extends Component {
    render() {
        return (
            this.props.user.isAuthenticated ?
                <AccountNavbarEntry/>
                :
                <LoginNavbarEntry/>
        );
    }
}



export default connect(stateToUserProps) (UserNavItem);