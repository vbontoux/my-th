import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, FormGroup, Label, Input, Button} from "reactstrap";
import Information from "../../components/Information";
import {Icon} from '@mdi/react'
import {mdiPlusCircle} from '@mdi/js'

import CollapsibleTitle from "../../components/CollapsibleTitle";
import {arrayToOptions} from "./CampaignForm";
import {GameSettings} from "../../Campaign";
import PrizesFields from "./PrizesFields";

const gameType = ["Concours", "Tirage au sort", "Instants gagnants"];
const gameInformations = [
    "bien préciser l'ordre de distribution des lots aux vainqueurs.",
    "parmi les emails participants, un tirage au sort est aléatoirement effectué automatiquement dans la minute suivant la fin de la campagne. L'email de victoire est automatiquement adressé aux gagnants.",
    "pas de limite de participation perdante par défaut. Possibilité de paramétrer un délai fixe entre 2 participations."
];

class GameFields extends Component {

    constructor(props) {
        super(props);

        const s = this.props.settings;
        this.state = {
            selectGameType: {
                value: (s) ? s.type : 0,
                choices: gameType,
                helps: gameInformations
            }
        }
    }

    handleChangeGameType = (e) => {
        const selectGameType = this.state.selectGameType;
        selectGameType.value = e.target.value;
        this.setState({
            selectGameType
        });
    };

    render() {
        var s = this.props.settings;
        return (
            <CollapsibleTitle title={<h4>Paramètres de jeu Click&Gain</h4>}>
                <Row form>
                    <Col xs={12} xl={6}>
                        <FormGroup>
                            <Label for="type-select">Type de jeu</Label>
                            <Input type="select" onChange={this.handleChangeGameType}
                                   defaultValue={(s) ? s.type : null}>
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
                                   placeholder={"Description du jeu Click&Gain"}
                                   defaultValue={(s) ? s.description : null}/>
                        </FormGroup>
                    </Col>
                </Row>
                {/*TODO: Recover prizes list*/}
                <Row form>
                    <Col xs={12} xl={6}>
                            <PrizesFields prizes={(s) ? s.prizes : null}/>
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
                            <Input type="email" placeholder={"Adresse email de l'expéditeur"}
                                   defaultValue={(s) ? s.addressEmailFrom : null}/>
                        </FormGroup>
                    </Col>
                    <Col xs={12} xl={4}>
                        <FormGroup>
                            <Label>Nom</Label>
                            <Input placeholder={"Nom de l'expéditeur"}
                                   defaultValue={(s) ? s.nameEmailFrom : null}/>
                        </FormGroup>
                    </Col>
                    <Col xs={12} xl={4}>
                        <FormGroup>
                            <Label>Objet</Label>
                            <Input placeholder={"Objets de l'email"}
                                   defaultValue={(s) ? s.objectEmailFrom : null}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col xs={12} xl={6}>
                        <FormGroup>
                            <Label>Template email gagné</Label>
                            <Input type="textarea" placeholder={"Email adressé pour chaque gagnant."}
                                   defaultValue={(s) ? s.templateMsgWon : null}/>
                        </FormGroup>
                    </Col>
                    <Col xs={12} xl={6}>
                        <FormGroup>
                            <Label>Template email perdu</Label>
                            <Input type="textarea" placeholder={"Email adressé pour chaque perdant."}
                                   defaultValue={(s) ? s.templateMsgLost : null}/>
                        </FormGroup>
                    </Col>
                </Row>
            </CollapsibleTitle>
        );
    }
}

GameFields.propTypes = {
    settings: PropTypes.instanceOf(GameSettings)
};

export default GameFields;