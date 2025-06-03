import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faSearch,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons'

export default function NavBar({ setShowSidebarCart, selectedProducts, darkMode, setDarkMode, searchTerm, setSearchTerm, ...props }) {
  const [show, setShow] = useState(false)

  return (
    <div className="nav">
      <div className="inner-content">
        <h1 className="logo" title='Pagina Principal'>
          <Link to="/">PET<span>da</span>CARLA</Link>
        </h1>

        <nav className={`${show ? 'show' : ''}`}>
          <ul>
            <li>
              <Link to="/loja" title='Home do Ecomerce'>Home</Link>
            </li>
            <li>
              <Link to="/loja/produtos" title='Produtos'>Produtos</Link>
            </li>
            <li>

              <Link to="/loja/brinquedos">Brinquedos</Link>
            </li>
            <li>
              <Link to="/loja/alimentos">Alimentos</Link>
            </li>
            <li>
              <Link to="/login">Conta</Link>
            </li>
            <li><button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️" : "🌙"}
            </button></li>

          </ul>
        </nav>

        <div className="navs-icon-container">
          <div className="search-input-container">

            <input
              className={`search-input ${darkMode ? 'dark' : ''}`}
              type="search"
              placeholder="Procurar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <FontAwesomeIcon icon={faSearch} />
          </div>
          <button
            className="shopping-cart"
            title='Carrinho'
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
