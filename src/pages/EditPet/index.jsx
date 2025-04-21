import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

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
    <div className="login-page">
      <div className="login-box">
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
          <input
            name="size"
            value={formData.size}
            placeholder="Porte"
            onChange={handleChange}
            required
          />
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

          <Link to="/pets">
            <button type="button">Cancelar</button>
          </Link>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  )
}

export default EditPet
