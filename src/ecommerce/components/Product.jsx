import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { faCartShopping, faMoneyBill } from '@fortawesome/free-solid-svg-icons'

export default function Product({
  id,
  image,
  name,
  rate,
  price,
  addProductToCart
}) {
  return (
    <div className="product">
      <div className="product-info">
        <img src={image} alt={name}></img>
        <p className="name">{name}</p>
        <p className="rate"> &#9733;&#9733;&#9733;&#9733;&#9733;</p>
        <p className="price">
          <span>R$</span> {price}
        </p>
      </div>

      <div className="buttons">
        <Link className="btn-icon" to="/products/123/checkout">
          <span>Comprar Agora </span>
          <FontAwesomeIcon icon={faMoneyBill} />
        </Link>
        <button
          onClick={() => addProductToCart(id)}
          className="btn-icon add-to-cart-btn"
        >
          <span>Adicionar ao Carrinho </span>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </div>
  )
}
