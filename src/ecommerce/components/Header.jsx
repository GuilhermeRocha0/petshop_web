import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faChevronRight,
  faSearch,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  return (
    <header className="head">
      <div className="inner-content">
        <div className="left-side">
          <h2>Bem-vindo ao nosso PetShop</h2>
          <p>Venha conhecer nossos produtos</p>
          <Link to="/loja/produtos" className="see-more-button">
            <span>Ver agora</span>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </Link>
        </div>

        <div className="right-side">
          <img src="/images/header.jpg" className="image-header"></img>
        </div>
      </div>
    </header>
  )
}
