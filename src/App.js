import React, {Component} from 'react';
import Routes from './Routes'

import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    Popover,
    PopoverBody,
    PopoverHeader
} from 'reactstrap'

import LoginForm from './components/loginForm.js'
import './App.css';
import './styles/utils.css'

class App extends Component {
    constructor(props) {
        super(props);

        this.toggleLoginPopover = this.toggleLoginPopover.bind(this);
        this.state = {
            loginPopoverOpen: false
        };
    }

    toggleLoginPopover() {
        this.setState({
            loginPopoverOpen: !this.state.loginPopoverOpen
        });    }

    render() {
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
                            <NavItem id="loginPopoverButton1" onClick={this.toggleLoginPopover}>
                                Login
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Popover target={"loginPopoverButton1"} placement="bottom" isOpen={this.state.loginPopoverOpen}
                         toggle={this.toggleLoginPopover}>
                    <PopoverHeader>Login</PopoverHeader>
                    <PopoverBody><LoginForm/></PopoverBody>
                </Popover>
                <Routes/>
            </div>
        );
    }
}

export default App;
