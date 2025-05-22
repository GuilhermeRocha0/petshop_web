// src/components/LoginForm.jsx
import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import BotaoTema from './BotaoTema'
import HomeButton from './HomeButton'

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

      // Salva o token e a role no localStorage
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      setMessage(response.data.msg)
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
    <div className="lo-main-login">
      <div className="lo-esq-login">
        <img src="../../public/images/dog.png" className="image" alt="Cachorro Brincando com bola" title="Cachorro Brincando com bola"/>
      </div>

      <div className="lo-dir-login">
        <form className="lo-box" onSubmit={handleSubmit}>
          <div className="lo-login-title">Bem-vindo de volta! 🐾</div>
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

          <div className="lo-textfield">
            <label htmlFor="email">Email</label>
            <input
              className="lo-inputs"
              type="email"
              name="email"
              placeholder="Email:"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="lo-textfield">
            <label htmlFor="password">Senha</label>
            <input
              className="lo-inputs"
              type="password"
              name="password"
              placeholder="Senha:"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="lo-p">
            <p>
              Esqueceu sua senha?{' '}
              <Link to="/redefinir-senha" title='redefina sua senha'>Redefina aqui</Link>
            </p>
          </div>

          <br />

          <button className="btn" type="submit" title='Clique para logar'>
            Login
          </button>

          <p className="ponto">
            Caso não tenha conta: <Link to="/cadastrar" title='Caso nao tenha Conta'>Cadastre-se</Link>
          </p>
        </form>
      </div>

      <HomeButton />
      <BotaoTema />
    </div>
  )
}

export default LoginForm
