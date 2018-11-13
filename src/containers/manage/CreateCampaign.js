import React, {Component} from 'react';
import CampaignForm from "./form/CampaignForm";


class CreateCampaign extends Component {
    render() {
        return (
            <div id="newCampaign" style={{margin: '1em'}}>
                <CampaignForm/>
            </div>
        );
    }
}

CreateCampaign.propTypes = {};

export default CreateCampaign;