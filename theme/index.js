import React, { createContext, useContext, useState, useMemo } from 'react';
import { useColorScheme } from "react-native";

import { COLORS as LIGHT_COLORS } from "./lightColors";
import { DARK_COLORS } from "./darkColors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState(systemScheme || 'light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const COLORS = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;

  const value = useMemo(() => ({ theme, toggleTheme, COLORS }), [theme, COLORS]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export * from "./spacing";
export * from "./typography";