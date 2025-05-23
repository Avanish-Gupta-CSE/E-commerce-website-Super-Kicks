import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-lg hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <BsFillMoonFill className="text-gray-900" /> : <BsFillSunFill className="text-yellow-500" />}
    </button>
  );
};

export default ThemeToggleButton;
