import React, { useContext } from 'react'
import './BotaoTema.css'
import { FaSun, FaMoon } from 'react-icons/fa'
import { ThemeContext } from '../contexts/ThemeContext'

const BotaoTema = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className="tema-toggle">
      <button onClick={toggleTheme} title="Alternar Tema">
        {theme === 'dark' ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  )
}

export default BotaoTema
