import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import e404 from "./containers/e404"
import AppliedRoute from "./components/AppliedRoute";

export default ({childProps}) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <Route component={e404} />
    </Switch>;