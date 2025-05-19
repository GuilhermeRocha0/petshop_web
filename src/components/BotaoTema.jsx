import React from 'react';
import './BotaoTema.css';
import { FaSun, FaMoon } from 'react-icons/fa';

const BotaoTema = ({ temaEscuro, alternarTema }) => {
  return (
    <div className="tema-toggle">
      <button onClick={alternarTema} title="Alternar Tema">
        {temaEscuro ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};

export default BotaoTema;
