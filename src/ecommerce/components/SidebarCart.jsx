import { faXmark, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import SidebarProduct from './SidebarProduct'
import { useNavigate } from 'react-router-dom'

export default function SidebarCart({
  setShowSidebarCart,
  showSidebarCart,
  selectedProducts,
  cartTotal,
  removeProductFromCart,
  addToCartTotal,
  darkMode
}) {
  const navigate = useNavigate()

  return (
    <aside
      className={`sidebar-cart ${showSidebarCart ? 'show' : ''} ${
        darkMode ? 'dark' : ''
      }`}
    >
      <div className="top">
        <h3>Seu Carrinho</h3>
        <button onClick={() => setShowSidebarCart(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <div className="sidebar-products-list">
        {selectedProducts?.map(product => (
          // Use _id como key para evitar problemas de renderização
          <SidebarProduct
            key={product._id}
            {...product}
            removeProductFromCart={removeProductFromCart}
            addToCartTotal={addToCartTotal}
          />
        ))}
      </div>

      <div className="total-container">
        <b>Total: </b> R$ {cartTotal.toFixed(2)}
      </div>

      <button className="pay-button" onClick={() => navigate('/loja/checkout')}>
        Pagar Agora <FontAwesomeIcon icon={faMoneyBill} />
      </button>
    </aside>
  )
}
