function User(id, alias, lastname, firstName, role, askTalking) {
    this.id         = is,
    this.alias      = alias,
    this.lastname   = lastname,
    this.firstName  = firstName,
    this.role       = role,
    this.askTalking = askTalking
};

const role = {
    STUDENT: 'student',
    TEACHER: 'teacher'
}
// let dateTimeNow = new Date();

var anthony  = new User(1, 'Anthony',  'Lucci',         'Anthony', role.STUDENT, null);
var aurelien = new User(2, 'Aurélien', 'Landouer',      'Anthony', role.STUDENT, null);
var brian    = new User(3, 'Brian',    'Lagaude',       'Anthony', role.STUDENT, null);
var mansour  = new User(4, 'Mansour',  'Mahamat-Salle', 'Anthony', role.STUDENT, null);
var mayana   = new User(5, 'Mayana',   'Bastard',       'Anthony', role.STUDENT, null);
var thomas   = new User(6, 'Thomas',   'Culdaut',       'Thomas',  role.TEACHER, null);
