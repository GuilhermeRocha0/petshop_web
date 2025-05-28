import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../services/api'

const validStatus = ['cancelado', 'pendente', 'concluído']

const OrderStatusForm = ({ orderId, onClose, fetchOrders }) => {
  const [status, setStatus] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await api.get(`/order-reservation/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setOrder(res.data.reservation)
        setStatus(res.data.reservation.status || '')
      } catch (err) {
        console.error(err)
        toast.error('Erro ao carregar pedido.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!status) {
      toast.error('Selecione um status.')
      return
    }

    try {
      const token = localStorage.getItem('token')
      await api.put(
        `/order-reservation/status/${orderId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      toast.success('Status atualizado com sucesso!')
      fetchOrders()
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar o status.')
    }
  }

  if (loading) {
    return <p>Carregando dados do pedido...</p>
  }

  if (!order) {
    return <p>Pedido não encontrado.</p>
  }

  return (
    <div className="status-form-container">
      <h2>Alterar Status</h2>

      <div className="order-details">
        <p>
          <strong>Cliente:</strong> {order.user?.name || 'N/D'}
        </p>
        <p>
          <strong>Produtos:</strong>{' '}
          {order.items?.map(p => p.name).join(', ') || 'N/D'}
        </p>
        <p>
          <strong>Data do Pedido:</strong>{' '}
          {new Date(order.createdAt).toLocaleString() || 'N/D'}
        </p>
        <p>
          <strong>Total:</strong> R$ {order.totalAmount?.toFixed(2) || 'N/D'}
        </p>
        <p>
          <strong>Status atual:</strong> {order.status || 'N/D'}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="status">Novo Status:</label>
          <select
            id="status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="input-standard"
          >
            <option value="">Selecione</option>
            {validStatus.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="side">
            Atualizar
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default OrderStatusForm
