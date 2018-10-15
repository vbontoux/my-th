import React, {Component} from 'react';
import {Collapse, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap'
import './App.css';
import {Link} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand><Link to="/"><img alt="logo my-TreasureHunt" src="https://my-treasurehunt.com/assets/images/logositethmaj2017-430x90.jpg"/></Link></NavbarBrand>
                    <NavbarToggler/>
                    <Collapse navbar>

                    </Collapse>
                </Navbar>
            </div>);
    }
}

export default App;
