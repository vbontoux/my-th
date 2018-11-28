import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from "./containers/Home";
import e404 from "./containers/e404"
import Manage from "./containers/Manage";
import requireAuth from "./components/requireAuth";
import LoginRedirection from "./containers/loginRedirection";
import Features from "./containers/features";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" name="Root" exact component={Home}/>
            <Route path="/features" name="Features" component={Features}/>
            <Route path="/manage" name="Manage" component={requireAuth(Manage)}/>
            <Route path="/login" name="Login" component={LoginRedirection}/>
            <Route component={e404}/>
        </Switch>
    )
}