import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'
import Sidebar from '../../components/Sidebar'
import AppointmentForm from '../../components/AppointmentForm'
import AppointmentCard from '../../components/AppointmentCard'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
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

  const [userRole, setUserRole] = useState(null)

  const fetchAppointments = async (role, token) => {
    try {
      let resAppointments
      if (role === 'ADMIN') {
        resAppointments = await api.get('/appointments/all', {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        resAppointments = await api.get('/appointments', {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      setAppointments(resAppointments.data.appointments || [])
    } catch (err) {
      toast.error('Erro ao carregar agendamentos.')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))

        if (!token || !user) {
          toast.error('Você precisa estar logado.')
          navigate('/login')
          return
        }

        setUserRole(user.role)

        const resPets = await api.get('/pets', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setPets(resPets.data.pets || [])

        const resServices = await api.get('/services')
        setServices(resServices.data.services || [])

        await fetchAppointments(user.role, token)
      } catch (err) {
        console.error(err)
        toast.error('Erro ao carregar dados.')
      }
    }

    fetchData()
  }, [navigate])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!selectedPet || selectedServices.length === 0 || !date) {
      toast.error('Preencha todos os campos.')
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada, por favor faça login novamente!')
      navigate('/login')
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

      await fetchAppointments(userRole, token)
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
      toast.error('Sessão expirada, por favor faça login novamente!')
      navigate('/login')
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

      await fetchAppointments(userRole, token)

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
          <h2>
            {userRole === 'ADMIN'
              ? 'Todos os Agendamentos'
              : 'Seus Agendamentos'}
          </h2>

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
                      userRole={userRole}
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
            <Modal
              onCancel={() => setShowModal(false)}
              onConfirm={confirmCancel}
              modalMessage="Tem certeza que deseja cancelar este agendamento?"
              buttonMessage="Cancelar Agendamento"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Appointments
