import React, { useEffect, useState } from 'react'

const CategoryForm = ({ editingCategory, handleSubmit }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name)
    }
  }, [editingCategory])

  return (
    <form onSubmit={e => handleSubmit(e, name)} className="category-form">
      <div>
        <label className="category-form-label">Nome da Categoria:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input-standard"
          required
        />
      </div>

      <button type="submit" className="side">
        {editingCategory ? 'Atualizar Categoria' : 'Cadastrar Categoria'}
      </button>
    </form>
  )
}

export default CategoryForm
