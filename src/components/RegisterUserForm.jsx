import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import BotaoTema from './BotaoTema'
import HomeButton from './HomeButton'
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const RegisterUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { theme } = useContext(ThemeContext);


  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (formData.password !== formData.confirmPassword) {
      return setError('As senhas não coincidem.')
    }

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
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      if (err.response?.data?.msg) {
        setError(err.response.data.msg)
      } else {
        setError('Erro ao cadastrar usuário.')
      }
    }
  }

  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('tema-escuro');
      body.classList.remove('tema-claro');
    } else {
      body.classList.add('tema-claro');
      body.classList.remove('tema-escuro');
    }
  }, [theme]);

  return (
    <div className="cad-box">

      <div className="cad-login-title">Faça seu cadastro 🐶!</div>
      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
      <BotaoTema />
      <HomeButton />
      <form onSubmit={handleSubmit}>
        <div className="textfield">

          <label htmlFor="name">Nome</label>
          <input
            className="cad-inputs"
            type="text"
            id="name"
            name="name"
            placeholder="Nome:"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="textfield">
          <label htmlFor="cpf">CPF</label>
          <input
            className="cad-inputs"
            type="text"
            id="cpf"
            name="cpf"
            placeholder="CPF:"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="textfield">
          <label htmlFor="email">Email</label>
          <input
            className="cad-inputs"
            type="email"
            id="email"
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
            className="cad-inputs"
            type="password"
            id="password"
            name="password"
            placeholder="Senha:"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="textfield">
          <label htmlFor="confirmPassword">Confirme sua senha</label>
          <input
            className="cad-inputs"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirmar senha:"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <br />
        <button type="submit" className="btn">Cadastre-se</button>
        <p className='ponto'>
          Já tem uma conta? <Link to="/login">Entre</Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterUserForm
