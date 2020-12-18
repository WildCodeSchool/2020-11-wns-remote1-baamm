"use strict";
class UserClass {
    constructor(id, alias, firstname, lastname, role, askTalking) {
        this.id = id;
        this.alias = alias;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.askTalking = askTalking;
        this.id = id,
            this.alias = alias,
            this.firstname = firstname,
            this.lastname = lastname,
            this.role = role,
            this.askTalking = askTalking;
    }
    get Id() { return this.id; }
    get Alias() { return this.alias; }
    get Firstname() { return this.firstname; }
    get Lastname() { return this.lastname; }
    get Role() { return this.role; }
    get AskTalking() { return this.askTalking; }
    set Id(id) { this.id = id; }
    set Alias(alias) { this.alias = alias; }
    set Firstname(firstname) { this.firstname = firstname; }
    set Lastname(lastname) { this.lastname = lastname; }
    set Role(role) { this.role = role; }
    set AskTalking(askTalking) { this.askTalking = askTalking; }
}
//function User(id: number, alias: string, lastname: string, firstName:string, role: string, askTalking: any) {
//    this.id         = id,
//    this.alias      = alias,
//    this.lastname   = lastname,
//    this.firstName  = firstName,
//    this.role       = role,
//    this.askTalking = askTalking
//};
const role = {
    STUDENT: 'student',
    TEACHER: 'teacher'
};
function createUsers() {
    const anthony = new UserClass(1, 'Anthony', 'Lucci', 'Anthony', role.STUDENT, new Date());
    const aurelien = new UserClass(2, 'Aurélien', 'Landouer', 'Aurélien', role.STUDENT, new Date());
    const brian = new UserClass(3, 'Brian', 'Lagaude', 'Brian', role.STUDENT, new Date());
    const mansour = new UserClass(4, 'Mansour', 'Mahamat-Salle', 'Mansour', role.STUDENT, new Date());
    const mayana = new UserClass(5, 'Mayana', 'Bastard', 'Mayana', role.STUDENT, new Date());
    const thomas = new UserClass(6, 'Thomas', 'Culdaut', 'Thomas', role.TEACHER, new Date());
    return [anthony, aurelien, brian, mansour, mayana, thomas];
}
// class UserBis {
//     constructor(private id:number) {
//     }
//     getId(){
//         return this.id
//     }
// }
//const lambda = new UserBis(8)
//console.log(lambda.getId)
module.exports = createUsers, UserClass;
//# sourceMappingURL=users.js.map