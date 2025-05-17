import React from 'react'

const BASE_URL = 'http://localhost:3000'

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="admin-product-card">
      <div className="admin-product-info">
        {product.imageUrl && (
          <div className="admin-product-image-name">
            <img
              src={`${BASE_URL}${product.imageUrl}`}
              alt={product.name}
              className="admin-product-image-small"
            />
            <h3 className="admin-product-name">{product.name}</h3>
          </div>
        )}

        {!product.imageUrl && (
          <h3 className="admin-product-name">{product.name}</h3>
        )}

        <p>
          <strong>Preço:</strong> R$ {product.price}
        </p>
        <p>
          <strong>Estoque:</strong> {product.quantity} unidades
        </p>
        <p>
          <strong>Categoria:</strong>{' '}
          {product.category?.name || 'Sem categoria'}
        </p>
        {product.description && (
          <p>
            <strong>Descrição:</strong> {product.description}
          </p>
        )}
      </div>

      <div className="admin-product-actions">
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

export default ProductCard
