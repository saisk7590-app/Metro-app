import React from 'react';
import AMSUpdateScreen from "./screens/AMS";
import { ThemeProvider } from './theme';

export default function App() {
  return (
    <ThemeProvider>
      <AMSUpdateScreen />
    </ThemeProvider>
  );
}
