import React, {Component} from 'react';
import {Col, CustomInput, Form, FormFeedback, FormGroup, Input, InputGroupAddon, Label, Row} from "reactstrap";
import CollapsibleTitle from "../../components/CollapsibleTitle";
import Information from "../../components/Information";

const typeTexts = [
    "l'utilisateur est invité à adresser une photo pour recevoir de l'information, accompagnée éventuellement d'un incentive (coupon, jeu...).",
    "l'utilisateur est lancé dans la recherche d'une ou de plusieurs images. Il sera récompensé à l'achèvement de son parcours.",
    "l'utilisateur exprime un choix par l'envoi d'une image. Un vote multiple est permis (voter pour plusieurs images sur un choix large) mais un vote répété sur une même image n'est comptabilisé qu'une seule fois. Les résultats du vote peuvent en temps réel être intégrés dans l'email de retour ou dans une page qui sera affichée sur le web ou sur un grand écran lors d'un événement."];

const interfaceText = [
    "Bot messenger description goes here",
    "Twitter description goes here",
    "E-Mail description goes here"];

class ImageFieldInfos {

    constructor(label = "Pick 1 image or more", count = 0) {
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
            help_text_type: typeTexts[0],
            help_test_interface: interfaceText[0],
            open_interface_settings: false,
            indexImages: new ImageFieldInfos(),
            firstMessageImage: new ImageFieldInfos(''),
            facebookError: null
        }
    }

    handleChangeType = (e) => {
        this.setState({
            help_text_type: typeTexts[e.target.value - 1]
        });
    };

    handleChangeInterface = (e) => {
        this.setState({
            help_text_interface: interfaceText[e.target.value - 1]
        });
    };

    handleIndexImagesChange = (e) => {
        const files = e.target.files;
        if (areImage(files))
            this.setState({
                indexImages: {
                    errors: null,
                    count: files.length,
                    label: `${files.length} image${(files.length > 1) ? 's' : ''} selected`
                }
            });
        else {
            this.setState({
                indexImages: {
                    errors: "Invalid images types",
                    count: 0,
                    label: "Pick 1 image or more"
                }
            });
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
                    errors: "Invalid images types",
                    count: 0,
                    label: ""
                }
            });
            e.target.value = "";
        }
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
                    <CollapsibleTitle title={<h4>General</h4>} isOpen>
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
                                    <Label for="type-select">Campaign type</Label>
                                    <Input type="select" name="select" id="type-select" onChange={this.handleChangeType}
                                           style={{width: "auto"}}>
                                        <option value={1} selected>Informative</option>
                                        <option value={2}>Hunt</option>
                                        <option value={3}>Vote</option>
                                    </Input>
                                </FormGroup>
                                <Information>
                                    <span>{this.state.help_text_type}</span>
                                </Information>
                            </Col>
                            <Col xs={6}>
                                <FormGroup>
                                    <Label for="type-select">Interface</Label>
                                    <Input type="select" name="select" id="type-select" disabled
                                           onChange={this.handleChangeInterface}
                                           style={{width: "auto"}}>
                                        <option value={1} selected>Bot messenger</option>
                                        <option value={2}>E-mail</option>
                                        <option value={3}>Twitter</option>
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
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Contact email</Label>
                                    <Input type="email" placeholder={"some@email.here"}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CollapsibleTitle>
                    <CollapsibleTitle title={<h4>Interface settings</h4>}>
                        <Row form>
                            <Col>
                                <FormGroup>
                                    <Label>Facebook page</Label>
                                    <Input type="url" placeholder={'https://www.facebook.com/'}
                                           invalid={this.state.facebookError} onChange={this.handleFacebookPageChange}/>
                                    <FormFeedback
                                        style={{display: (this.state.facebookError) ? "block" : "none"}}>{this.state.facebookError}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col xs={12} xl={6}>
                                <FormGroup>
                                    <Label>First message</Label>
                                    <Input type="textarea" placeholder={"Rappel de la règle du jeu"}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Images à indexer</Label>
                                    <CustomInput type="file" label={this.state.firstMessageImage.label}
                                                 multiple onChange={this.handleFirstMessageImagesChange}/>
                                    <FormFeedback
                                        style={{display: (this.state.firstMessageImage.errors) ? "block" : "none"}}>{this.state.firstMessageImage.errors}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col xs={12} xl={6}>
                                <FormGroup>
                                    <Label>Final message</Label>
                                    <Input type="textarea" placeholder={"Invitation au partage"}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col xs={12} xl={4}>
                                <FormGroup>
                                    <Label>Analysis message</Label>
                                    <Input type="textarea"
                                           placeholder={"Apparaît après chaque envoi d'images par le joueur"}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} xl={4}>
                                <FormGroup>
                                    <Label>Match end message</Label>
                                    <Input type="textarea" placeholder={"?"}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} xl={4}>
                                <FormGroup>
                                    <Label>Default message</Label>
                                    <Input type="textarea"
                                           placeholder={"Texte quand le bot ne comprend pas (pas d'image)"}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CollapsibleTitle>
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


CreateCampaign.propTypes = {};

export default CreateCampaign;