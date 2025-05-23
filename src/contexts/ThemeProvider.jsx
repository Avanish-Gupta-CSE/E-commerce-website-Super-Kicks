import React, { useState, useEffect } from 'react';
import ThemeContext from './ThemeContext'; // Default import

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const localTheme = localStorage.getItem('theme');
        if (localTheme) {
            return localTheme;
        }
        // Ensure window.matchMedia is available (it might not be in some SSR environments)
        if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
