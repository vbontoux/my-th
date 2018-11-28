import React, {Component} from 'react';
import {Icon} from '@mdi/react'
import {mdiWorker} from "@mdi/js";

import "../../styles/utils.css"
import ListCampaigns from "./List Campaigns";
import {CampaignStartList} from "../../classes/Campaign";
import {Container} from "reactstrap";

class ManageCampaignHome extends Component {
    render() {
        return (
            <Container id="manageHome" style={{marginTop: "2em"}}>
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
            </Container>
        );
    }
}

ManageCampaignHome.propTypes = {};

export default ManageCampaignHome;