import React from 'react'

const AppointmentCard = ({ ag, onCancel, userRole }) => (
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
        <strong>Tempo estimado:</strong> {ag.totalEstimatedTime}
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
      <button onClick={() => onCancel(ag._id)} className="cancel-button">
        Cancelar Agendamento
      </button>
    )}
  </div>
)

export default AppointmentCard
