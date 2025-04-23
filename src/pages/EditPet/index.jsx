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
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Raça:</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Idade:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              min="0"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Porte:</label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
            >
              <option value="pequeno">Pequeno</option>
              <option value="médio">Médio</option>
              <option value="grande">Grande</option>
            </select>
          </div>

          <div>
            <label>Observações:</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="button-container">
            <div className="button-junto">
              <Link to="/pets">
                <button type="button" className="form-button">
                  Cancelar
                </button>
              </Link>
              <button type="submit" className="form-button">
                Salvar Alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPet
