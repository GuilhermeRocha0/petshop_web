import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import api from '../services/api'

const OrderChart = () => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await api.get('/orders', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const orders = res.data

        // Contagem por status
        const statusCount = {
          cancelado: 0,
          pendente: 0,
          concluído: 0
        }

        orders.forEach(order => {
          const status = order.status.toLowerCase()
          if (statusCount[status] !== undefined) {
            statusCount[status]++
          }
        })

        const formatted = Object.entries(statusCount).map(([status, value]) => ({
          name: status.charAt(0).toUpperCase() + status.slice(1),
          value
        }))

        setChartData(formatted)
      } catch (err) {
        console.error('Erro ao buscar pedidos:', err)
      }
    }

    fetchOrders()
  }, [])

  const COLORS = ['#f44336', '#ff9800', '#4caf50'] // Cancelado, Pendente, Concluído

  return (
    <div className='chart-card'>
      <h3 style={{ textAlign: 'center' }}>Status dos Pedidos</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default OrderChart
