import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {InterfaceSettings, InterfaceTypes} from "../../Campaign";
import FacebookFields from "./FacebookFields";
import CollapsibleTitle from "../../components/CollapsibleTitle";

class InterfaceFields extends Component {

    render() {
        let ret = [];
        this.props.types.forEach((type) => {
            let sObject = this.props.settings.find(setting => setting.type === type);

            switch (type) {
                case InterfaceTypes.FACEBOOK:
                    ret.push(<FacebookFields settings={sObject} key={type} id={`field_${type}`}/>);
                    break;
                default:
                    ret.push(<CollapsibleTitle title={<h4>Paramètre de campagne {type.name}</h4>} key={type}
                                               id={`field_${type}`}>TODO</CollapsibleTitle>)
                    break;
            }
        });
        return ret;
    }
}

InterfaceFields.propTypes = {
    settings: PropTypes.arrayOf(PropTypes.instanceOf(InterfaceSettings)),
    types: PropTypes.arrayOf(PropTypes.instanceOf(InterfaceTypes)).isRequired
};

export default InterfaceFields;