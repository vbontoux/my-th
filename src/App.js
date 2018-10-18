import React, {Component} from 'react';
import Routes from './Routes'
import {Auth} from 'aws-amplify'
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap'

import './App.css';
import './styles/utils.css'
import './components/LoginNavbarEntry'
import LoginNavbarManager from "./components/LoginNavbarManager";

export const UserContext = React.createContext(null);

class App extends Component {
    constructor(props) {
        super(props);

        this.toggleLoginPopover = this.toggleLoginPopover.bind(this);
        this.state = {
            loginPopoverOpen: false,
            user: {isAuthenticated: false},
            isAuthenticating: true
        };
    }

    async componentDidMount() {
        try {
            await Auth.currentAuthenticatedUser().then(user => {
                this.userHasAuthenticated(user)
            });
        }
        catch (e) {
            if (e) {
                console.error("[AWS_Cogn] " + e);
            }
        }
        this.setState({isAuthenticating: false})
    }

    userHasAuthenticated = authenticated => {
        //TODO Sanitize input
        if (authenticated) {
            this.setState({user: {isAuthenticated: true, ...authenticated}});
            console.log("[MTH] User Auth: " + JSON.stringify(this.state.user));
        }
        else
            this.setState({user: {isAuthenticated: false}})
    };

    logoutHandler = async () => {
        console.log("[MTH] User logout.");
        await Auth.signOut()
            .then(() => {
                this.userHasAuthenticated(null);
            })
            .catch(e => {
                console.error(e);
            });
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
            !this.state.isAuthenticating &&
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
                            <UserContext.Provider value={this.state.user}>
                                <LoginNavbarManager authManager={this.userHasAuthenticated}
                                                    onLogout={this.logoutHandler}
                                                    isAuthenticated={this.state.isAuthenticated}
                                                    user={this.state.user}/>
                            </UserContext.Provider>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Routes childProps={childProps}/>
            </div>
        );
    }
}

export default App;
