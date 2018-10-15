import React, {Component} from 'react';
import Routes from './Routes'

import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavLink} from 'reactstrap'
import Icon from "@mdi/react"
import {mdiKeyVariant} from "@mdi/js"

import './App.css';
import {Link} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand><Link to="/"><img alt="logo my-TreasureHunt"
                                                   src="https://my-treasurehunt.com/assets/images/logositethmaj2017-430x90.jpg"/></Link></NavbarBrand>
                    <NavbarToggler/>
                    <Collapse navbar>
                        <Nav className="ml-auto" navbar>
                            <Icon path={mdiKeyVariant} size={1}/><NavLink href="login">Login</NavLink>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Routes/>
            </div>);
    }
}

export default App;
