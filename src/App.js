import React, {Component} from 'react';
import Routes from './Routes'
import {Auth} from 'aws-amplify'
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap'

import AccountNavbarEntry from "./components/AccountNavbarEntry";
import LoginNavbarEntry from "./components/LoginNavbarEntry";
import LoginForm from "./components/loginForm";

import './App.css';
import './styles/utils.css'
import './styles/loginPopoverStyle.css'

export const UserContext = React.createContext(null);

class App extends Component {
    constructor(props) {
        super(props);

        this.toggleLoginPopover = this.toggleLoginPopover.bind(this);
        this.state = {
            loginPopoverOpen: false,
            user: {isAuthenticated: false},
            isAuthenticating: true,
            openedSidenav: false
        };
    }

    async componentDidMount() {
        window.fbAsyncInit = function() {
            window.FB.init({
                appId: '587504355016303',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.1'
            });
        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v3.1&appId=1961972997413886&autoLogAppEvents=1';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        try {
            if (!this.state.user.isAuthenticated)
                await Auth.currentAuthenticatedUser().then(user => {
                    this.authenticateUser(user);
                });
        }
        catch (e) {
            if (e) {
                console.error("[AWS_Cogn] " + e);
            }
        }
        this.setState({isAuthenticating: false})
    }

    authenticateUser = authenticated => {
        //TODO Sanitize input
        if (authenticated) {
            this.setState({user: {isAuthenticated: true, ...authenticated}});
            console.debug("[DEBUG] MTH - AWS Cognito: User authentication", authenticated);
        }
        else
            this.setState({user: {isAuthenticated: false}})
    };

    logoutHandler = async () => {
        console.log("[DEBUG] MTH - AWS Cognito: User logout.");
        await Auth.signOut()
            .then(() => {
                this.authenticateUser(null);
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
                        <NavbarBrand href="/">
                            <img alt="logo my-TreasureHunt"
                                 src="https://my-treasurehunt.com/assets/images/logositethmaj2017-430x90.jpg"
                                 style={{maxHeight: "50px", margin: "none"}}/>
                        </NavbarBrand>
                        <NavbarToggler onClick={() => {
                            this.setState({openedSidenav: !this.state.openedSidenav});
                        }}/>
                        <Collapse navbar style={{paddingRight: "5em"}} isOpen={this.state.openedSidenav}>
                            <Nav className="ml-auto main-navbar" navbar>
                                <NavItem><NavLink href="TODO">About us</NavLink></NavItem>
                                <NavItem><NavLink href="manage">Manage my campaigns</NavLink></NavItem>
                                {this.state.user.isAuthenticated ?
                                    <AccountNavbarEntry onLogout={this.logoutHandler} user={this.state.user}/>
                                    :
                                    <LoginNavbarEntry onLogin={this.authenticateUser}/>
                                }
                            </Nav>
                        </Collapse>
                    </Navbar>
                    <UserContext.Provider>
                        <Routes childProps={childProps}/>
                    </UserContext.Provider>
                </div>
        );
    }
}

export default App;
