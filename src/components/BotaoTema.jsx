import React from 'react';
import './BotaoTema.css';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


const BotaoTema = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="tema-toggle">
      <button onClick={toggleTheme} title="Alternar Tema">
      {theme === 'light' ? <FaMoon />: <FaSun /> }
      </button>
    </div>
  );
};

export default BotaoTema;
