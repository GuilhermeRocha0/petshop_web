import React from 'react'

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <div className="category-card">
      <div className="category-info">
        <h3 className="category-name">{category.name}</h3>
      </div>

      <div className="category-actions">
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

export default CategoryCard
