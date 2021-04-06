export type AskingTalk = {
  id: number;
  user: User;
  interventionType: string;
  askingDate: Date;
};

export type User = {
  id: number;
  alias: string;
  lastName: string;
  firstName: string;
  role: string;
  askTalking: AskingTalk | null;
};

export type Message = {
  senderId: string;
  body: string;
  ownedByCurrentUser: boolean;
};

export type ChatContextType = {
  messages: Message[];
  sendMessage: (messageBody: string) => void;
};
