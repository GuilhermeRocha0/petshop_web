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
    <div className="login-page">
      <h1>PET DA CARLA</h1>
      <div className="login-box">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
