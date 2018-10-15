import React, {Component} from 'react';
import Routes from './Routes'

import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavLink} from 'reactstrap'
import Icon from "@mdi/react"
import {mdiKeyVariant} from "@mdi/js"

import './App.css';
import './styles/utils.css'
import {Link} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div className="appWrapper" id="App">
                <Navbar color="light" light expand="md">
                    <NavbarBrand style={{paddingLeft: "5em"}}><Link to="/">
                        <img alt="logo my-TreasureHunt"
                             src="https://my-treasurehunt.com/assets/images/logositethmaj2017-430x90.jpg"
                             style={{maxHeight: "50px", margin: "none"}}/>
                    </Link></NavbarBrand>
                    <NavbarToggler/>
                    <Collapse navbar style={{paddingRight: "5em"}}>
                        <Nav className="ml-auto" navbar>
                            <NavLink href="login">Login</NavLink>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Routes/>
            </div>
    );
    }
    }

    export default App;
