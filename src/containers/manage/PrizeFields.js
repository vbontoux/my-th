import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Prize} from "../../Campaign";
import {Row, Col, FormGroup, Input} from "reactstrap";
import CollapsibleTitle from "../../components/CollapsibleTitle";

class PrizeFields extends Component {
    render() {
        var p = this.props.prize;
        var id = this.props.id;
        return (
            <div id={(id) ? `prize_${id}` : 'prize_empty_fields'} key={id}>
                <CollapsibleTitle title={<h6>Lot {id}</h6>} isOpen separator={false}
                                  style={{width: '90%', margin: 'auto'}}>
                    <Row style={{margin: 'auto'}}>
                        <Col>
                            <FormGroup>
                                <Input placeholder={`Nom du lot`}
                                       defaultValue={(p) ? p.name : null}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row style={{margin: 'auto'}}>
                        <Col>
                            <FormGroup>
                                <Input type="textarea"
                                       placeholder={`Déscription du lot`}
                                       defaultValue={(p) ? p.description : null}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row style={{margin: 'auto'}}>
                        <Col xs={4}>
                            <FormGroup>
                                <Input type="number" placeholder={`Qté`}
                                       defaultValue={(p) ? p.quantity : null}/>
                            </FormGroup>
                        </Col>
                        <Col xs={8}>
                            <FormGroup>
                                <Input type="number" step={0.01}
                                       placeholder={`Prix (TTC) ${id}`}
                                       defaultValue={(p) ? p.price : null}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </CollapsibleTitle>
            </div>
        );
    }
}

PrizeFields.propTypes = {
    prize: PropTypes.instanceOf(Prize).isRequired,
    id: PropTypes.oneOf(
        PropTypes.string,
        PropTypes.number)
};

export default PrizeFields;