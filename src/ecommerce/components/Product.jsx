import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { faCartShopping, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

export default function Product({
  id,
  image,
  name,
  rate,
  price,
  addProductToCart
}) {
  const navigate = useNavigate();

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
        <button className="btn-icon" onClick={() => navigate("/loja/checkout")}>
          Pagar Agora <FontAwesomeIcon icon={faMoneyBill}></FontAwesomeIcon>
        </button>
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
