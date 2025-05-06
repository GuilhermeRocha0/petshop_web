import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: '', password: '' })
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
      const response = await api.post('/auth/login', formData)

      setMessage(response.data.msg)
      localStorage.setItem('token', response.data.token)

      navigate('/perfil') // redireciona para rota privada
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg)
      } else {
        setError('Erro ao fazer login.')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {message && (
        <p style={{ color: 'green' }} className="return-msg">
          {message}
        </p>
      )}
      {error && (
        <p style={{ color: 'red' }} className="return-msg">
          {error}
        </p>
      )}

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
      <div className="button-container">
        <button type="submit" className="form-button">
          Entrar
        </button>
        <p>
          Esqueceu a senha?
          <Link to="/redefinir-senha">Redefinir Senha</Link>
        </p>

        <p>
          Caso ainda não tenha cadastro:
          <Link to="/cadastrar"> Cadastre-se aqui</Link>
        </p>
      </div>
    </form>
  )
}

export default LoginForm
