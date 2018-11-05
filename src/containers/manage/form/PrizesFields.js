import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Prize} from "../../Campaign";
import PrizeFields from "./PrizeFields";
import CollapsibleTitle from "../../components/CollapsibleTitle";
import {Button} from "reactstrap";
import {Icon} from '@mdi/react'
import {mdiPlusCircle} from "@mdi/js";

class PrizesFields extends Component {


    constructor(props) {
        super(props);
        this.state = {
            prizes: (this.props.prizes) ? this.props.prizes : [null]
        }
    }

    addEmptyPrize = () => {
        this.setState({
            prizes: [...this.state.prizes, null]
        });
    }

    render() {
        var ret = [];
        if (this.state.prizes && this.state.prizes.length > 0)
            for (let i = 0; i < this.state.prizes.length; i++) {
                ret.push(<PrizeFields prize={this.state.prizes[i]} id={i + 1} key={i + 1}/>)
            }
        else
            this.setState({prizes: [null]});

        return (
            <CollapsibleTitle title={<h5>Lots</h5>} isOpen>
                {ret}
                <Button outline block style={{width: '90%', margin: 'auto'}} color={"primary"}
                        onClick={this.addEmptyPrize}>
                    <div style={{
                        width: "8em",
                        margin: 'auto',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            Ajouter un lot
                        </div>
                        <Icon path={mdiPlusCircle} size={1}/>
                    </div>
                </Button>
            </CollapsibleTitle>
        );
    }
}

PrizesFields.propTypes = {prizes: PropTypes.arrayOf(PropTypes.instanceOf(Prize))};

export default PrizesFields;