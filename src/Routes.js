import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import e404 from "./containers/e404"
import Manage from "./containers/Manage";
import AppliedRoute from "./components/AppliedRoute";

export default () =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} />
        <AppliedRoute path="/manage" exact component={Manage} />
        <Route component={e404} />
    </Switch>;