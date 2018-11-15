import React, {Component} from 'react';
import PropTypes from 'prop-types';

import "../styles/background.css"

var Strings = {};
Strings.orEmpty = function( entity ) {
    return entity || "";
};

class Background extends Component {
    render() {
        const {color, style, className, ...childProps} = this.props;
        return (
            <div className={"background " + Strings.orEmpty(className)} style={Object.assign({background: this.props.color}, style)} {...childProps}>
                    {this.props.children}
            </div>
        );
    }
}

Background.propTypes = {color: PropTypes.string};

export default Background;