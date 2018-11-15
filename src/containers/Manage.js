import React, {Component} from 'react';
import Routes from "./manage/Routes";
import PropTypes from "prop-types";

import "../styles/utils.css"
import "../styles/Manager.css"

class Manage extends Component {

    render() {
        return (
            <div className="container-fluid">
                <Routes match={this.props.match}/>
            </div>
        );
    }
}


Manage.propTypes = {
    match: PropTypes.any.isRequired
};

export default Manage;