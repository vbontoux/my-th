import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Campaign from "classes/Campaign";
import CampaignForm from "./form/CampaignForm";

class CampaignInfo extends Component {
    render() {
        var c = this.props.campaign;
        console.debug("[MTH_C] Render campaign info: ", c);
        return (
            <div>
                <CampaignForm campaign={c}/>
            </div>
        );
    }
}

CampaignInfo.propTypes = {campaign: PropTypes.instanceOf(Campaign)};

export default CampaignInfo;