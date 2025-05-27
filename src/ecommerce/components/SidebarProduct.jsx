import React, { useState } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SidebarProduct({
  _id,
  imageUrl, // Corrigido para imageUrl, que vem do backend
  name,
  price,
  removeProductFromCart,
  addToCartTotal
}) {
  const [quantity, setQuantity] = useState(1)
  const [priceSum, setPriceSum] = useState(price)
  const apiUrl = import.meta.env.VITE_API_URL

  const handleQuantityChange = e => {
    const newQuantity = Number(e.target.value)
    if (newQuantity < 1) return
    const newPriceSum = newQuantity * price
    addToCartTotal(newPriceSum - priceSum)
    setQuantity(newQuantity)
    setPriceSum(newPriceSum)
  }

  return (
    <div className="sidebar-product">
      <div className="left-side">
        <button
          className="remove-product-btn"
          onClick={() => {
            removeProductFromCart(_id)
            addToCartTotal(-priceSum)
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div className="details">
          <h4>{name}</h4>
          <p>R$ {price.toFixed(2)}</p>
          <input
            type="number"
            min={1}
            max={100}
            value={quantity}
            onChange={handleQuantityChange}
          />
          {priceSum > price && (
            <p className="price-sum">
              <b>Soma: R$</b> {priceSum.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <div className="right-side">
        <img src={`${apiUrl}${imageUrl}`} alt={name} />
      </div>
    </div>
  )
}
