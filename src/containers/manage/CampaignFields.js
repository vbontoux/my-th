import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CampaignSettings} from "../../Campaign";
import {ImageFieldInfos} from "./CampaignForm";
import FacebookFields from "./FacebookFields";
import CollapsibleTitle from "../../components/CollapsibleTitle";

class CampaignFields extends Component {

    render() {
        var type = this.props.settings;
        var sObject = null;
        if (typeof this.props.settings === "object") {
            type = this.props.settings.type;
            sObject = this.props.settings;
        }

        switch (type) {
            case 0:
                return <FacebookFields settings={sObject}/>;
            default:
                return <CollapsibleTitle title={"CampaignType"}>TODO</CollapsibleTitle>
        }
    }
}

CampaignFields.propTypes = {
    settings: PropTypes.oneOf(
        PropTypes.instanceOf(CampaignSettings),
        PropTypes.number).isRequired};

export default CampaignFields;