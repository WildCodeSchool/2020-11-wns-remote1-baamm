import { Socket, Server } from 'socket.io';
import { AskTalkings } from '../data/askTalking';

const NEW_CHAT_MESSAGE_EVENT: string = "newChatMessage";
let askingTalkArray = AskTalkings;

const askSockets = (socket: Socket, io: Server) => {
  io.emit("FromAPI", askingTalkArray);

  //   // * PARTIE ASKINGTALK
  //   // TODO typer correctement le askingtalk
  //   // * quand on reçoit une demande de parole envoyé du client
  //   // * on l'ajoute à la liste des demandes de parole existante
  //   // * et on renvoie cette liste avec 'askingtalk from server'
  //   // askingtalk => raiseHand
  //   socket.on('askingtalk from client', (askingtalk: any) => {
  //     askingTalkArray.push(askingtalk);
  //     clients.forEach(client => {
  //       client.emit('askingtalk from server', askingTalkArray);
  //     });
  //   });
  //   // * quand on reçoit une annulation de demande de parole envoyée du cient
  //   // * on renvoie le tableau des demandes de prises de paroles en supprimant la demande concernée
  //   socket.on('cancel askingtalk', (askingtalkid: Number) => {
  //     askingTalkArray = askingTalkArray.filter((askingtalk: any) => {
  //       return askingtalk.id !== askingtalkid;
  //     });
  //     clients.forEach(client => {
  //       client.emit('askingtalk deleted', askingTalkArray);
  //     });
  //     // TODO : récupérer l'askingtalk et la supprimer
  //   })
  //   // * FIN PARTIE ASKINGTALK
}

export default askSockets;