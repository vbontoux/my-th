import React, {Component} from 'react';
import {Icon} from '@mdi/react'
import {mdiWorker} from "@mdi/js";

import "../../styles/utils.css"
import ListCampaigns from "./List Campaigns";
import {CampaignStartList} from "../../Campaign";

class ManageCampaignHome extends Component {
    render() {
        return (
            <div id="manageHome">
                <ListCampaigns list={CampaignStartList}/>
                <div>
                    <div className="test_text" style={{paddingTop: "100px"}}>
                        <h1>Work in progress</h1>
                        <ul style={{listStyleType: 'none', padding: 0}}>
                            <li>Do not expect all behaviours to work</li>
                            <li>Somme color might be altered because of markup visualisation</li>
                            <li>Styling is a draft here</li>
                            <li><code>Strawberry pie</code></li>
                        </ul>
                        <Icon path={mdiWorker} size={4} color="#999" style={{opacity: 0.2}}/>
                    </div>
                </div>
            </div>
        );
    }
}

ManageCampaignHome.propTypes = {};

export default ManageCampaignHome;