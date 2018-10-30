import React, {Component} from 'react';
import Routes from './Routes'
import {Auth} from 'aws-amplify'
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap'

import {urls, facebookAppID} from './config'

import AccountNavbarEntry from "./components/AccountNavbarEntry";
import LoginNavbarEntry from "./components/LoginNavbarEntry";

import './App.css';
import './styles/utils.css'
import './styles/loginPopoverStyle.css'
import {Link} from "react-router-dom";

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
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: facebookAppID,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.1'
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = urls.FacebookSDK;
            console.log(`Facebook SDK: ${js.src}`);
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
        console.debug("[DEBUG] MTH - AWS Cognito: User logout.");
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
        return (
            !this.state.isAuthenticating &&
            <div className="appWrapper" id="App">
                <Navbar color="light" light expand="md">
                    <NavbarBrand>
                        <Link to={"/"}>
                            <img alt="logo my-TreasureHunt"
                                 src="https://my-treasurehunt.com/assets/images/logositethmaj2017-430x90.jpg"
                                 style={{maxHeight: "50px", margin: "none"}}/>
                        </Link>
                    </NavbarBrand>
                    <NavbarToggler onClick={() => {
                        this.setState({openedSidenav: !this.state.openedSidenav});
                    }}/>
                    <Collapse navbar style={{paddingRight: "5em"}} isOpen={this.state.openedSidenav}>
                        <Nav className="ml-auto main-navbar" navbar>
                            <NavItem><NavLink><Link to={"/"}>About us</Link></NavLink></NavItem>
                            <NavItem><NavLink><Link to={"/manage"}>Manage your campaigns</Link></NavLink></NavItem>
                            {this.state.user.isAuthenticated ?
                                <AccountNavbarEntry onLogout={this.logoutHandler} user={this.state.user}/>
                                :
                                <LoginNavbarEntry onLogin={this.authenticateUser}/>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
                <UserContext.Provider>
                    <Routes match={this.props.match}/>
                </UserContext.Provider>
            </div>
        );
    }
}

export default App;
