import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon} from '@mdi/react'
import {mdiMenuLeft} from '@mdi/js'

import "../styles/CollapsibleTitle.css"
import {Badge, Button, Collapse} from "reactstrap";

class CollapsibleTitle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openedCollapsible: false,
            icon: this.props.icon,
            icon_style: {}
        }
    }

    toggleCollapsible = () => {

        const newCollapsibleState = !this.state.openedCollapsible;
        const newTransform = {
            transformOrigin: 'center center',
            transform: "rotate(-90deg)",
            webkitTransform : "rotate(-90deg)"
        };

        this.setState({
            openedCollapsible: newCollapsibleState,
            icon_style: (newCollapsibleState) ? newTransform : {}
        });
    };

    render() {
        return (
            <div style={{width: "100%"}}>
                <div className="collapsible-title" onClick={this.toggleCollapsible}>
                    <div>
                        <h2>{this.props.title}</h2>
                        {this.props.notification &&
                        <Badge color="danger" className="collapsible-notif">{this.props.notification}</Badge>}
                    </div>
                    <Icon className="collapsible-icon" path={this.props.icon}
                          size={this.props.icon_size} color={this.props.icon_color}
                          style={this.state.icon_style}/>
                </div>
                <Collapse className="collapsible-content" isOpen={this.state.openedCollapsible}>
                    {this.props.children}
                </Collapse>
                <hr/>
            </div>
        );
    }
}

CollapsibleTitle.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    icon_size: PropTypes.number,
    icon_color: PropTypes.string,
    notification: PropTypes.string
};

CollapsibleTitle.defaultProps = {
    icon: mdiMenuLeft,
    icon_size: 1.5,
    icon_color: "#dddddd"
};

export default CollapsibleTitle;