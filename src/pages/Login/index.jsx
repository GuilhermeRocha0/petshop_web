import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
        <LoginForm />
  )
}

export default Login
