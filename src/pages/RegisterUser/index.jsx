import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import RegisterUserForm from '../../components/RegisterUserForm'
import { isAuthenticated } from '../../utils/auth'

const RegisterUser = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/perfil')
    }
  }, [navigate])

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Teste</h1>
      <RegisterUserForm />
    </div>
  )
}

export default RegisterUser
