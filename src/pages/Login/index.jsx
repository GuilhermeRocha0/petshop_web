import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BotaoTema from '../../components/BotaoTema'
import LoginForm from '../../components/LoginForm'
import { isAuthenticated } from '../../utils/auth'
import './style.css'
const Login = () => {
  const navigate = useNavigate() // 👈 Adicione isso aqui

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/perfil') // redireciona se já estiver logado
    }
  }, [navigate])

  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default Login
