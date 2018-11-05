import React, {Component} from 'react';
import {Badge, Nav, NavItem, NavLink} from "reactstrap";
import CollapsibleTitle from "../components/CollapsibleTitle";
import {Link} from "react-router-dom";
import {Icon} from '@mdi/react'
import {mdiFinance, mdiPlusCircle} from '@mdi/js'
import Routes from "./manage/Routes";
import PropTypes from "prop-types";

import "../styles/utils.css"
import "../styles/Manager.css"

class Manage extends Component {

    render() {
        return (
            <div className="container-fluid">
                <Routes match={this.props.match}/>
            </div>
        );
    }
}


Manage.propTypes = {
    match: PropTypes.any.isRequired
};

export default Manage;