// src/components/LoginForm.jsx
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
      navigate('/perfil')
    } catch (err) {
      if (err.response?.data?.msg) {
        setError(err.response.data.msg)
      } else {
        setError('Erro ao fazer login.')
      }
    }
  }

  return (
    <div className="main-login">
      <div className="esq-login">
        <img src="../../public/images/dog.png" className="image" alt="Pet" />
      </div>

      <div className="dir-login">
        <form className="box" onSubmit={handleSubmit}>
          <div className="login-title">Bem-vindo de volta! 🐾</div>

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

          <div className="textfield">
            <label htmlFor="email">Email</label>
            <input
              className="inputs"
              type="email"
              name="email"
              placeholder="Email:"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="textfield">
            <label htmlFor="password">Senha</label>
            <input
              className="inputs"
              type="password"
              name="password"
              placeholder="Senha:"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <p>
            Esqueceu sua senha? <Link to="/redefinir-senha">Redefina aqui</Link>
          </p>

          <br />

          <button className="btn" type="submit">
            Login
          </button>

          <p>
            Caso não tenha conta: <Link to="/cadastrar">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
