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
  addProductToCart,
  removeAllFromCart,
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
          <SidebarProduct
            key={product._id}
            {...product}
            addProductToCart={addProductToCart}
            removeProductFromCart={removeProductFromCart}
            removeAllFromCart={removeAllFromCart}
          />
        ))}
      </div>

      <div className="total-container">
        <b>Total: </b> R$ {cartTotal.toFixed(2)}
      </div>

      <button
        className="pay-button"
        onClick={() => navigate('/loja/confirmar-pedido')}
      >
        Reservar Agora <FontAwesomeIcon icon={faMoneyBill} />
      </button>
    </aside>
  )
}
