import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import api from '../services/api'

const AppointmentChart = () => {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))

        if (!token || !user) return

        const route =
          user.role === 'ADMIN' ? '/appointments/all' : '/appointments'

        const res = await api.get(route, {
          headers: { Authorization: `Bearer ${token}` }
        })

        const appointmentList = res.data.appointments || res.data
        setAppointments(appointmentList)
      } catch (error) {
        console.error('Erro ao buscar agendamentos: ', error)
      }
    }

    fetchAppointments()
  }, [])

  const statusCounts = {
    cancelado: 0,
    pendente: 0,
    concluído: 0
  }

  appointments.forEach(app => {
    if (statusCounts[app.status] !== undefined) {
      statusCounts[app.status]++
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
      <h3>Status dos Agendamentos</h3>
      <Pie data={data} options={options} className='pie-chart' />
    </div>
  )
}

export default AppointmentChart
