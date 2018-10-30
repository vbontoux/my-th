import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, CustomInput, Form, FormFeedback, FormGroup, Input, InputGroupAddon, Label, Row} from "reactstrap";
import CollapsibleTitle from "../../components/CollapsibleTitle";
import Information from "../../components/Information";
import {Icon} from '@mdi/react'
import {mdiPlusCircle, mdiContentSave, mdiTreasureChest} from '@mdi/js'
import Campaign from "../../Campaign";
import CampaignFields from "./CampaignFields";
import GameFields from "./GameFields";

const experiencesTypes = ["Informatif", "Chasse / Parcour", "Vote"];
const experiencesInformations = [
    "l'utilisateur est invité à adresser une photo pour recevoir de l'information, accompagnée éventuellement d'un incentive (coupon, jeu...).",
    "l'utilisateur est lancé dans la recherche d'une ou de plusieurs images. Il sera récompensé à l'achèvement de son parcours.",
    "l'utilisateur exprime un choix par l'envoi d'une image. Un vote multiple est permis (voter pour plusieurs images sur un choix large) mais un vote répété sur une même image n'est comptabilisé qu'une seule fois. Les résultats du vote peuvent en temps réel être intégrés dans l'email de retour ou dans une page qui sera affichée sur le web ou sur un grand écran lors d'un événement."];

const campaignsTypes = ['Bot Messenger', "Twitter", "Email"];
const campaignsInformations = [
    "Bot messenger description goes here",
    "Twitter description goes here",
    "E-Mail description goes here"];

//TODO use enums for checking types

export class ImageFieldInfos {

    constructor(label = "", count = 0) {
        this.label = label;
        this.count = count;
        this.errors = null;
    }

    label;
    count;
    errors;
}

class CampaignForm extends Component {

    constructor(props) {
        super(props);
        var c = this.props.campaign;
        this.state = {
            selectExperience: {
                value: (c) ? c.experienceSettings.type : 0,
                choices: experiencesTypes,
                helps: experiencesInformations
            },
            selectCampaignType: {
                value: (c) ? c.campaignSettings.type : 0,
                choices: campaignsTypes,
                helps: campaignsInformations
            },

            open_interface_settings: false,
            indexImages: new ImageFieldInfos((c) ? "Séléctionnez au moins une image" : "Séléctionnez une image"), //TODO: Retrieving existing campaign files
            attachToGame: (c) ? c.gameSettings !== null : false
        }
    }

    handleChangeExperience = (e) => {
        const selectExperience = this.state.selectExperience;
        selectExperience.value = e.target.value;
        this.setState({
            selectExperience
        });
    };

    handleChangeCampaignType = (e) => {
        const selectCampaignType = this.state.selectCampaignType;
        selectCampaignType.value = e.target.value;
        this.setState({
            selectCampaignType
        });
    };

    handleIndexImagesChange = (e) => {
        const files = e.target.files;
        if (areImage(files))
            this.setState({
                indexImages: {
                    errors: null,
                    count: files.length,
                    label: `${files.length} image${(files.length > 1) ? 's' : ''} sélectionées.`
                }
            });
        else {
            this.setState({
                    indexImages: new ImageFieldInfos()
                }
            );
            e.target.value = "";
        }
    };

    handleGameCheckboxChange = (e) => {
        this.setState({
            attachToGame: (e.target.checked)
        });
    };

    render() {
        var c = this.props.campaign;
        var start = [null, null];
        var end = [null, null];
        if (c) {
            start = FormatAndSplitDate(c.start);
            end = FormatAndSplitDate(c.start);
        }
        return (
            <div id="newCampaign" style={{margin: '1em'}}>
                <Form>
                    <CollapsibleTitle title={<h4>Général</h4>} isOpen>
                        <Row form>
                            <Col xs={6}>
                                <Row form style={{padding: 'inherit'}}>
                                    <FormGroup>
                                        <Label>Date de début</Label>
                                        <Input type="date" style={{width: "auto"}}
                                               defaultValue={start[0]}/>
                                    </FormGroup>
                                    <FormGroup style={{marginLeft: '1em'}}>
                                        <Label>Heure de début</Label>
                                        <Input type="time" style={{width: "auto"}}
                                               defaultValue={start[1]}/>
                                    </FormGroup>
                                </Row>
                            </Col>
                            <Col xs={6}>
                                <Row form style={{padding: 'inherit'}}>
                                    <FormGroup>
                                        <Label>Date de fin</Label>
                                        <Input type="date" style={{width: "auto"}}
                                               defaultValue={end[0]}/>
                                    </FormGroup>
                                    <FormGroup style={{marginLeft: '1em'}}>
                                        <Label>Heure de fin</Label>
                                        <Input type="time" style={{width: "auto"}}
                                               defaultValue={end[1]}/>
                                    </FormGroup>
                                </Row>
                            </Col>
                        </Row>
                        <Row form style={{marginBottom: '1em'}}>
                            <Col xs={6}>
                                <FormGroup>
                                    <Label for="type-select">Type d'expérience</Label>
                                    <Input type="select" onChange={this.handleChangeExperience}
                                           defaultValue={this.state.selectExperience.value} disabled={(c != null)}>
                                        {this.state.selectExperience.choices.map(arrayToOptions)}
                                    </Input>
                                </FormGroup>
                                <Information>
                                    <span>{this.state.selectExperience.helps[this.state.selectExperience.value]}</span>
                                </Information>
                            </Col>
                            <Col xs={6}>
                                <FormGroup>
                                    <Label for="type-select">Type de campagne</Label>
                                    <Input type="select" onChange={this.handleChangeCampaignType}
                                           defaultValue={this.state.selectCampaignType.value} disabled>
                                        {this.state.selectCampaignType.choices.map(arrayToOptions)}
                                    </Input>
                                </FormGroup>
                                <Information>
                                    <span>{this.state.selectCampaignType.helps[this.state.selectCampaignType.value]}</span>
                                </Information>
                            </Col>
                        </Row>
                        <Row form>
                            <Col>
                                <FormGroup>
                                    <Label>Images à indexer</Label>
                                    <CustomInput type="file" label={this.state.indexImages.label}
                                                 multiple={(c.campaignSettings.type === 1)}
                                                 onChange={this.handleIndexImagesChange}
                                                 invalid={this.state.indexImages.errors}/>
                                    <FormFeedback
                                        style={{display: (this.state.indexImages.errors) ? "block" : "none"}}>{this.state.indexImages.errors}</FormFeedback>
                                </FormGroup>
                                {this.state.indexImages.count > 1 &&
                                <FormGroup>
                                    <Label for="exampleNumber">Nombre d'images à collecter</Label>
                                    <Input type="number" defaultValue={1} min={1} max={this.state.indexImages.count}
                                           placeholder="Nombre d'images à collecter pour achever un parcours"/>
                                </FormGroup>}
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Email de contact</Label>
                                    <Input type="email" placeholder={"exemple@dom.fr"} defaultValue={c.emailContact}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" onChange={this.handleGameCheckboxChange}
                                               defaultValue={c.gameSettings != null} checked={this.state.attachToGame}/>
                                        Attacher ma campagne à un jeu Click&Gain
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        {this.state.indexImages.count > 1 &&
                        <Row form>
                            <Col xs={12} xl={6}>
                                <FormGroup>
                                    <Label>Message match parcours</Label>
                                    <Input type="textarea"
                                           placeholder={"Message adressé pour chaque \"checkin\" (image appartenant au parcours) mais achèvement non atteint"}
                                           defaultValue={(c.experienceSettings) ? c.experienceSettings.msgMatch : ''}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} xl={6}>
                                <FormGroup>
                                    <Label>Message match fin</Label>
                                    <Input type="textarea"
                                           placeholder={"Message adressé lorsque l'achèvement est atteint"}
                                           defaultValue={(c.experienceSettings) ? c.experienceSettings.msgMatchEnd : ''}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        }
                    </CollapsibleTitle>
                    <CampaignFields settings={c.campaignSettings}/>
                    {this.state.attachToGame &&
                        <GameFields settings={(c && c.gameSettings) ? c.gameSettings : null}/>
                    }
                    <Row>
                        <Col xs={8}>
                            <Button block color={"primary"}>
                                <div style={{
                                    width: '14em',
                                    margin: 'auto',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        Lancer ma campagne
                                    </div>
                                    <Icon path={mdiTreasureChest} size={1}/>
                                </div>
                            </Button>
                        </Col>
                        <Col xs={4}>
                            <Button block>
                                <div style={{
                                    width: "8em",
                                    margin: 'auto',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        Brouillon
                                    </div>
                                    <Icon path={mdiContentSave} size={1}/>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

function FormatAndSplitDate(moment) {
    return [moment.format('YYYY-MM-DD'),
        moment.format('HH:mm:ss')]
}

export function areImage(files) {
    if (files) {
        for (let i = 0; i < files.length; i++) {
            const f = files.item(i);
            if (f.type === "" || !f.type.match(/^image\//g))
                return false;
        }
        return true;
    }
    return false;
}

export function arrayToOptions(e, i) {
    return <option value={i}>{e}</option>
}


CampaignForm.propTypes = {campaign: PropTypes.instanceOf(Campaign)};

export default CampaignForm;