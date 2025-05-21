import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import RegisterUserForm from '../../components/RegisterUserForm'
import { isAuthenticated } from '../../utils/auth'
import './RegisterUser.css'

const RegisterUser = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/perfil')
    }
  }, [navigate])

  return (
    <div className="main-login">
      <div className="cad-esq-login">
        <img
          src="../../public/images/dog.png"
          className="image"
          alt="Ilustração Pet"
        />
      </div>
      <div className="cad-dir-login">
        <RegisterUserForm />
      </div>
    </div>
  )
}

export default RegisterUser
