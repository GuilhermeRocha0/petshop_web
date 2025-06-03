import React from 'react'
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SidebarProduct({
  _id,
  name,
  price,
  quantity,
  imageUrl,
  addProductToCart,
  removeProductFromCart,
  removeAllFromCart
}) {
  const apiUrl = import.meta.env.VITE_API_URL

  return (
    <div className="sidebar-product">
      <img src={`${apiUrl}${imageUrl}`} alt={name} className="product-image" />
      <div className="info">
        <h4>{name}</h4>
        <p>R$ {price.toFixed(2)}</p>
        <p>Quantidade: {quantity}</p>
      </div>
      <div className="actions">
        <button className="action-btn" onClick={() => addProductToCart(_id)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          className="action-btn"
          onClick={() => removeProductFromCart(_id)}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <button className="action-btn" onClick={() => removeAllFromCart(_id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  )
}
