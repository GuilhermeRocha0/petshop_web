import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '../../utils/auth'
import { isAuthenticated } from '../../utils/auth'


const Header = () => {
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
        <nav>
            <i className="fa-solid fa-paw" id="nav_logo">
                <span> </span>Pet <span>da</span> Carla
            </i>

            <ul id="header-nav-list">
                {role === 'CUSTOMER' && (
                    <li>
                        <Link to="/pets" className="sidebar-link">
                            Pets
                        </Link>
                    </li>
                )}
                <li className="nav-list-item">
                    <Link to="/loja">Ecomerce</Link>
                </li>
                <li className="nav-list-item">
                    <Link to="/agendamentos">Agendamentos</Link>
                </li>
                <li className="nav-list-item">
                    <Link to="/pedidos" className="sidebar-link">
                        Pedidos
                    </Link>
                </li>
            </ul>

            <Link to="/login" className="header-login-button">
                Entrar
            </Link>
        </nav>
    )
}

export default Header
