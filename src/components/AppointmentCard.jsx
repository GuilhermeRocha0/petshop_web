import React from 'react'

const AppointmentCard = ({ ag, onCancel, userRole, onEditStatus }) => {
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
          <strong>Status:</strong> {ag.status}
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

      {ag.status !== 'cancelado' && (
        <div className="card-buttons">
          {userRole === 'ADMIN' && (
            <button
              onClick={() => onEditStatus(ag._id)}
              className="edit-button"
            >
              Editar Status
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
