export class User
{
    constructor(private id:number, private alias:string, private firstname:string, private lastname:string, private role:string, private askTalking: any ){
    
        this.id         = id,
        this.alias      = alias,
        this.firstname   = firstname,
        this.lastname  = lastname,
        this.role       = role,
        this.askTalking = askTalking
    }


    get Id(){return this.id}
    get Alias(){return this.alias}
    get Firstname(){return this.firstname}
    get Lastname(){return this.lastname}
    get Role(){return this.role}
    get AskTalking(){return this.askTalking}
    
    set Id(id){ this.id = id}
    set Alias(alias){ this.alias = alias}
    set Firstname(firstname){ this.firstname = firstname}
    set Lastname(lastname){ this.lastname = lastname}
    set Role(role){this.role = role}
    set AskTalking(askTalking){this.askTalking = askTalking}
    
}

const role = {
    STUDENT: 'student',
    TEACHER: 'teacher'
}

export  function createUsers() {
    const anthony  = new User(1, 'Anthony',  'Lucci',         'Anthony', role.STUDENT, new Date());
    const aurelien = new User(2, 'Aurélien', 'Landouer',      'Aurélien', role.STUDENT, new Date());
    const brian    = new User(3, 'Brian',    'Lagaude',       'Brian', role.STUDENT, new Date());
    const mansour  = new User(4, 'Mansour',  'Mahamat-Salle', 'Mansour', role.STUDENT, new Date());
    const mayana   = new User(5, 'Mayana',   'Bastard',       'Mayana', role.STUDENT, new Date());
    const thomas   = new User(6, 'Thomas',   'Culdaut',       'Thomas',  role.TEACHER, new Date());

    return [anthony, aurelien, brian, mansour, mayana, thomas];
}

export const Users = [
    {
        id: 1,
        name: 'Anthony',
        lastName: 'Lucci',
        role: 'Student',
        date: new Date(),
    },
    {
        id: 2,
        name: 'Aurélien',
        lastName: 'Landouer',
        role: 'Student',
        date: new Date(),
    }
]