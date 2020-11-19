//import './users';

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

//   let a = new Date().setMinutes(5);
//   let b = new Date().setMinutes(15);
//   let aa = new Date().setMilliseconds(1)
// new Date('2020-11-19 15:50:00')

function createAskTalkings() {
    let notif1  = new AskTalking(1, 'anthony',  interventionType.QUESTION,     new Date('2020-11-19 15:58:00'));
    let notif2  = new AskTalking(2,' aurelien', interventionType.INFORMATION, new Date('2020-11-19 15:53:00'));
    let notif3  = new AskTalking(3, 'brian',    interventionType.QUESTION,     new Date('2020-11-19 15:48:00'));

    return [notif1, notif2, notif3];
}
module.exports = createAskTalkings;
