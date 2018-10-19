import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Routes extends Component {
    render() {
        return (
            <div>
                {this.props.match.url}
                {/*<Route path="${this.props.match.url}" exact component={} />*/}
            </div>
        );
    }
}

Routes.propTypes = {match: PropTypes.object.isRequired};

export default Routes;