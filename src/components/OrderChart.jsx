import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import api from '../services/api'

const OrderChart = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))

        if (!token || !user) return

        const route =
          user.role === 'ADMIN'
            ? '/admin/order-reservations'
            : '/order-reservation'

        const res = await api.get(route, {
          headers: { Authorization: `Bearer ${token}` }
        })

        const orderList = res.data.reservations || res.data
        setOrders(orderList)
      } catch (error) {
        console.error('Erro ao buscar pedidos: ', error)
      }
    }

    fetchOrders()
  }, [])

  const statusCounts = {
    cancelado: 0,
    pendente: 0,
    concluído: 0
  }

  orders.forEach(order => {
    if (statusCounts[order.status] !== undefined) {
      statusCounts[order.status]++
    }
  })

  const data = {
    labels: ['Cancelado', 'Pendente', 'Concluído'],
    datasets: [
      {
        data: [
          statusCounts.cancelado,
          statusCounts.pendente,
          statusCounts.concluído
        ],
        backgroundColor: ['#e74c3c', '#f1c40f', '#2ecc71']
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'white'
        }
      }
    }
  }

  return (
    <div className='chart-card'>
      <h3>Status dos Pedidos</h3>
        <Pie data={data} options={options} className='pie-chart' />
      
    </div>
  )
}

export default OrderChart
