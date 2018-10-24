import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Campaign from "../../Campaign";

class CampaignInfo extends Component {
    render() {
        var c = this.props.campaign;
        console.debug("[MTH_C] Render campaign info: ", c);
        return (
            <div>
                {c.id}
            </div>
        );
    }
}

CampaignInfo.propTypes = {campaign: PropTypes.instanceOf(Campaign)};

export default CampaignInfo;