import React, {Component} from 'react';

import "../styles/separator.css"

class Separator extends Component {
    render() {
        const {className, ...props} = this.props;
        return (
            <hr className={"hSeparator"} {...props}/>
        );
    }
}

export default Separator;