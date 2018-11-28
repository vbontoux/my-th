import React, {Component} from 'react';
import {Col, Container, Row} from "reactstrap";
import {FeatureBuisness, FeatureFree, FeatureWatermark} from "./features/featurePreset";

class Features extends Component {
    render() {
        return (
            <div>
                <Container style={{margin: "4rem auto"}}>
                    <Row>
                        <Col xs={12} xl={4} style={{textAlign: 'center'}}>
                            <FeatureFree/>
                        </Col>
                        <Col xs={12} xl={4} style={{textAlign: 'center'}}>
                            <FeatureWatermark/>
                        </Col>
                        <Col xs={12} xl={4} style={{textAlign: 'center'}}>
                            <FeatureBuisness/>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

Features.propTypes = {};

export default Features;