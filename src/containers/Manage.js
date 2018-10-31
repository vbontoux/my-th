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
                <div className="manager-wrapper">
                    <div className="manager-sidemenu">
                        <Nav vertical style={{margin: "1em auto 1em"}}>
                            <Link to={`${this.props.match.url}`}>
                                <NavItem>
                                    <div className="sidenav_entry">
                                        <h5>Management Panel
                                        </h5>
                                        <Icon path={mdiFinance} size={1} color={"#999"}/>
                                    </div>
                                </NavItem>
                            </Link>
                            <Link to={`${this.props.match.url}/create`}>
                                <NavItem>
                                    <div className="sidenav_entry">
                                        <h5>New campaign
                                        </h5>
                                        <Icon path={mdiPlusCircle} size={1} color={"#999"}/>
                                    </div>
                                </NavItem>
                            </Link>
                            <NavLink>
                                <CollapsibleTitle title={<h5>Actives campaigns</h5>} separator={false} isOpen>
                                    <table>
                                        <tbody>
                                        <Link to={`${this.props.match.url}/1`}>
                                            <tr>
                                                <td>Campaign w/ errors</td>
                                                <td><Badge color={"danger"}>5</Badge></td>
                                            </tr>
                                        </Link>
                                        <Link to={`${this.props.match.url}/2`}>
                                            <tr>
                                                <td>Campaign test</td>
                                                <td><Badge color={"success"}>2</Badge></td>
                                            </tr>
                                        </Link>
                                        </tbody>
                                    </table>
                                </CollapsibleTitle>
                                <CollapsibleTitle title={<h5>Finished campaigns</h5>} separator={false}>
                                    <table>
                                        <tbody>
                                        <Link to={`${this.props.match.url}/3`}>
                                            <tr>
                                                <td>Campaign 3</td>
                                            </tr>
                                        </Link>
                                        </tbody>
                                    </table>
                                </CollapsibleTitle>
                                <CollapsibleTitle title={<h5>Draft campaigns</h5>} separator>
                                    <table>
                                        <tbody>
                                        <Link to={`${this.props.match.url}/d154`}>
                                            <tr>
                                                <td>Campaign 3</td>
                                                <td><Badge color={"light"}>Draft</Badge></td>
                                            </tr>
                                        </Link>
                                        </tbody>
                                    </table>
                                </CollapsibleTitle>
                            </NavLink>
                        </Nav>
                    </div>
                    <div className="manager-window">
                        <Routes match={this.props.match}/>
                    </div>
                </div>
            </div>
        );
    }
}


Manage.propTypes = {
    match: PropTypes.any.isRequired
};

export default Manage;