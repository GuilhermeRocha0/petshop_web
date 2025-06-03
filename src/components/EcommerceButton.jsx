import React from 'react';
import './BotaoTema.css';
import {  FaHome } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { MdOutlineStorefront } from "react-icons/md";

const EcommerceButton = () => {
  return (
    <div  className="ecomerceButton">
      <Link to="/loja">
      <button title="Ir para o Ecommerce">
        {< MdOutlineStorefront/>}
      </button>
      </Link>

    </div>
  );
};

export default EcommerceButton;
