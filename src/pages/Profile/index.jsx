import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import { logout } from '../../utils/auth'
import './profile.css'
import Sidebar from '../../components/Sidebar'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = JSON.parse(atob(token.split('.')[1])).id
        const response = await api.get(`/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUser(response.data.user)
      } catch (err) {
        setError('Erro ao carregar perfil.')
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="page-container">
      <div className="painel-container">
        {/* Barra lateral */}
        <Sidebar />

        {}
        <div className="painel-conteudo">
          {user && (
            <>
              <div className="dado-label">Nome:</div>
              <div className="dado-info">{user.name}</div>

              <div className="dado-label">Email:</div>
              <div className="dado-info">{user.email}</div>

              <div className="dado-label">CPF:</div>
              <div className="dado-info">{user.cpf}</div>
            </>
          )}

          <div style={{ marginTop: '30px' }}>
            <Link to="/editar-perfil">
              <button className="side">Editar Perfil</button>
            </Link>
            <br />
            <Link to="/alterar-senha">
              <button className="side">Alterar Senha</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
