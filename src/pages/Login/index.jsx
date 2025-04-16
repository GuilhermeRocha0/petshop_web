import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginForm from '../../components/LoginForm'
import { isAuthenticated } from '../../utils/auth'

const Login = () => {
  const navigate = useNavigate() // 👈 Adicione isso aqui

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/perfil') // redireciona se já estiver logado
    }
  }, [navigate])

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Bem-vindo de volta!</h1>
      <LoginForm />
    </div>
  )
}

export default Login
