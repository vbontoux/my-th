import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FacebookSettings} from "../../Campaign";
import {Row, Col, FormGroup, Label, Input, FormFeedback, CustomInput} from "reactstrap";
import CollapsibleTitle from "../../components/CollapsibleTitle";
import {areImage, ImageFieldInfos} from "./CampaignForm";

class FacebookFields extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstMessageImage: new ImageFieldInfos(),
            facebookError: null
        }
    }

    handleFacebookPageChange = (e) => {
        this.setState({
            facebookError: (e.target.value && e.target.value.match(/^https:\/\/www\.facebook\.com\//g)) ?
                null :
                "Facebook URLs must start with : https://www.facebook.com/",
        })
    };

    handleFirstMessageImagesChange = (e) => {
        const files = e.target.files;
        if (areImage(files))
            this.setState({
                firstMessageImage: {
                    errors: null,
                    count: files.length,
                    label: files[0].name
                }
            });
        else {
            this.setState({
                firstMessageImage: {
                    errors: "Type de fichier invalide",
                    count: 0,
                    label: ""
                }
            });
            e.target.value = "";
        }
    };

    render() {
        var s = this.props.settings;
        return (
            <CollapsibleTitle title={<h4>Paramètres de campagne facebook</h4>}>
                <Row form>
                    <Col>
                        <FormGroup>
                            <Label>Page Facebook</Label>
                            <Input type="url" placeholder={'https://www.facebook.com/'}
                                   invalid={this.state.facebookError}
                                   onChange={this.handleFacebookPageChange}
                                   defaultValue={(s) ? s.page : ''}/>
                            <FormFeedback
                                style={{display: (this.state.facebookError) ? "block" : "none"}}>{this.state.facebookError}</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col xs={12} xl={6}>
                        <FormGroup>
                            <Label>Premier message</Label>
                            <Input type="textarea" placeholder={"Rappel de la règle du jeu"}
                                   defaultValue={(s) ? s.msgFirst : ''}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Images premier message</Label>
                            <CustomInput type="file" label={this.state.firstMessageImage.label}
                                         multiple onChange={this.handleFirstMessageImagesChange}/>
                            <FormFeedback
                                style={{display: (this.state.firstMessageImage.errors) ? "block" : "none"}}>{this.state.firstMessageImage.errors}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xs={12} xl={6}>
                        <FormGroup>
                            <Label>Message final</Label>
                            <Input type="textarea" placeholder={"Invitation au partage"}
                                   defaultValue={(s) ? s.msgFinal : ''}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col xs={12} xl={6}>
                        <FormGroup>
                            <Label>Message d'analyse</Label>
                            <Input type="textarea"
                                   placeholder={"Apparaît après chaque envoi d'images par le joueur"}
                                   defaultValue={(s) ? s.msgAnalysis : ''}/>
                        </FormGroup>
                    </Col>
                    <Col xs={12} xl={6}>
                        <FormGroup>
                            <Label>Message par défaut</Label>
                            <Input type="textarea"
                                   placeholder={"Texte quand le bot ne comprend pas (pas d'image)"}
                                   defaultValue={(s) ? s.msgDefault : ''}/>
                        </FormGroup>
                    </Col>
                </Row>
            </CollapsibleTitle>
        );
    }
}

FacebookFields.propTypes = {settings: PropTypes.instanceOf(FacebookSettings)};

export default FacebookFields;