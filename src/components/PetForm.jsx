import React, { useEffect, useState } from 'react'

const PetForm = ({ editingPet, handleSubmit }) => {
  const [name, setName] = useState('')
  const [size, setSize] = useState('pequeno')
  const [age, setAge] = useState('')
  const [breed, setBreed] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (editingPet) {
      setName(editingPet.name)
      setSize(editingPet.size)
      setAge(editingPet.age)
      setBreed(editingPet.breed)
      setNotes(editingPet.notes || '')
    }
  }, [editingPet])

  return (
    <form
      onSubmit={e => handleSubmit(e, name, size, age, breed, notes)}
      className="pet-form"
    >
      <div>
        <label className="pet-form-label">Nome do Pet:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input-standard"
          required
        />
      </div>

      <div>
        <label className="pet-form-label">Tamanho:</label>
        <select
          value={size}
          onChange={e => setSize(e.target.value)}
          className="input-standard"
          required
        >
          <option value="pequeno">Pequeno</option>
          <option value="médio">Médio</option>
          <option value="grande">Grande</option>
        </select>
      </div>

      <div>
        <label className="pet-form-label">Idade em anos:</label>
        <input
          type="number"
          value={age}
          onChange={e => setAge(Number(e.target.value))}
          className="input-standard"
          min="0"
          required
        />
      </div>

      <div>
        <label className="pet-form-label">Raça:</label>
        <input
          type="text"
          value={breed}
          onChange={e => setBreed(e.target.value)}
          className="input-standard"
          required
        />
      </div>

      <div>
        <label className="pet-form-label">Notas:</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="input-standard"
        />
      </div>

      <button type="submit" className="side">
        {editingPet ? 'Atualizar Pet' : 'Cadastrar Pet'}
      </button>
    </form>
  )
}

export default PetForm
