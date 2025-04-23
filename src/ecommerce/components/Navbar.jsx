import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faSearch,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons'

export default function NavBar({ setShowSidebarCart, selectedProducts }) {
  const [show, setShow] = useState(false)

  return (
    <div className="nav">
      <div className="inner-content">
        <h1 className="logo">
          PET<span>da</span>CARLA
        </h1>

        <nav className={`${show ? 'show' : ''}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Produtos</Link>
            </li>
            <li>
              <Link to="/toys">Brinquedos</Link>
            </li>
            <li>
              <Link to="/food">Alimentos</Link>
            </li>
            <li>
              <Link to="/account">Conta</Link>
            </li>
          </ul>
        </nav>

        <div className="navs-icon-container">
          <div className="search-input-container">
            <input type="search" placeholder="Procurar"></input>
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <button
            className="shopping-cart"
            onClick={() => setShowSidebarCart(true)}
          >
            <FontAwesomeIcon icon={faShoppingCart} color="#000" />
            <div className="products-count">{selectedProducts.length}</div>
          </button>
          <button className="menu-button" onClick={() => setShow(!show)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </div>
  )
}
