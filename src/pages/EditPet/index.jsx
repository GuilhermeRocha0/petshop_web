import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import './editPet.css'

const EditPet = () => {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    age: '',
    breed: '',
    notes: ''
  })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await api.get('/pets', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const pet = response.data.pets.find(p => p._id === id)
        if (pet) setFormData(pet)
        else setError('Pet não encontrado.')
      } catch (err) {
        setError('Erro ao buscar pet.')
      }
    }

    fetchPet()
  }, [id])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await api.put(`/pets/${id}/edit`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('Pet atualizado com sucesso!')
      setTimeout(() => {
        navigate('/pets')
      }, 1000)
    } catch (err) {
      setError(err.response?.data?.msg || 'Erro ao atualizar pet.')
    }
  }

  return (
    <div className="edit-pet-page">
      <div className="edit-pet-box">
        <h2>Editar Pet</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            placeholder="Nome"
            onChange={handleChange}
            required
          />
          <select name="size" value={formData.size} onChange={handleChange} required>
            <option value="pequeno">Pequeno</option>
            <option value="médio">Médio</option>
            <option value="grande">Grande</option>
          </select>
          <input
            name="age"
            value={formData.age}
            placeholder="Idade"
            onChange={handleChange}
            required
          />
          <input
            name="breed"
            value={formData.breed}
            placeholder="Raça"
            onChange={handleChange}
            required
          />
          <input
            name="notes"
            value={formData.notes}
            placeholder="Notas"
            onChange={handleChange}
          />

<div className="botoesEditPet">
  <Link to="/pets" className="linkCancelarEditPet">
    <button type="button" className="btnCancelarEditPet">Cancelar</button>
  </Link>
  <button type="submit" className="btnSalvarEditPet">Salvar</button>
</div>
        </form>
      </div>
    </div>
  )
}

export default EditPet