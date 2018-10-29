import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, CustomInput, Form, FormFeedback, FormGroup, Input, InputGroupAddon, Label, Row} from "reactstrap";
import CollapsibleTitle from "../../components/CollapsibleTitle";
import Information from "../../components/Information";
import {Icon} from '@mdi/react'
import {mdiPlusCircle, mdiContentSave, mdiTreasureChest} from '@mdi/js'
import Campaign from "../../Campaign";

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

const gameType = ["Concours", "Tirage au sort", "Instants gagnants"];
const gameInformations = [
    "bien préciser l'ordre de distribution des lots aux vainqueurs.",
    "parmi les emails participants, un tirage au sort est aléatoirement effectué automatiquement dans la minute suivant la fin de la campagne. L'email de victoire est automatiquement adressé aux gagnants.",
    "pas de limite de participation perdante par défaut. Possibilité de paramétrer un délai fixe entre 2 participations."
];

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

class CampaignForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectExperience: {value: 0, choices: experiencesTypes, helps: experiencesInformations},
            selectCampaignType: {value: 0, choices: campaignsTypes, helps: campaignsInformations},
            selectGameType: {value: 0, choices: gameType, helps: gameInformations},

            open_interface_settings: false,
            indexImages: new ImageFieldInfos("Séléctionnez une image ou plus"),
            firstMessageImage: new ImageFieldInfos(),
            facebookError: null,
            campaignType: campaignsTypes[0],
            attachToGame: false
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

    handleChangeGameType = (e) => {
        const selectGameType = this.state.selectGameType;
        selectGameType.value = e.target.value;
        this.setState({
            selectGameType
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
        var c = this.props.campaign;
        var start = (c) ? FormatAndSplitDate(c.start) : [null, null];
        var end = (c) ? FormatAndSplitDate(c.end) : [null, null];
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
                                           defaultValue={this.state.selectExperience.value}>
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
                                                 multiple onChange={this.handleIndexImagesChange}
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
                                    <Input type="textarea"
                                           placeholder={"Message adressé pour chaque \"checkin\" (image appartenant au parcours) mais achèvement non atteint"}/>
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
                        <Row form>
                            <Col xs={12} xl={6}>
                                <FormGroup>
                                    <Label for="type-select">Type de jeu</Label>
                                    <Input type="select" onChange={this.handleChangeGameType}
                                           defaultValue={this.state.selectGameType.value}>
                                        {this.state.selectGameType.choices.map(arrayToOptions)}
                                    </Input>
                                </FormGroup>
                                <Information>
                                    <span>{this.state.selectGameType.helps[this.state.selectGameType.value]}</span>
                                </Information>
                            </Col>
                            <Col xs={12} xl={6}>
                                <FormGroup>
                                    <Label>Déscription</Label>
                                    <Input type="textarea"
                                           placeholder={"Description du jeu Click&Gain"}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col xs={12} xl={6}>
                                <CollapsibleTitle title={<h5>Lots</h5>} isOpen>
                                    <CollapsibleTitle title={<h6>Lot n°1</h6>} isOpen separator={false}
                                                      style={{width: '90%', margin: 'auto'}}>
                                        <Row style={{margin: 'auto'}}>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <FormGroup>
                                                            <Input placeholder={"Nom du lot n°1"}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <FormGroup>
                                                            <Input type="textarea"
                                                                   placeholder={"Déscription du lot n°1"}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={4}>
                                                        <FormGroup>
                                                            <Input type="number" placeholder={"Qté"}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col xs={8}>
                                                        <FormGroup>
                                                            <Input type="number" step={0.01}
                                                                   placeholder={"Prix (TTC)"}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </CollapsibleTitle>
                                    <Button outline block style={{width: '90%', margin: 'auto'}} color={"primary"}
                                            disabled>
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
                            </Col>
                            <Col xs={12} xl={6}>
                                <FormGroup>
                                    <Label>Règlement</Label>
                                    <Input placeholder={"Lien vers le règlement du jeu"}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <h5>Paramètre d'emails</h5>
                        <Row form>
                            <Col xs={12} xl={4}>
                                <FormGroup>
                                    <Label>Adresse</Label>
                                    <Input type="email" placeholder={"Adresse email de l'expéditeur"}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} xl={4}>
                                <FormGroup>
                                    <Label>Nom</Label>
                                    <Input placeholder={"Nom de l'expéditeur"}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} xl={4}>
                                <FormGroup>
                                    <Label>Objet</Label>
                                    <Input placeholder={"Objets de l'email"}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col xs={12} xl={6}>
                                <FormGroup>
                                    <Label>Template email gagné</Label>
                                    <Input type="textarea" placeholder={"Email adressé pour chaque gagnant."}/>
                                </FormGroup>
                            </Col>
                            <Col xs={12} xl={6}>
                                <FormGroup>
                                    <Label>Template email perdu</Label>
                                    <Input type="textarea" placeholder={"Email adressé pour chaque perdant."}/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CollapsibleTitle>
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

function lzpad (obj, length) {
    var str = obj;
    if (typeof obj !== 'string')
        str = obj.toString();
    while (str.length < length)
        str = '0' + str;
    return str;
}

function FormatAndSplitDate(moment) {
    return [moment.format('YYYY-MM-DD'),
    moment.format('HH:mm:ss')]
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

function arrayToOptions(e, i) {
    return <option value={i}>{e}</option>
}


CampaignForm.propTypes = {campaign: PropTypes.instanceOf(Campaign)};

export default CampaignForm;