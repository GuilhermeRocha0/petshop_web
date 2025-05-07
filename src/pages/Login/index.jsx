import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginForm from '../../components/LoginForm'
import { isAuthenticated } from '../../utils/auth'
import './style.css'
const Login = () => {
  const navigate = useNavigate() // Adicione isso aqui

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/perfil') // redireciona se já estiver logado
    }
  }, [navigate])

  return (
    <div className="login-page">
        {/* Silhuetas */}
  <img src="/images/silhuetas.jpg" alt="Silhuetas" className="silhuetas" />
      <h1 className="LogoLogin">
      PET<span>da</span>CARLA
        </h1>
      <div className="login-box">
        <LoginForm />
      </div>
    </div>

    
  )
}

export default Login
