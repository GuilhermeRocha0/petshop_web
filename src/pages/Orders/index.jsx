import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'
import { isAuthenticated, logout } from '../../utils/auth'
import Sidebar from '../../components/Sidebar'
import Modal from '../../components/Modal'
import OrderCard from '../../components/OrderCard'
import Pagination from '../../components/Pagination'
import BotaoTema from '../../components/BotaoTema'
import HomeButton from '../../components/HomeButton'
import OrderStatusForm from '../../components/OrderStatusForm'
import LoadingModal from '../../components/LoadingModal'
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
  const [isLoading, setIsLoading] = useState(false)
  

  const fetchOrders = async () => {
    setIsLoading(true)

    if (!isAuthenticated()) {
      toast.error('Sessão expirada. Faça login novamente.')
      setIsLoading(false)
      logout()
      navigate('/login')
      return
    }

    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      toast.error('Informações de usuário ausentes.')
      setIsLoading(false)
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
      console.log(res.data.reservations || [])
      setOrders(res.data.reservations || [])
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao carregar pedidos.')
    } finally {
      setIsLoading(false)
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

  const handleCancel = orderId => {
    setSelectedOrderId(orderId)
    setShowModal(true)
  }

  const confirmCancel = async () => {
    setIsLoading(true)

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada, faça login novamente.')
      setIsLoading(false)
      logout()
      navigate('/login')
      return
    }

    try {
      await api.put(
        `/order-reservation/cancel/${selectedOrderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      await fetchOrders()
      toast.success('Pedido cancelado com sucesso!')
      setShowModal(false)
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao cancelar o pedido.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-container">
      <LoadingModal isOpen={isLoading} />
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
                  onCancel={handleCancel}
                  userRole={userRole}
                  currentUserId={JSON.parse(localStorage.getItem('user'))._id}
                  onEditStatus={setEditingOrderId}
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

      {showModal && (
        <Modal
          onCancel={() => setShowModal(false)}
          onConfirm={confirmCancel}
          modalMessage="Tem certeza que deseja cancelar este pedido?"
          buttonMessage="Confirmar Cancelamento"
          isDelete={true}
        />
      )}
    </div>
  )
}

export default Orders
