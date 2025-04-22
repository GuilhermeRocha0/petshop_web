import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import './registerPet.css'


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
    <div className="register-pet-page">
  <div className="register-pet-box">
    <h2>Cadastrar Pet</h2>

    {message && <p className="msgRegisterPet" style={{ color: 'lightgreen' }}>{message}</p>}
    {error && <p className="msgRegisterPet" style={{ color: 'red' }}>{error}</p>}

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nome"
        required
      />
      <input
        type="text"
        name="breed"
        value={formData.breed}
        onChange={handleChange}
        placeholder="Raça"
        required
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        min="0"
        onChange={handleChange}
        placeholder="Idade"
        required
      />
      <select name="size" value={formData.size} onChange={handleChange} required>
        <option value="pequeno">Pequeno</option>
        <option value="médio">Médio</option>
        <option value="grande">Grande</option>
      </select>
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows={3}
        placeholder="Observações"
      />

      <div className="botoesRegisterPet">
        <Link to="/pets" className="linkCancelarRegisterPet">
          <button type="button" className="btnCancelarRegisterPet">Cancelar</button>
        </Link>
        <button type="submit" className="btnSalvarRegisterPet">Cadastrar</button>
      </div>
    </form>
  </div>
</div>

  )
}

export default RegisterPet
