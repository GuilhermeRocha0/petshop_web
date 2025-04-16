import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import RegisterUserForm from '../../components/RegisterUserForm'
import { isAuthenticated } from '../../utils/auth'
import '../../styles/login.css'

const RegisterUser = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/perfil')
    }
  }, [navigate])

  return (
    
    

    <div className='login-page'>
      <h1>Pet da Carla</h1>
      <div className='login-box'>
        <RegisterUserForm />
      </div>
      
    </div>
  )
}

export default RegisterUser
