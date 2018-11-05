import moment from "moment";

export const ExperienceTypes = Object.freeze({
    SIMPLE_IMAGE: {
        value: 0,
        name: "Simple Image Matching"
    },
    VOTE: {
        value: 1,
        name: "Vote"
    },
    HUNT: {
        value: 2,
        name: "Treasure hunt"
    }
});

export const InterfaceTypes = Object.freeze({
    FACEBOOK: {
        value: 0,
        name: "Bot Messenger"
    },
    TWITTER: {
        value: 1,
        name: "Twitter"
    },
    EMAIL: {
        value: 2,
        name: "E-Mail"
    }
});

export const GameTypes = Object.freeze({
    "SWEEPSTAKE": {
        value: 0,
        name: "Sweepstake"
    },
    "INSTANTWIN": {
        value: 1,
        name: "Instant win"
    },
    "RACE": {
        value: 2,
        name: "Race"
    }
});

export const getObject = (Enum, val) => {
    for (let[key, type] of Object.entries(Enum)) {
        if (type.value === val) {
            return Enum[key]
        }
    }
    return null;
}

export default class Campaign {
    constructor(id, name, status, author, start, end, idxImage, emailContact, experienceSettings, campaignSettings, gameSettings) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.author = author;
        this.start = start;
        this.end = end;
        this.idxImage = idxImage;
        this.emailContact = emailContact;
        this.experienceSettings = experienceSettings;
        this.interfaceSettings = campaignSettings;
        this.gameSettings = gameSettings;
    }

    name;
    status;
    id;
    author;
    start;
    end;
    idxImage = [];
    emailContact;
    experienceSettings;
    interfaceSettings = [];
    gameSettings;

    get interfacesTypes() {
        return this.interfaceSettings.map(e => e.type);
    }
}

export class Settings {

    constructor(type) {
        this._type = type;
    };

    get typeName() {
        return this.type.name
    };

    get typeValue() {
        return this.type.value
    }

    get type() {
        return this._type;
    }

    _type = null;
}

export class InterfaceSettings extends Settings {
}

export class FacebookSettings extends InterfaceSettings {

    constructor(page, msgFirst, imgMsgFirst, msgFinal, msgAnalysis, msgDefault) {
        super(InterfaceTypes.FACEBOOK);
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
}

export class HuntSettings extends ExperienceSettings {
    constructor(collectCount, templateMatch, templateMatchEnd) {
        super(ExperienceTypes.HUNT);
        this.collectCount = collectCount;
        this.templateMatch = templateMatch;
        this.templateMatchEnd = templateMatchEnd;
    }

    collectCount;
    msgMatch;
    msgMatchEnd;
}

export class GameSettings extends Settings {
    constructor(type, id, description, prizes, rules, addressEmailFrom, nameEmailFrom, objectEmailFrom, templateMsgWon,
                templateMsgLost) {
        super(type);
        this.id = id;
        this.description = description;
        this.prizes = prizes;
        this.rules = rules;
        this.addressEmailFrom = addressEmailFrom;
        this.nameEmailFrom = nameEmailFrom;
        this.objectEmailFrom = objectEmailFrom;
        this.templateMsgWon = templateMsgWon;
        this.templateMsgLost = templateMsgLost;
    }

    id;
    description;
    prizes = [];
    rules;
    addressEmailFrom;
    nameEmailFrom;
    objectEmailFrom;
    templateMsgWon;
    templateMsgLost;
}

export class Prize {

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
        "Live campaign",
        "live",
        "eu-west-1:9632e005-71d0-4c2b-a756-61add1005133",
        new moment("10/1/18 00:00"),
        new moment("10/31/18 23:59"),
        [],
        "thibaut.cens@gmail.com",
        new ExperienceSettings(ExperienceTypes.SIMPLE_IMAGE),
        [new FacebookSettings("https://www.facebook.com",
            "First Message Example",
            null,
            "Final Message Example",
            "Analysis Message Example",
            "Default Message Example")],
        new GameSettings(GameTypes.INSTANTWIN,
            "game_1337",
            'Game description example',
            [new Prize("Prize 1", "Prize description 1", 10.1, "10")],
            "Game rules example",
            "example@game.com",
            'Example Game',
            "Example Mail Object",
            "example message won",
            "Example message lost"))
];