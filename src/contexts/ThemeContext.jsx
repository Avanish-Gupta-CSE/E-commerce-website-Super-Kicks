import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// The ThemeProvider component will be defined in a separate file (ThemeProvider.jsx)
// and will provide the actual value for this context.
export default ThemeContext; // Exporting ThemeContext for use in ThemeProvider
