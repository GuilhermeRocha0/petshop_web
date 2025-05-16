import React from 'react'

const ServiceCard = ({ service, onEdit, onDelete }) => {
  return (
    <div className="service-card">
      <div className="service-info">
        <h3 className="service-name">{service.name}</h3>
        <p>
          <strong>Preço:</strong> R$ {service.price.toFixed(2)}
        </p>
        <p>
          <strong>Tempo Estimado:</strong> {service.estimatedTime} minutos
        </p>
      </div>

      <div className="service-actions">
        <button onClick={onEdit} className="edit-button">
          Editar
        </button>
        <button onClick={onDelete} className="delete-button">
          Deletar
        </button>
      </div>
    </div>
  )
}

export default ServiceCard
