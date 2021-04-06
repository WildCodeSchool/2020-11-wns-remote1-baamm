import { createContext } from 'react';
import { ChatContextType } from '../types';

// eslint-disable-next-line max-len, no-spaced-func
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export default ChatContext;
