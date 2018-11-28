import React from 'react';
import PropTypes from 'prop-types';
import {Button} from "reactstrap";
import {PulseLoader} from "react-spinners";

function ButtonSpinable(props) {
    var {loading, spinner, ...others} = props;
    return (
        <Button disabled={loading} {...others}>
            {
                (props.loading) ?
                    (props.spinner === undefined || props.spinner === null) ?
                        <PulseLoader
                            sizeUnit={"em"}
                            size={0.4}
                            color={'#999999'}
                            loading={true}/>
                        :
                        spinner
                    :
                    props.children
            }
        </Button>
    );
}

ButtonSpinable.propTypes = {
    loading: PropTypes.bool.isRequired,
    spinner: PropTypes.any,
};

export default ButtonSpinable;