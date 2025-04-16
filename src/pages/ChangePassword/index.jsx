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
    <div className="login-page">
      <div className="login-box">
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
          <div className="button-container">
            <div className='button-junto'>
              <button
                type="button"
                onClick={() => navigate('/perfil')}

              >
                Cancelar
              </button>
              <button type="submit">Atualizar Senha</button>
            </div>
          </div>


        </form>
      </div>
    </div>
  )
}

export default ChangePassword
