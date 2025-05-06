import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '../../utils/auth'
import './sidebar.css'

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="sidebar">
      <Link to="/perfil" className="sidebar-link">
        Seus Dados
      </Link>
      <Link to="/pets" className="sidebar-link">
        Pets
      </Link>
      <Link to="/agendamentos" className="sidebar-link">
        Agendamentos
      </Link>
      <button
        onClick={handleLogout}
        className="sidebar-button"
        style={{
          backgroundColor: 'red',
          fontWeight: '700',
          marginTop: '32px'
        }}
      >
        Sair
      </button>
    </div>
  )
}
