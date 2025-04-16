import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useNavigate, Link } from 'react-router-dom'

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: ''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  // Busca dados do usuário
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/${getUserIdFromToken()}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const { name, email, cpf } = response.data.user
        setFormData({ name, email, cpf })
      } catch (err) {
        setError('Erro ao buscar dados do usuário.')
      }
    }

    fetchUser()
  }, [])

  const getUserIdFromToken = () => {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.id
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const response = await api.put('/user/edit', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setMessage(response.data.msg)

      // Redirecionar após atualização
      setTimeout(() => {
        navigate('/perfil')
      }, 1000)
    } catch (err) {
      if (err.response?.data?.msg) {
        setError(err.response.data.msg)
      } else {
        setError('Erro ao atualizar dados.')
      }
    }
  }

  return (
    <div className="login-page">


      <div className="login-box">
        <h2>Editar Perfil</h2>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>CPF:</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-container">
            <div className='button-junto'>
            <Link to="/perfil">
              <button type="button">
                Cancelar
              </button>
            </Link>
            <button type="submit">Salvar Alterações</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditProfile
