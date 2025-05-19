import { faXmark, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import SidebarProduct from './SidebarProduct'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export default function SidebarCart({
  setShowSidebarCart,
  showSidebarCart,
  selectedProducts,
  cartTotal,
  removeProductFromCart,
  addToCartTotal
}) {

  const navigate = useNavigate();

  return (
    <aside className={`sidebar-cart ${showSidebarCart && 'show'}`}>
      <div className="top">
        <h3>Seu Carrinho</h3>
        <button onClick={() => setShowSidebarCart(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <div className="sidebar-products-list">
        {selectedProducts?.map(product => (
          <SidebarProduct
            key={product.id}
            {...product}
            removeProductFromCart={removeProductFromCart}
            addToCartTotal={addToCartTotal}
          ></SidebarProduct>
        ))}
      </div>

      <div className="total-container">
        <b>Total: </b> {cartTotal}
      </div>

       <button className="pay-button" onClick={() => navigate("/loja/checkout")}>
                Pagar Agora <FontAwesomeIcon icon={faMoneyBill}></FontAwesomeIcon>
            </button>

      {/* <i>Seu carrinho está vazio</i> */}
    </aside>
  )
}
