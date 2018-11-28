import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon} from '@mdi/react'
import {mdiMenuLeft} from '@mdi/js'

import "../styles/CollapsibleTitle.css"
import "../styles/utils.css"

import {Badge, Collapse} from "reactstrap";

class CollapsibleTitle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openedCollapsible: this.props.isOpen,
            icon: this.props.icon,
            rotation: this.props.isOpen * -90,
        }
    }

    toggleCollapsible = () => {

        const newCollapsibleState = !this.state.openedCollapsible;

        this.setState({
            openedCollapsible: newCollapsibleState,
            rotation: -90 * newCollapsibleState * this.props.rotate_icon
        });
    };

    render() {
        return (
            <div style={{width: '100%', ...this.props.style}}>
                <div className="collapsible-title" onClick={this.toggleCollapsible}>
                    {(typeof this.props.title === "string") ? <h2>{this.props.title}</h2> : this.props.title}
                    {this.props.notification &&
                    <Badge color="danger" className="collapsible-notif">{this.props.notification}</Badge>}
                    {this.props.icon &&
                    <Icon className="collapsible-icon" path={this.props.icon}
                          size={this.props.icon_size} color={this.props.icon_color}
                          style={{
                              transformOrigin: 'center center',
                              transform: `rotate(${this.state.rotation}deg)`,
                              WebkitTransform: `rotate(${this.state.rotation}deg)`
                          }
                          }
                    />}
                </div>
                <Collapse className="collapsible-content" isOpen={this.state.openedCollapsible}>
                    {this.props.children}
                </Collapse>
                {this.props.separator && <hr/>}
            </div>
        );
    }
}

CollapsibleTitle.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    icon: PropTypes.string,
    icon_size: PropTypes.number,
    icon_color: PropTypes.string,
    notification: PropTypes.string,
    separator: PropTypes.bool,
    title_tag: PropTypes.element,
    isOpen: PropTypes.bool,
    rotate_icon: PropTypes.bool,
    children: PropTypes.node.isRequired
};

CollapsibleTitle.defaultProps = {
    icon: mdiMenuLeft,
    icon_size: 1.5,
    icon_color: "#dddddd",
    separator: true,
    isOpen: false,
    rotate_icon: true
};

export default CollapsibleTitle;