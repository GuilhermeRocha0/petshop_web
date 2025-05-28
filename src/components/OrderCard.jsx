import React from 'react'

const statusColors = {
  cancelado: '#ef4444',
  pendente: '#fde047',
  concluído: '#22c55e'
}

const OrderCard = ({
  order,
  onCancel,
  userRole,
  onEditStatus,
  currentUserId
}) => {
  const canEditOrCancel =
    order.status !== 'cancelado' && order.status !== 'concluído'
  const isOrderOwner = order.userId?._id === currentUserId

  return (
    <div className="appointment-card">
      <div className="appointment-info">
        <p>
          <strong>Data do Pedido:</strong>{' '}
          {new Date(order.createdAt).toLocaleString()}
        </p>

        <p>
          <strong>Válido até:</strong>{' '}
          {new Date(order.validUntil).toLocaleDateString()}
        </p>

        <p>
          <strong>Produtos:</strong>
        </p>
        <ul>
          {order.items.map(item => (
            <li key={item.productId}>
              {item.name} - R$ {item.price} x {item.quantity}
            </li>
          ))}
        </ul>

        <p>
          <strong>Total:</strong> R$ {order.totalAmount.toFixed(2)}
        </p>

        <p>
          <strong>
            Status:{' '}
            <span style={{ color: statusColors[order.status] || 'black' }}>
              {order.status}
            </span>
          </strong>
        </p>

        {userRole === 'ADMIN' && (
          <>
            <p>
              <strong>Usuário:</strong> {order.user.name}
            </p>
            <p>
              <strong>Email:</strong> {order.user.email}
            </p>
            <p>
              <strong>CPF:</strong> {order.user.cpf}
            </p>
          </>
        )}
      </div>

      {canEditOrCancel && (
        <div className="card-buttons">
          {userRole === 'ADMIN' && (
            <button
              onClick={() => onEditStatus(order._id)}
              className="edit-button"
            >
              Alterar Status
            </button>
          )}

          {isOrderOwner && userRole !== 'ADMIN' && (
            <button
              onClick={() => onCancel(order._id)}
              className="cancel-button"
            >
              Cancelar
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default OrderCard
