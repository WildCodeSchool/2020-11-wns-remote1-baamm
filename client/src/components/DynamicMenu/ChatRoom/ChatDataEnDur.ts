/* eslint-disable max-len */
import socket from '../../../socket/Socket';

const dataEnDur = [
  {
    messageBody: 'Hello',
    userTalking: socket.id,
  },
  {
    messageBody: 'Hello tout le monde',
    userTalking: 'Gilles',
  },
  {
    messageBody: 'Salut',
    userTalking: 'Superman',
  },
  {
    messageBody: 'Coucou',
    userTalking: 'r2d2',
  },
  {
    messageBody: 'London. Michaelmas term lately over, and the Lord Chancellor sitting in Lincolns Inn Hall. Implacable November weather. As much mud in the streets as if the waters had but newly retired from the face of the earth, and it would not be wonderful to meet a Megalosaurus, forty feet long or so, waddling like an elephantine lizard up Holborn Hill.',
    userTalking: 'Batman',
  },
  {
    messageBody: 'Bien ou bien ?',
    userTalking: socket.id,
  },
  {
    messageBody: 'Bien et toi humain ?',
    userTalking: 'c3pO',
  },
];

export default dataEnDur;
