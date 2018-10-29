import moment from "moment";

export default class Campaign {


    constructor(id, author, start, end, idxImage, emailContact, experienceSettings, campaignSettings, gameSettings) {
        this.id = id;
        this.author = author;
        this.start = start;
        this.end = end;
        this.idxImage = idxImage;
        this.emailContact = emailContact;
        this.experienceSettings = experienceSettings;
        this.campaignSettings = campaignSettings;
        this.gameSettings = gameSettings;
    }

    id;
    author;
    start;
    end;
    idxImage = [];
    emailContact;
    experienceSettings;
    campaignSettings;
    gameSettings;
}

export class Settings {

    constructor(type) {
        this.type = type;
    };

    get verboseType() {
        return this.verboseTypes[this.type]
    };

    type = null;
    static verboseTypes = ['1', '2', '3'];
}

export class CampaignSettings extends Settings {
    static verboseTypes = ["Informatif", "Chasse / Parcour", "Vote"];
}
export class FacebookSettings extends CampaignSettings {

        constructor(page, msgFirst, imgMsgFirst, msgFinal, msgAnalysis, msgDefault) {
            super(0);
            this.page = page;
            this.msgFirst = msgFirst;
            this.imgMsgFirst = imgMsgFirst;
            this.msgFinal = msgFinal;
            this.msgAnalysis = msgAnalysis;
            this.msgDefault = msgDefault;
        }

        page;
        msgFirst;
        imgMsgFirst;
        msgFinal;
        msgAnalysis;
        msgDefault;
    }

export class ExperienceSettings extends Settings {

    static verboseTypes = ["Informatif", "Chasse / Parcour", "Vote"];

}
export class HuntSettings extends ExperienceSettings {

        constructor(collectCount, templateMatch, templateMatchEnd) {
            super(2);
            this.collectCount = collectCount;
            this.templateMatch = templateMatch;
            this.templateMatchEnd = templateMatchEnd;
        }

        collectCount;
        templateMatch;
        templateMatchEnd;
    }

export class GameSettings extends Settings {

    static verboseTypes = ["Concours", "Tirage au sort", "Instants gagnants"];

    constructor(type, id, description, lots, rules, addressEmailFrom, nameEmailFrom, objectEmailFrom, templateMsgWon,
                templateMsgLost) {
        super(type);
        this.id = id;
        this.description = description;
        this.lots = lots;
        this.rules = rules;
        this.addressEmailFrom = addressEmailFrom;
        this.nameEmailFrom = nameEmailFrom;
        this.objectEmailFrom = objectEmailFrom;
        this.templateMsgWon = templateMsgWon;
        this.templateMsgLost = templateMsgLost;
    }

    id;
    description;
    lots = [];
    rules;
    addressEmailFrom;
    nameEmailFrom;
    objectEmailFrom;
    templateMsgWon;
    templateMsgLost;
}

export class Lot {

    constructor(name, description, price, quantity) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }

    name;
    description;
    price;
    quantity;
}

export var CampaignStartList = [
    new Campaign(1,
        "eu-west-1:9632e005-71d0-4c2b-a756-61add1005133",
        new moment("10/1/18 00:00"),
        new moment("10/31/18 23:59"),
        [],
        "thibaut.cens@gmail.com",
        new ExperienceSettings(1),
        new FacebookSettings("https://www.facebook.com",
            "First Message Example",
            null,
            "Final Message Example",
            "Analysis Message Example",
            "Default Message Example"),
        new GameSettings(1,
            1,
            'Game description example',
            [new Lot("Lot 1", "Lot description 1", 10.1, "10")],
            "Game rules example",
            "example@game.com",
            'Example Game',
            "Example Mail Object",
            "example message won",
            "Example message lost"))
];