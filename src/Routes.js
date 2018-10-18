import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import e404 from "./containers/e404"

export default ({childProps}) =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/manage" exact component={e404} />
        <Route component={e404} />
    </Switch>;