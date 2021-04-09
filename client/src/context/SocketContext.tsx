import { createContext } from 'react';
import { SocketContextType } from '../types';

// eslint-disable-next-line max-len, no-spaced-func
const SocketContext = createContext<SocketContextType>(undefined!);

export default SocketContext;
