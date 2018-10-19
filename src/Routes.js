import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import e404 from "./containers/e404"
import Manage from "./containers/Manage";

export default () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/manage" exact component={Manage} />
        <Route component={e404} />
    </Switch>;