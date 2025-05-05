import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'
import Sidebar from '../../components/Sidebar/Sidebar'
import AppointmentForm from '../../components/AppointmentForm'
import AppointmentCard from '../../components/AppointmentCard'
import Pagination from '../../components/Pagination'
import CancelModal from '../../components/CancelModal'
import './appointments.css'

const Appointments = () => {
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [pets, setPets] = useState([])
  const [services, setServices] = useState([])

  const [selectedPet, setSelectedPet] = useState('')
  const [selectedServices, setSelectedServices] = useState([])
  const [date, setDate] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [showForm, setShowForm] = useState(false)
  const toggleForm = () => setShowForm(prev => !prev)

  const [showModal, setShowModal] = useState(false)
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Token não encontrado')

        const resPets = await api.get('/pets', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setPets(resPets.data.pets || [])

        const resServices = await api.get('/services')
        setServices(resServices.data.services || [])

        const resAppointments = await api.get('/appointments', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setAppointments(resAppointments.data.appointments || [])
      } catch (err) {
        console.error(err)
        toast.error('Erro ao carregar dados.')
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!selectedPet || selectedServices.length === 0 || !date) {
      toast.error('Preencha todos os campos.')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada, por favor realize o login novamente!')
      return
    }

    try {
      await api.post(
        '/appointments',
        {
          petId: selectedPet,
          serviceIds: selectedServices,
          scheduledDate: date
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      toast.success('Agendamento criado com sucesso!')
      setSelectedPet('')
      setSelectedServices([])
      setDate('')
      setShowForm(false)

      const updated = await api.get('/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAppointments(updated.data.appointments || [])
    } catch (err) {
      toast.error('Erro ao criar agendamento.')
    }
  }

  const handleCancel = appointmentId => {
    setSelectedAppointmentId(appointmentId)
    setShowModal(true)
  }

  const confirmCancel = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada, por favor realize o login novamente!')
      return
    }

    try {
      await api.put(
        `/appointments/cancel/${selectedAppointmentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      const updated = await api.get('/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAppointments(updated.data.appointments || [])

      toast.success('Agendamento cancelado com sucesso!')
      setShowModal(false)
    } catch (err) {
      toast.error('Erro ao cancelar o agendamento.')
    }
  }

  // Ordena os agendamentos por data decrescente
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.scheduledDate) - new Date(a.scheduledDate)
  )

  // Paginação
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAppointments = sortedAppointments.slice(
    startIndex,
    startIndex + itemsPerPage
  )
  const totalPages = Math.ceil(sortedAppointments.length / itemsPerPage)

  return (
    <div className="page-container">
      <div className="painel-container">
        <Sidebar />
        <div className="painel-conteudo">
          <h2>Seus Agendamentos</h2>

          <button onClick={toggleForm} className="side">
            {showForm ? 'Voltar para Lista' : 'Novo Agendamento'}
          </button>

          {showForm ? (
            <AppointmentForm
              pets={pets}
              services={services}
              selectedPet={selectedPet}
              selectedServices={selectedServices}
              date={date}
              setSelectedPet={setSelectedPet}
              setSelectedServices={setSelectedServices}
              setDate={setDate}
              handleSubmit={handleSubmit}
            />
          ) : (
            <>
              {paginatedAppointments.length === 0 ? (
                <p>Você ainda não tem agendamentos.</p>
              ) : (
                <div className="appointment-list">
                  {paginatedAppointments.map(ag => (
                    <AppointmentCard
                      key={ag._id}
                      ag={ag}
                      onCancel={handleCancel}
                    />
                  ))}
                </div>
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}

          {showModal && (
            <CancelModal
              onCancel={() => setShowModal(false)}
              onConfirm={confirmCancel}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Appointments
