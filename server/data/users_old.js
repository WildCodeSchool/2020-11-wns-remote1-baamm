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

function createUsers() {
    const anthony  = new User(1, 'Anthony',  'Lucci',         'Anthony', role.STUDENT, new Date());
    const aurelien = new User(2, 'Aurélien', 'Landouer',      'Aurélien', role.STUDENT, new Date());
    const brian    = new User(3, 'Brian',    'Lagaude',       'Brian', role.STUDENT, new Date());
    const mansour  = new User(4, 'Mansour',  'Mahamat-Salle', 'Mansour', role.STUDENT, new Date());
    const mayana   = new User(5, 'Mayana',   'Bastard',       'Mayana', role.STUDENT, new Date());
    const thomas   = new User(6, 'Thomas',   'Culdaut',       'Thomas',  role.TEACHER, new Date());

    return [anthony, aurelien, brian, mansour, mayana, thomas];
}


 module.exports = createUsers;
