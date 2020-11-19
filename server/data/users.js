function User(id, alias, lastname, firstName, role, askTalking) {
    this.id         = id,
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

var anthony  = new User(1, 'Anthony',  'Lucci',         'Anthony', role.STUDENT, new Date());
var aurelien = new User(2, 'Aurélien', 'Landouer',      'Aurélien', role.STUDENT, new Date());
var brian    = new User(3, 'Brian',    'Lagaude',       'Brian', role.STUDENT, new Date());
var mansour  = new User(4, 'Mansour',  'Mahamat-Salle', 'Mansour', role.STUDENT, new Date());
var mayana   = new User(5, 'Mayana',   'Bastard',       'Mayana', role.STUDENT, new Date());
var thomas   = new User(6, 'Thomas',   'Culdaut',       'Thomas',  role.TEACHER, new Date());

function createUsers() {
    return [anthony, aurelien, brian, mansour, mayana, thomas];
}

module.exports = createUsers;
