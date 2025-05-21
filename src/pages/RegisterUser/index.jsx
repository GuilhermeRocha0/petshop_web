import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import RegisterUserForm from '../../components/RegisterUserForm'
import { isAuthenticated } from '../../utils/auth'
import './RegisterUser.css'

const RegisterUser = () => {
  const navigate = useNavigate()

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
      const body = document.body;
      if (theme === 'dark') {
        body.classList.add('tema-escuro');
        body.classList.remove('tema-claro');
      } else {
        body.classList.add('tema-claro');
        body.classList.remove('tema-escuro');
      }
  
      if (isAuthenticated()) {
        navigate('/perfil') // redireciona se já estiver logado
      }
    }, [navigate, theme])

  return (
    <div className="main-login">
      <div className="cad-esq-login">
        <img src="../../public/images/dog.png" className="image" alt="Ilustração Pet" />
      </div>
      <div className="cad-dir-login">
        <RegisterUserForm />
      </div>
    </div>
  )
}

export default RegisterUser
