import React from 'react'

const statusColors = {
  cancelado: '#ef4444',
  pendente: '#fde047',
  'em andamento': '#fde047',
  'a pagar': '#fde047',
  concluído: '#22c55e'
}

const AppointmentCard = ({ ag, onCancel, userRole, onEditStatus }) => {
  const canEditOrCancel = ag.status !== 'cancelado' && ag.status !== 'concluído'

  return (
    <div className="appointment-card">
      <div className="appointment-info">
        <p>
          <strong>Pet:</strong> {ag.pet.name}
        </p>
        <p>
          <strong>Serviços:</strong> {ag.services.map(s => s.name).join(', ')}
        </p>
        <p>
          <strong>Data:</strong> {new Date(ag.scheduledDate).toLocaleString()}
        </p>
        <p>
          <strong>Preço: R$</strong> {ag.totalPrice}
        </p>
        <p>
          <strong>
            Status:{' '}
            <span style={{ color: statusColors[ag.status] || 'black' }}>
              {ag.status}
            </span>
          </strong>
        </p>

        {userRole === 'ADMIN' && ag.userId && (
          <>
            <p>
              <strong>Usuário:</strong> {ag.userId.name}
            </p>
            <p>
              <strong>Email:</strong> {ag.userId.email}
            </p>
          </>
        )}
      </div>

      {canEditOrCancel && (
        <div className="card-buttons">
          {userRole === 'ADMIN' && (
            <button
              onClick={() => onEditStatus(ag._id)}
              className="edit-button"
            >
              Alterar Status
            </button>
          )}

          <button onClick={() => onCancel(ag._id)} className="cancel-button">
            Cancelar
          </button>
        </div>
      )}
    </div>
  )
}

export default AppointmentCard
