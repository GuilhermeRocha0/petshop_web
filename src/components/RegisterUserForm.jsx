import React, { useState } from 'react'
import api from '../services/api'

const RegisterUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const response = await api.post('/auth/register', formData)
      setMessage(response.data.msg)
      setFormData({
        name: '',
        cpf: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg)
      } else {
        setError('Erro ao cadastrar usuário.')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Usuário</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
        <label>CPF:</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Senha:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Confirmar Senha:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  )
}

export default RegisterUserForm
