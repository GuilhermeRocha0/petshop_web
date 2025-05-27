import React, { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import LoadingModal from '../../components/LoadingModal'

export default function ConfirmOrder({
  selectedProducts,
  cartTotal,
  darkMode
}) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [orderConfirmed, setOrderConfirmed] = useState(false) // ✅ novo estado

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

      setMessage(res.data.msg)
      setOrderConfirmed(true) // ✅ ativa exibição das informações
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
            {selectedProducts.map(product => (
              <li key={product._id}>
                {product.name} - R$ {product.price} x {product.quantity}
              </li>
            ))}
          </ul>

          <p className="total">
            <strong>Total: </strong>R$ {cartTotal.toFixed(2)}
          </p>

          <div className="confirmation-buttons">
            <button onClick={() => navigate('/loja')}>
              Continuar Navegando
            </button>
            <button onClick={() => navigate('/meus-pedidos')}>
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
