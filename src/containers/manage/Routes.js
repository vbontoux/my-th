import React, {Component} from 'react';
import {Route} from "react-router-dom";
import e404 from "../e404";
import CreateCampaign from "./CreateCampaign";

class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path={"/manage/create"} component={CreateCampaign}/>
            </div>
        );
    }
}

export default Routes;