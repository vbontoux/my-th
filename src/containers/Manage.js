import React, {Component} from 'react';

import '../styles/Manager.css'
import {Badge, Nav, NavItem, NavLink} from "reactstrap";
import CollapsibleTitle from "../components/CollapsibleTitle";
import {Link, Route} from "react-router-dom";
import CreateCampaign from "./manage/CreateCampaign";
import ManageCampaign from "./manage/ManageCampaign";
import Routes from "./manage/Routes";

class Manage extends Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="manager-wrapper">
                    <div className="manager-sidemenu">
                        <Nav vertical style={{margin: "1em auto 1em"}}>
                            <NavItem>
                                <NavLink><h5><Link to={"/manage/create"}>New campaign</Link></h5></NavLink>
                            </NavItem>
                            <NavLink>
                                <CollapsibleTitle title={<h5>My campaigns</h5>} separator>
                                    <table>
                                        <tbody>
                                        <Link to="manage/1">
                                            <tr>
                                                <td>Campaign w/ errors</td>
                                                <td><Badge color={"danger"}>5</Badge></td>
                                            </tr>
                                        </Link>
                                        <Link to="manage/2">
                                            <tr>
                                                <td>Campaign test</td>
                                                <td><Badge color={"success"}>2</Badge></td>
                                            </tr>
                                        </Link>
                                        </tbody>
                                    </table>
                                </CollapsibleTitle>
                            </NavLink>
                        </Nav>
                    </div>
                    <div className="manager-window">
                        <Routes/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Manage;