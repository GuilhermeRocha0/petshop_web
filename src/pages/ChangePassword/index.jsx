import React, { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
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
      const token = localStorage.getItem('token')
      const response = await api.put('/user/change-password', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setMessage(response.data.msg)
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      })
      setTimeout(() => {
        navigate('/perfil')
      }, 1500)
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg)
      } else {
        setError('Erro ao trocar a senha.')
      }
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Alterar Senha</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Senha Atual:</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Nova Senha:</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Confirmar Nova Senha:</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Salvar</button>
        <button
          type="button"
          onClick={() => navigate('/perfil')}
          style={{ marginLeft: '10px' }}
        >
          Cancelar
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
