import React, {Component} from 'react';
import {Button, Col, CustomInput, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
import CollapsibleTitle from "../../components/CollapsibleTitle";
import Information from "../../components/Information";
import {Icon} from '@mdi/react'
import {mdiPlusCircle, mdiContentSave, mdiTreasureChest} from '@mdi/js'
import CampaignForm from "./CampaignForm";

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

class CreateCampaign extends Component {

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
        return (
            <div id="newCampaign" style={{margin: '1em'}}>
                <CampaignForm/>
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

function arrayToOptions(e, i) {
    return <option value={i}>{e}</option>
}


CreateCampaign.propTypes = {};

export default CreateCampaign;