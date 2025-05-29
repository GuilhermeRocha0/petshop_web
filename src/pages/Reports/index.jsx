import React, { useState, useEffect } from 'react'
import ProductTable from '../../components/ProductTable'
import AppointmentTable from '../../components/AppointmentTable'
import OrderTable from '../../components/OrderTable'
import './tableStyles.css'
import './tableNavigator.css'
import LoadingModal from '../../components/LoadingModal'
import api from '../../services/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Reports = () => {
  const [selectedTable, setSelectedTable] = useState('')
  const [userRole, setUserRole] = useState('')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))

      if (!token || !user) {
        toast.error('Você precisa estar logado.')
        navigate('/login')
        return
      }

      setUserRole(user.role)

      try {
        // Produtos (apenas ADMIN)
        if (user.role === 'ADMIN') {
          const resProducts = await api.get('/products', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setProducts(resProducts.data || [])
        }

        // Pedidos
        const resOrders = await api.get(
          user.role === 'ADMIN'
            ? '/admin/order-reservations'
            : '/order-reservation',
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setOrders(resOrders.data.reservations || [])

        // Agendamentos
        const resAppointments = await api.get(
          user.role === 'ADMIN' ? '/appointments/all' : '/appointments',
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setAppointments(resAppointments.data.appointments || [])
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Erro ao carregar dados.')
      } finally {
        setIsLoading(false) // Finaliza o loading
      }
    }

    fetchData()
  }, [navigate])

  return (
    <div>
      <LoadingModal isOpen={isLoading} />
      <h1>Relatórios</h1>
      <select
        onChange={e => setSelectedTable(e.target.value)}
        className="filter-select"
      >
        <option value="">Selecione uma tabela</option>
        <option value="products">Produtos</option>
        <option value="appointments">Agendamentos</option>
        <option value="orders">Pedidos</option>
      </select>

      {selectedTable === 'products' && <ProductTable products={products} />}
      {selectedTable === 'appointments' && (
        <AppointmentTable appointments={appointments} />
      )}
      {selectedTable === 'orders' && <OrderTable orders={orders} />}
    </div>
  )
}

export default Reports
