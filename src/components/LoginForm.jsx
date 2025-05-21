// src/components/LoginForm.jsx
import React, { useState, useEffect } from "react";
import api from '../services/api'
import { useNavigate, Link } from 'react-router-dom'
import BotaoTema from './BotaoTema'
import HomeButton from "./HomeButton";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


const LoginForm = () => {
  const navigate = useNavigate()

  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

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

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage('')
    setError('')
  
    console.log("Tentando fazer login com:", formData)
  
    try {
      const response = await api.post('/auth/login', formData)
      console.log("Resposta da API:", response.data)
  
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
  
      setMessage(response.data.msg)
      navigate('/perfil')
    } catch (err) {
      console.error("Erro ao fazer login:", err)
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
        <img src="../../public/images/dog.png" className="image" alt="Pet" />
      </div>

      <div className="lo-dir-login">
        <form className="lo-box" onSubmit={handleSubmit}>
          <div className="lo-login-title">Bem-vindo de volta! 🐾</div>
          <HomeButton />
          <BotaoTema />
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
              <Link to="/redefinir-senha">Redefina aqui</Link>
            </p>
          </div>

          <br />

          <button className="btn" type="submit">Login</button>

          <p className='ponto'>
            Caso não tenha conta: <Link to="/cadastrar">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
