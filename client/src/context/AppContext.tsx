import React from 'react';

export type ThemeContextType = {
  roomID: string | undefined;
  setRoomID: (value: string) => void;
};

export const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode
};
export const ThemeProvider = ({
  children,
}: Props) => {
  const [roomID, setRoomID] = React.useState('');

  return (
    <ThemeContext.Provider value={{ roomID, setRoomID }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => React.useContext(ThemeContext);
