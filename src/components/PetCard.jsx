import React from 'react'

const PetCard = ({ pet, onEdit, onDelete }) => {
  return (
    <div className="pet-card">
      <div className="pet-info">
        <h3 className="pet-name">{pet.name}</h3>
        <p>
          <strong>Tamanho:</strong> {pet.size}
        </p>
        <p>
          <strong>Raça:</strong> {pet.breed}
        </p>
        <p>
          <strong>Idade:</strong> {pet.age} anos
        </p>
        {pet.notes && (
          <p>
            <strong>Notas:</strong> {pet.notes}
          </p>
        )}
      </div>

      <div className="pet-actions">
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

export default PetCard
