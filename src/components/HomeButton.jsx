import React from 'react';
import './BotaoTema.css';
import {  FaHome } from 'react-icons/fa';
import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <div  className="homeButton">
      <button  title="Alternar Tema">
        {< FaHome/>}
      </button>
    </div>
  );
};

export default HomeButton;
