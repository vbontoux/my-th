import React, {Component} from 'react';
import {Col, CustomInput, Form, FormFeedback, FormGroup, Input, InputGroupAddon, Label, Row} from "reactstrap";
import CollapsibleTitle from "../../components/CollapsibleTitle";
import Information from "../../components/Information";

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



class ImageFieldInfos {

    constructor(label = "", count = 0) {
        this.label = label;
        this.count = count;
        this.errors = null;
    }

    label;
    count;
    errors;
}

class CreateCampaign extends Component {

    constructor(props) {
        super(props);

        this.state = {
            help_text_type: experiencesInformations[0],
            help_test_interface: campaignsInformations[0],
            open_interface_settings: false,
            indexImages: new ImageFieldInfos("Séléctionnez une image ou plus"),
            firstMessageImage: new ImageFieldInfos(),
            facebookError: null,
            campaignType: campaignsTypes[0],
            attachToGame: false
        }
    }

    handleChangeType = (e) => {
        this.setState({
            help_text_type: experiencesInformations[e.target.value]
        });
    };

    handleChangeInterface = (e) => {
        this.setState({
            help_text_interface: campaignsInformations[e.target.value],
            campaignType: campaignsTypes[e.target.value]
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

    handleGameCheckboxChange = (e) => {
        this.setState({
            attachToGame: (e.target.checked)
        });
    };

    handleFacebookPageChange = (e) => {
        this.setState({
            facebookError: (e.target.value && e.target.value.match(/^https:\/\/www\.facebook\.com\//g)) ?
                null :
                "Facebook URLs must start with : https://www.facebook.com/"
        })
    };

    render() {
        return (
            <div id="newCampaign" style={{margin: '1em'}}>
                <Form>
                    <CollapsibleTitle title={<h4>Général</h4>} isOpen>
                        <Row form>
                            <Col xs={6}>
                                <Row form style={{padding: 'inherit'}}>
                                    <FormGroup>
                                        <Label>Date de début</Label>
                                        <Input type="date" style={{width: "auto"}}/>
                                    </FormGroup>
                                    <FormGroup style={{marginLeft: '1em'}}>
                                        <Label>Heure de début</Label>
                                        <Input type="time" style={{width: "auto"}}/>
                                    </FormGroup>
                                </Row>
                            </Col>
                            <Col xs={6}>
                                <Row form style={{padding: 'inherit'}}>
                                    <FormGroup>
                                        <Label>Date de fin</Label>
                                        <Input type="date" style={{width: "auto"}}/>
                                    </FormGroup>
                                    <FormGroup style={{marginLeft: '1em'}}>
                                        <Label>Heure de fin</Label>
                                        <Input type="time" style={{width: "auto"}}/>
                                    </FormGroup>
                                </Row>
                            </Col>
                        </Row>
                        <Row form style={{marginBottom: '1em'}}>
                            <Col xs={6}>
                                <FormGroup>
                                    <Label for="type-select">Type d'expérience</Label>
                                    <Input type="select" name="select" id="type-select" onChange={this.handleChangeType}
                                           style={{width: "auto"}}>
                                        {experiencesTypes.map(arrayToOptions)}
                                    </Input>
                                </FormGroup>
                                <Information>
                                    <span>{this.state.help_text_type}</span>
                                </Information>
                            </Col>
                            <Col xs={6}>
                                <FormGroup>
                                    <Label for="type-select">Type de campagne</Label>
                                    <Input type="select" name="select" id="type-select" disabled
                                           onChange={this.handleChangeInterface}
                                           style={{width: "auto"}}
                                           defaultValue={0}>
                                        {campaignsTypes.map(arrayToOptions)}
                                    </Input>
                                </FormGroup>
                                <Information>
                                    <span>{this.state.help_test_interface}</span>
                                </Information>
                            </Col>
                        </Row>
                        <Row form>
                            <Col>
                                <FormGroup>
                                    <Label>Images à indexer</Label>
                                    <CustomInput type="file" label={this.state.indexImages.label}
                                                 multiple onChange={this.handleIndexImagesChange}
                                                 invalid={this.state.indexImages.errors}/>
                                    <FormFeedback
                                        style={{display: (this.state.indexImages.errors) ? "block" : "none"}}>{this.state.indexImages.errors}</FormFeedback>
                                </FormGroup>
                                {this.state.indexImages.count > 1 &&
                                    <FormGroup>
                                    <Label for="exampleNumber">Nombre d'images à collecter</Label>
                                    <Input type="number" max={this.state.indexImages.count} placeholder="Nombre d'images à collecter pour achever un parcours" />
                                </FormGroup>}
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Email de contact</Label>
                                    <Input type="email" placeholder={"exemple@dom.fr"}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" onChange={this.handleGameCheckboxChange}/>
                                        Attacher ma campagne à un jeu Click&Gain
                                    </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CollapsibleTitle>
                    {this.state.campaignType === campaignsTypes[0] &&
                        <CollapsibleTitle title={<h4>Paramètres de campagne facebook</h4>}>
                            <Row form>
                                <Col>
                                    <FormGroup>
                                        <Label>Page Facebook</Label>
                                        <Input type="url" placeholder={'https://www.facebook.com/'}
                                               invalid={this.state.facebookError}
                                               onChange={this.handleFacebookPageChange}/>
                                        <FormFeedback
                                            style={{display: (this.state.facebookError) ? "block" : "none"}}>{this.state.facebookError}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col xs={12} xl={6}>
                                    <FormGroup>
                                        <Label>Premier message</Label>
                                        <Input type="textarea" placeholder={"Rappel de la règle du jeu"}/>
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
                                        <Input type="textarea" placeholder={"Invitation au partage"}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col xs={12} xl={6}>
                                    <FormGroup>
                                        <Label>Message d'analyse</Label>
                                        <Input type="textarea"
                                               placeholder={"Apparaît après chaque envoi d'images par le joueur"}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={12} xl={6}>
                                    <FormGroup>
                                        <Label>Message par défaut</Label>
                                        <Input type="textarea"
                                               placeholder={"Texte quand le bot ne comprend pas (pas d'image)"}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            {this.state.indexImages.count > 1 &&
                                <Row form>
                                    <Col xs={12} xl={6}>
                                        <FormGroup>
                                            <Label>Message match parcours</Label>
                                            <Input type="textarea" placeholder={"Message adressé pour chaque \"checkin\" (image appartenant au parcours) mais achèvement non atteint"}/>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} xl={6}>
                                        <FormGroup>
                                            <Label>Message match fin</Label>
                                            <Input type="textarea"
                                                   placeholder={"Message adressé lorsque l'achèvement est atteint"}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            }
                        </CollapsibleTitle>
                    }
                    {this.state.attachToGame &&
                    <CollapsibleTitle title={<h4>Paramètres de jeu Click&Gain</h4>}>
                        <p>Test</p>
                    </CollapsibleTitle>
                    }
                </Form>
            </div>
        );
    }
}

function areImage(files) {
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

const arrayToOptions = (e, i) => {
    return <option value={i}>{e}</option>
};


CreateCampaign.propTypes = {};

export default CreateCampaign;