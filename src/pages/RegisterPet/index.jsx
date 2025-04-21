import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

const RegisterPet = () => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    size: 'pequeno',
    notes: ''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const response = await api.post('/pets/register', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setMessage(response.data.msg)

      setTimeout(() => {
        navigate('/pets')
      }, 1000)
    } catch (err) {
      if (err.response?.data?.msg) {
        setError(err.response.data.msg)
      } else {
        setError('Erro ao cadastrar o pet.')
      }
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Cadastrar Pet</h2>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

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
                <button type="button">Cancelar</button>
              </Link>
              <button type="submit">Cadastrar Pet</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPet
