import React, {Component} from 'react';
import Campaign from '../../Campaign'

import PropTypes from 'prop-types';
import e404 from "../e404";
import CampaignInfo from "./CampaignInfo";

class ManageCampaign extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        //First test existence of campaign in list, if not: render 404
        try {
            var cId = parseInt(this.props.match.params.campaignId);
            console.log(typeof cId);

            var c = null;
            for (let i = 0; i < this.props.campaignsList.length; i++) {
                c = this.props.campaignsList[i];
                if (c.id === cId)
                    break;
            }
        } catch (e) {
            console.error(e);
            return new e404();
        }

        if (c == null || c.id !== cId)
            return new e404();

        return (
            <div>
                <CampaignInfo campaign={c}/>
            </div>
        );
    }
}

ManageCampaign.propTypes = {campaignsList: PropTypes.arrayOf(PropTypes.instanceOf(Campaign)).isRequired};

export default ManageCampaign;