import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { isAuthenticated, logout } from '../../utils/auth'
import Sidebar from '../../components/Sidebar'
import OrderCard from '../../components/OrderCard'
import Pagination from '../../components/Pagination'
import BotaoTema from '../../components/BotaoTema'
import HomeButton from '../../components/HomeButton'
import OrderStatusForm from '../../components/OrderStatusForm'
import './style.css'

const Orders = () => {
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [showModal, setShowModal] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingOrderId, setEditingOrderId] = useState(null)

  const fetchOrders = async () => {
    if (!isAuthenticated()) {
      toast.error('Sessão expirada. Faça login novamente.')
      logout()
      navigate('/login')
      return
    }

    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      toast.error('Informações de usuário ausentes.')
      logout()
      navigate('/login')
      return
    }

    setUserRole(user.role)

    try {
      const res = await api.get(
        user.role === 'ADMIN'
          ? '/admin/order-reservations'
          : '/order-reservation',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setOrders(res.data.reservations || [])
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao carregar pedidos.')
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [navigate])

  const filteredOrders = orders.filter(order => {
    if (userRole !== 'ADMIN') return true
    const email = order.user?.email?.toLowerCase() || ''
    const cpf = order.user?.cpf || ''
    const search = searchTerm.toLowerCase()
    return email.includes(search) || cpf.includes(search)
  })

  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = sortedOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  )
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage)

  // Abrir formulário para editar status
  const openStatusForm = orderId => setEditingOrderId(orderId)

  // Fechar formulário de status e atualizar lista
  const closeStatusForm = async () => {
    setEditingOrderId(null)
    await fetchOrders()
  }

  return (
    <div className="page-container">
      <HomeButton />
      <BotaoTema />

      <div className="painel-container">
        <Sidebar />
        <div className="painel-conteudo">
          <h2>{userRole === 'ADMIN' ? 'Todos os Pedidos' : 'Seus Pedidos'}</h2>

          {userRole === 'ADMIN' && (
            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar por email ou CPF"
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
          )}

          {paginatedOrders.length === 0 ? (
            <p>Nenhum pedido encontrado.</p>
          ) : editingOrderId ? (
            <OrderStatusForm
              orderId={editingOrderId}
              onClose={closeStatusForm}
              fetchOrders={fetchOrders}
            />
          ) : (
            <div className="order-list">
              {paginatedOrders.map(order => (
                <OrderCard
                  key={order._id}
                  order={order}
                  userRole={userRole}
                  onEditStatus={openStatusForm}
                />
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Orders
