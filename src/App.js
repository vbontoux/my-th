import React, {Component} from 'react';
import Routes from './Routes'

import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap'

import './App.css';
import './styles/utils.css'
import './components/LoginNavbarEntry'
import LoginNavbarManager from "./components/LoginNavbarManager";

class App extends Component {
    constructor(props) {
        super(props);

        this.toggleLoginPopover = this.toggleLoginPopover.bind(this);
        this.state = {
            loginPopoverOpen: false,
            isAuthenticated: false
        };
    }

    userHasAuthenticated = authenticated => {
        console.log("[MTH] User Auth: " + authenticated);
        this.setState({isAuthenticated: authenticated});
    };

    toggleLoginPopover() {
        this.setState({
            loginPopoverOpen: !this.state.loginPopoverOpen
        });
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
        };
        return (
            <div className="appWrapper" id="App">
                <Navbar color="light" light expand="md">
                    <NavbarBrand style={{paddingLeft: "5em"}} href="/">
                        <img alt="logo my-TreasureHunt"
                             src="https://my-treasurehunt.com/assets/images/logositethmaj2017-430x90.jpg"
                             style={{maxHeight: "50px", margin: "none"}}/>
                    </NavbarBrand>
                    <NavbarToggler/>
                    <Collapse navbar style={{paddingRight: "5em"}}>
                        <Nav className="ml-auto main-navbar" navbar>
                            <LoginNavbarManager authManager={this.userHasAuthenticated} isAuthenticated={this.state.isAuthenticated}/>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Routes childProps={childProps}/>
            </div>
        );
    }
}

export default App;
