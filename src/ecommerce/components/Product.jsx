import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faCartShopping, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export default function Product({
  _id,
  imageUrl,
  name,
  price,
  quantity,
  addProductToCart,
  addToCartTotal
}) {
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL

  return (
    <div className="product">
      <div className="product-info">
        <img
          src={`${apiUrl}${imageUrl}`}
          alt={name}
          onClick={() => navigate(`/loja/produto/${_id}`)}
          style={{ cursor: 'pointer' }}
        />

        <p className="name" onClick={() => navigate(`/produto/${_id}`)} style={{ cursor: 'pointer' }}>
          {name}
        </p>
        <p className="rate"> &#9733;&#9733;&#9733;&#9733;&#9733;</p>
        <p className="price">
          <span>R$</span> {price}
        </p>
      </div>
      <div className="buttons">
        {quantity > 0 ? (
          <>
            <button
              className="btn-icon"
              onClick={() => {
                addToCartTotal(price)
                addProductToCart(_id)
                navigate('/loja/confirmar-pedido')
              }}
            >
              Reservar Agora <FontAwesomeIcon icon={faMoneyBill} />
            </button>
            <button
              onClick={() => addProductToCart(_id)}
              className="btn-icon add-to-cart-btn"
            >
              <span>Adicionar ao Carrinho </span>
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
          </>
        ) : (
          <p className="out-of-stock">Fora de Estoque</p>
        )}
      </div>
    </div>
  )
}
