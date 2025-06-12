import React, { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import LoadingModal from '../../components/LoadingModal'

export default function ConfirmOrder({
  clearCartAndRefreshProducts,
  selectedProducts,
  cartTotal,
  darkMode
}) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [confirmedProducts, setConfirmedProducts] = useState([])
  const [confirmedTotal, setConfirmedTotal] = useState(0)

  const handleReserveProducts = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      const token = localStorage.getItem('token')

      if (!token) {
        setMessage('Usuário não autenticado.')
        setIsLoading(false)
        return
      }

      const items = selectedProducts.map(product => ({
        productId: product._id,
        quantity: product.quantity
      }))

      const res = await api.post(
        '/order-reservation',
        { items },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setConfirmedProducts([...selectedProducts])
      setConfirmedTotal(cartTotal)

      setMessage(res.data.msg)
      setOrderConfirmed(true)

      await clearCartAndRefreshProducts()
    } catch (error) {
      console.error('Erro ao reservar produtos:', error)
      setMessage(
        error.response?.data?.msg ||
        'Erro ao reservar produtos. Tente novamente.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`checkout-container ${darkMode ? 'dark' : ''}`}>
      <h1>Confirmar Reserva</h1>

      {orderConfirmed ? (
        <div className="order-confirmation">
          <p>{message}</p>

          <h2>Resumo do Pedido:</h2>
          <ul>
            {confirmedProducts.map(product => (
              <li key={product._id}>
                {product.name} - R$ {product.price} x {product.quantity}
              </li>
            ))}
          </ul>

          <p className="total">
            <strong>Total: </strong>R$ {confirmedTotal.toFixed(2)}
          </p>

          <div className='div-conf-button'>
            <button className="confirmation-buttons-1" onClick={() => navigate('/loja')}>
              Continuar Navegando
            </button>
            <button className="confirmation-buttons-2" onClick={() => navigate('/pedidos')}>
              Meus Pedidos
            </button>
          </div>
        </div>
      ) : (
        <div className="products-summary">
          {selectedProducts.length === 0 ? (
            <p>Nenhum produto selecionado.</p>
          ) : (
            <ul>
              {selectedProducts.map(product => (
                <li key={product._id}>
                  {product.name} - R$ {product.price} x {product.quantity}
                </li>
              ))}
            </ul>
          )}

          <p className="total">
            <strong>Total: </strong>R$ {cartTotal.toFixed(2)}
          </p>

          <button
            className="pay-button"
            onClick={handleReserveProducts}
            disabled={isLoading || selectedProducts.length === 0}
          >
            {isLoading ? 'Reservando...' : 'Reservar Produtos'}
          </button>

          <p>
            Após reservar, lembre-se que você tem até 7 dias para finalizar e
            retirar o pedido na loja.
          </p>

          {message && <p className="message">{message}</p>}

          <LoadingModal isOpen={isLoading} />
        </div>
      )}
    </div>
  )
}
