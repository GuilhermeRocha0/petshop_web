import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import { logout } from '../../utils/auth'

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

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Perfil do Usuário</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div>
          <p>
            <strong>Nome:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>CPF:</strong> {user.cpf}
          </p>

          <Link to="/editar-perfil">
            <button style={{ marginTop: '10px' }}>Editar Perfil</button>
          </Link>

          <Link to="/alterar-senha">
            <button style={{ marginTop: '10px' }}>Alterar Sennha</button>
          </Link>
        </div>
      )}

      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        Sair
      </button>
    </div>
  )
}

export default Profile
