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

// let dateTimeNow = new Date(hours, minutes, seconds);

//Date Fixtures:
// let dateTime1 = new Date("November 18, 2020 10:50:00");
// let dateTime2 = new Date("November 18 , 2020 11:55:00");

//Get minutes/secondes
//let getMinutes = dateTimeNow.getMinutes();
//let getSecondes = dateTimeNow.getSeconds();
//let getTime = getMinutes + getSecondes;


let notif1  = new AskTalking(1, anthony,  interventionType.QUESTION,     new DateTime());
let notif2  = new AskTalking(2, aurelien, interventionType.INFORMATION,  new DateTime());
let notif3  = new AskTalking(3, brian,    interventionType.QUESTION,     new DateTime());

module.exports = AskTalking;

