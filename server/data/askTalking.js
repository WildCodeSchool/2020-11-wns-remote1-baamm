function User(id, alias, lastname, firstName, role, askTalking) {
    this.id = id,
        this.alias = alias,
        this.lastname = lastname,
        this.firstName = firstName,
        this.role = role};

const role = {
    STUDENT: 'student',
    TEACHER: 'teacher'
}

const anthony = new User(1, 'Anthony', 'Lucci', 'Anthony', role.STUDENT);
const aurelien = new User(2, 'Aurélien', 'Landouer', 'Aurélien', role.STUDENT);
const brian = new User(3, 'Brian', 'Lagaude', 'Brian', role.STUDENT);
const mansour = new User(4, 'Mansour', 'Mahamat-Salle', 'Mansour');
const mayana = new User(5, 'Mayana', 'Bastard', 'Mayana', role.STUDENT);
const thomas = new User(6, 'Thomas', 'Culdaut', 'Thomas', role.TEACHER);




function AskTalking(id, user, interventionType, askingDate) {
    this.id = id,
        this.user = user,
        this.interventionType = interventionType,
        this.askingDate = askingDate
};

const interventionType = {
    QUESTION: 'question',
    INFORMATION: 'information'
};



function CreateAskTalkings() {

    let notif1 = new AskTalking(1, anthony, interventionType.QUESTION, new Date());
    let notif2 = new AskTalking(2, aurelien, interventionType.INFORMATION, new Date());
    let notif3 = new AskTalking(3, brian, interventionType.QUESTION, new Date());

    return [notif1, notif2, notif3];
}



module.exports = CreateAskTalkings;

