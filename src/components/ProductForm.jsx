import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const ProductForm = ({ editingProduct, handleSubmit, categories }) => {
  const [name, setName] = useState(editingProduct ? editingProduct.name : '')
  const [price, setPrice] = useState(editingProduct ? editingProduct.price : '')
  const [quantity, setQuantity] = useState(
    editingProduct ? editingProduct.quantity : ''
  )
  const [description, setDescription] = useState(
    editingProduct ? editingProduct.description : ''
  )
  const [category, setCategory] = useState(
    editingProduct ? editingProduct.category._id || editingProduct.category : ''
  )
  const [image, setImage] = useState(null)

  const handleImageChange = e => {
    setImage(e.target.files[0])
  }

  const onSubmit = e => {
    e.preventDefault()

    if (!name || !price || !quantity || !category) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    // Passa o evento e os dados para o pai tratar o envio e formData
    handleSubmit(e, name, price, quantity, category, image, description)
  }

  return (
    <form onSubmit={onSubmit} className="product-form">
      <label className="product-form-label">Nome:</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className="input-standard"
        required
      />

      <label className="product-form-label">Preço:</label>
      <input
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        className="input-standard"
        required
      />

      <label className="product-form-label">Estoque:</label>
      <input
        type="number"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        className="input-standard"
        required
      />

      <label className="product-form-label">Categoria:</label>
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="input-standard"
        required
      >
        <option value="">Selecione uma categoria</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <label className="product-form-label">Imagem (obrigatório):</label>
      <input type="file" onChange={handleImageChange} />

      <label className="product-form-label">Descrição:</label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="input-standard"
      />

      <button type="submit" className="edit-button">
        {editingProduct ? 'Atualizar Produto' : 'Cadastrar Produto'}
      </button>
    </form>
  )
}

export default ProductForm
