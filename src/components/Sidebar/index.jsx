import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '../../utils/auth'
import './sidebar.css'

export default function Sidebar() {
  const navigate = useNavigate()
  const [role, setRole] = useState('CUSTOMER')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.role) {
      setRole(user.role)
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="sidebar">
      <Link to="/perfil" className="sidebar-link">
        Perfil
      </Link>

      {role === 'CUSTOMER' && (
        <Link to="/pets" className="sidebar-link">
          Pets
        </Link>
      )}

      <Link to="/agendamentos" className="sidebar-link">
        Agendamentos
      </Link>

      {role === 'ADMIN' && (
        <>
          <Link to="/admin/servicos" className="sidebar-link">
            Serviços
          </Link>
          <Link to="/admin/categorias" className="sidebar-link">
            Categorias
          </Link>
          <Link to="/admin/produtos" className="sidebar-link">
            Produtos
          </Link>
        </>
      )}

      <Link to="/pedidos" className="sidebar-link">
        Pedidos
      </Link>

      <button
        onClick={handleLogout}
        className="sidebar-button"
        style={{
          backgroundColor: 'red',
          fontWeight: '700',
          marginTop: '3.2rem'
        }}
      >
        Sair
      </button>
    </div>
  )
}
