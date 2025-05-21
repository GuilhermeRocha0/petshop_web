import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import LoginForm from '../../components/LoginForm'
import { isAuthenticated } from '../../utils/auth'
import './style.css'

const Login = () => {
  const navigate = useNavigate()
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    // Checar autenticação após montagem completa
    if (isAuthenticated()) {
      navigate('/perfil')
    } else {
      setCheckingAuth(false)
    }
  }, [navigate])

  if (checkingAuth) {
    return <p>Verificando autenticação...</p>
  }

  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default Login
