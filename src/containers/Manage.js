import React, {Component} from 'react';
import {Icon} from '@mdi/react'
import {mdiPlusCircle} from '@mdi/js'

import '../styles/Manager.css'
import {Badge, Col, Nav, NavItem, NavLink, Row} from "reactstrap";

class Manage extends Component {

    render() {
        return (
            <div className="container" style={{margin: "2em auto"}}>
                <div style={{width: "30%", margin: "0 0"}}>
                    <Nav vertical style={{background: "#f8f9fa"}}>
                        <NavItem>
                            <NavLink href="manage/create">
                                <Row style={{paddingLeft: "1em", fontSize: "1.5em"}}>
                                    <Col sm={1} style={{display: "flex", padding: 0}}>
                                        <Icon path={mdiPlusCircle} size={1} color={"#000"}/>
                                    </Col>
                                    <Col sm="auto" style={{padding: "1em auto auto auto "}}>
                                        Start a campaign
                                    </Col>
                                </Row>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink><h3>My campaigns</h3></NavLink>
                        </NavItem>
                        <div style={{fontSize: "1.2em"}}>
                        <NavItem>
                            <NavLink href="manage/1">
                                <Row style={{paddingLeft: "1em"}}>
                                    <Col sm={1} style={{display: "flex", padding: 0}}>
                                    </Col>
                                    <Col sm="auto" style={{padding: "1em auto auto auto "}}>
                                        Campaign 1</Col>
                                </Row>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="manage/2">
                                <Row style={{paddingLeft: "1em"}}>
                                    <Col sm={1} style={{display: "flex", padding: 0}}>
                                        <Badge color="danger" style={{height: "1.5em", margin: "auto"}}>5</Badge>
                                    </Col>
                                    <Col sm="auto" style={{padding: "1em auto auto auto "}}>
                                        Campaign 2
                                    </Col>
                                </Row>
                            </NavLink>
                        </NavItem>
                        </div>
                    </Nav>
                </div>
            </div>
        );
    }
}

export default Manage;