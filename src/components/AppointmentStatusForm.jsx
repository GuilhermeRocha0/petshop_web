import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../services/api'

const validStatus = ['em andamento', 'a pagar', 'concluído']

const AppointmentStatusForm = ({
  appointmentId,
  onClose,
  fetchAppointments
}) => {
  const [status, setStatus] = useState('')
  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          toast.error('Sessão expirada, faça login novamente.')
          onClose()
          return
        }

        const res = await api.get(`/appointments/${appointmentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        setAppointment(res.data.appointment)
        setStatus(res.data.appointment.status || '')
        setLoading(false)
      } catch (error) {
        console.error(error)
        toast.error('Erro ao carregar dados do agendamento.')
        onClose()
      }
    }

    fetchAppointment()
  }, [appointmentId, onClose])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!status) {
      toast.error('Selecione um status.')
      return
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Sessão expirada, faça login novamente.')
        return
      }

      await api.put(
        `/appointments/status/${appointmentId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      toast.success('Status atualizado com sucesso!')
      fetchAppointments()
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar o status.')
    }
  }

  if (loading) {
    return <p>Carregando dados do agendamento...</p>
  }

  if (!appointment) {
    return <p>Agendamento não encontrado.</p>
  }

  return (
    <div className="status-form-container">
      <h2>Alterar Status</h2>

      <div className="appointment-details">
        <p>
          <strong>Pet:</strong> {appointment.pet?.name || 'N/D'}
        </p>
        <p>
          <strong>Serviços:</strong>{' '}
          {appointment.services?.map(s => s.name).join(', ') || 'N/D'}
        </p>
        <p>
          <strong>Data:</strong>{' '}
          {new Date(appointment.scheduledDate).toLocaleString() || 'N/D'}
        </p>
        <p>
          <strong>Preço:</strong> R$ {appointment.totalPrice || 'N/D'}
        </p>
        <p>
          <strong>Status atual:</strong> {appointment.status || 'N/D'}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="status">Novo Status:</label>
          <select
            id="status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="input-standard"
          >
            <option value="">Selecione</option>
            {validStatus.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="side">
            Atualizar
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default AppointmentStatusForm
