import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify' // <-- importar toast
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './profile.css'
import Sidebar from '../../components/Sidebar'
import BotaoTema from '../../components/BotaoTema'
import HomeButton from '../../components/HomeButton'
import EditProfileForm from '../../components/EditProfileForm'
import ChangePasswordForm from '../../components/ChangePasswordForm'

const Profile = () => {
  const [user, setUser] = useState(null)
  // Remover states de error e message
  // const [error, setError] = useState('')
  // const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', cpf: '' })

  const [showEditForm, setShowEditForm] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = JSON.parse(atob(token.split('.')[1])).id
        const response = await api.get(`/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(response.data.user)
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          cpf: response.data.user.cpf
        })
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Erro ao carregar perfil.')
      }
    }

    fetchUser()
  }, [token])

  const handleEditChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = e => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handleEditSubmit = async e => {
    e.preventDefault()
    // Remover setError e setMessage
    try {
      const res = await api.put('/user/edit', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // Mostrar sucesso com toast
      toast.success(res.data.msg || 'Perfil atualizado com sucesso!')
      setShowEditForm(false)
      setUser({ ...user, ...formData })
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao atualizar dados.')
    }
  }

  const handlePasswordSubmit = async e => {
    e.preventDefault()
    // Remover setError e setMessage
    try {
      const res = await api.put('/user/change-password', passwordData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success(res.data.msg || 'Senha alterada com sucesso!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      })
      setShowPasswordForm(false)
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao alterar senha.')
    }
  }

  return (
    <div className="page-container">
      <HomeButton />
      <BotaoTema />

      <div className="painel-container">
        <Sidebar />

        <div className="painel-conteudo">
          {/* Remover mensagens fixas */}
          {/* {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: 'green' }}>{message}</p>} */}

          {user && !showEditForm && !showPasswordForm && (
            <>
              <div className="dado-label">Nome:</div>
              <div className="dado-info">{user.name}</div>

              <div className="dado-label">Email:</div>
              <div className="dado-info">{user.email}</div>

              <div className="dado-label">CPF:</div>
              <div className="dado-info">{user.cpf}</div>

              <div style={{ marginTop: '30px' }}>
                <button
                  className="side"
                  onClick={() => {
                    setShowEditForm(true)
                    setShowPasswordForm(false)
                  }}
                >
                  Editar Perfil
                </button>
                <br />
                <button
                  className="side"
                  onClick={() => {
                    setShowPasswordForm(true)
                    setShowEditForm(false)
                  }}
                >
                  Alterar Senha
                </button>
              </div>
            </>
          )}

          {showEditForm && (
            <EditProfileForm
              formData={formData}
              onChange={handleEditChange}
              onCancel={() => setShowEditForm(false)}
              onSubmit={handleEditSubmit}
            />
          )}

          {showPasswordForm && (
            <ChangePasswordForm
              passwordData={passwordData}
              onChange={handlePasswordChange}
              onCancel={() => setShowPasswordForm(false)}
              onSubmit={handlePasswordSubmit}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
