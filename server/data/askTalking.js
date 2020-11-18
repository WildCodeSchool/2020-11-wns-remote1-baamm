import './users';

function AskTalking(id, user, interventionType, askingDate) {
    this.id = id,
    this.user = user,
    this.interventionType = interventionType,
    this.askingDate  = askingDate
};

const interventionType = {
    QUESTION: 'question',
    INFORMATION: 'information'
};

let notif1  = new AskTalking(1, anthony,  interventionType.QUESTION,     new DateTime());
let notif2  = new AskTalking(2, aurelien, interventionType.INFORMATION,  new DateTime());
let notif3  = new AskTalking(3, brian,    interventionType.QUESTION,     new DateTime());

module.exports = AskTalking;

