import { response } from "express";

class  AskTalking 
{    
    constructor(private idAsktalking:number, private userAsktalking:string,  private interventionType: any){
            this.idAsktalking = idAsktalking;
            this.userAsktalking = userAsktalking;
            this.interventionType = interventionType;
    }

    get IdAsktalking(){return this.idAsktalking}
    get UserAsktalking(){return this.userAsktalking}
    get InterventionType(){return this.interventionType}
    
    set IdAsktalking(idAsktalking){ this.idAsktalking = idAsktalking}
    set UserAsktalking(userAsktalking){ this.userAsktalking = userAsktalking}
    set InterventionType(interventionType){ this.interventionType = interventionType}
}


interface User {
    id: number, 
    alias: string, 
    lastname: string, 
    firstName: string, 
    role: object
 }

interface role  {
    STUDENT: 'string',
    TEACHER: 'teacher'
}

const anthony =   new UserClass(1, 'Anthony', 'Lucci', 'Anthony', role.STUDENT, new Date());
const aurelien =  new UserClass(2, 'Aurélien', 'Landouer', 'Aurélien', role.STUDENT, new Date());
const brian =  new UserClass(3, 'Brian', 'Lagaude', 'Brian', role.STUDENT, new Date());
const mansour =  new UserClass(4, 'Mansour', 'Mahamat-Salle', 'Mansour', role.STUDENT, new Date());
const mayana =  new UserClass(5, 'Mayana', 'Bastard', 'Mayana', role.STUDENT, new Date());
const thomas =  new UserClass(6, 'Thomas', 'Culdaut', 'Thomas', role.TEACHER, new Date());


const interventionType = {
    QUESTION: 'question',
    INFORMATION: 'information'
};

const askingDate = {
    DateDeDemandeExemple1: new Date('2020-12-18 11:30'),
    DateDeDemandeExemple2: new Date('2020-12-18 11:45'),
    getRealDate: 'TODO'
};


export default function createAskTalkings() {

    let notif1 =  {
        id: 1,
        user: aurelien,
        interventionType : interventionType.INFORMATION,
        askingDate: askingDate.DateDeDemandeExemple1
    }
    let notif2 = {
            id: 2,
            user: brian,
            interventionType: interventionType.QUESTION,
            askingDate: askingDate.DateDeDemandeExemple2
    };
    
    return [notif1, notif2];
}


module.exports = createAskTalkings();
module.exports = AskTalking;
