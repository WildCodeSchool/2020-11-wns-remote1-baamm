import { response } from "express";
import { Users } from "./users";


export class  AskTalking 
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

enum interventionType  {
    QUESTION = 'question',
    INFORMATION = 'information'
};

const askingDate = {
    DateDeDemandeExemple1: new Date('2020-12-18 11:30'),
    DateDeDemandeExemple2: new Date('2020-12-18 11:45'),
    getRealDate: 'TODO moment.js'
};

export function createAskTalkings() {
    const allNotifs: any[] = [];
    Users.map(user => {
        const notif = {
            id: user.id,
            user: user,
            interventionType : interventionType.INFORMATION,
            askingDate: new Date(),
        };
        allNotifs.push(notif);

    });
    // console.log("ALLNOTIFS DE SES MORTS  :::", allNotifs);
    return allNotifs;
}

