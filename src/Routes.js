import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from "./containers/Home";
import e404 from "./containers/e404"
import Manage from "./containers/Manage";
import requireAuth from "./components/requireAuth";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" name="Root" exact component={Home}/>
            <Route path="/manage" name="Manage" component={requireAuth(Manage)}/>
            <Route component={e404}/>
        </Switch>
    )
}