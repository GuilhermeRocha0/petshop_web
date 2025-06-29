import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'
import Sidebar from '../../components/Sidebar'
import AppointmentForm from '../../components/AppointmentForm'
import AppointmentCard from '../../components/AppointmentCard'
import AppointmentStatusForm from '../../components/AppointmentStatusForm'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
import './appointments.css'
import BotaoTema from '../../components/BotaoTema'
import HomeButton from '../../components/HomeButton'
import LoadingModal from '../../components/LoadingModal'

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

  const [isLoading, setIsLoading] = useState(false)

  // Estado para editar status do agendamento
  const [editingAppointmentId, setEditingAppointmentId] = useState(null)

  // Buscar agendamentos conforme o papel do usuário
  const fetchAppointments = async (role, token) => {
    setIsLoading(true)
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
      toast.error(err.response?.data?.msg || 'Erro ao carregar agendamentos.')
    } finally {
      setIsLoading(false)
    }
  }

  // Carregar dados iniciais: usuário, pets, serviços e agendamentos
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))

        if (!token || !user) {
          toast.error('Você precisa estar logado.')
          setIsLoading(false)
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
        toast.error(err.response?.data?.msg || 'Erro ao carregar dados.')
      } finally {
        setIsLoading(false) // Finaliza o loading
      }
    }

    fetchData()
  }, [navigate])

  // Criar novo agendamento
  const handleSubmit = async e => {
    e.preventDefault()
    
    if (!selectedPet || selectedServices.length === 0 || !date) {
      toast.error('Preencha todos os campos obrigatórios!')
      return
    }
    
    setIsLoading(true)

    try {
      const payload = {
        petId: selectedPet,
        serviceIds: selectedServices,
        scheduledDate: date.toISOString()
      }

      const token = localStorage.getItem('token')

      const res = await api.post('/appointments', payload, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast.success('Agendamento criado com sucesso!')

      // Atualiza lista com novo agendamento
      await fetchAppointments(userRole, token)

      // Limpar formulário
      setSelectedPet('')
      setSelectedServices([])
      setDate('')

      // Voltar para a lista
      setShowForm(false)
    } catch (error) {
      toast.error(err.response?.data?.msg || 'Erro ao criar agendamento')
    } finally {
      setIsLoading(false) // Finaliza o loading
    }
  }

  // Abrir modal para confirmar cancelamento
  const handleCancel = appointmentId => {
    setSelectedAppointmentId(appointmentId)
    setShowModal(true)
  }

  // Confirmar cancelamento
  const confirmCancel = async () => {
    setIsLoading(true)

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
      toast.error(err.response?.data?.msg || 'Erro ao cancelar o agendamento.')
    } finally {
      setIsLoading(false) // Finaliza o loading
    }
  }

  // Abrir formulário para editar status
  const openStatusForm = appointmentId => {
    setEditingAppointmentId(appointmentId)
  }

  // Fechar formulário de status e atualizar lista
  const closeStatusForm = () => {
    setEditingAppointmentId(null)
    const token = localStorage.getItem('token')
    if (token) fetchAppointments(userRole, token)
  }

  // Ordena agendamentos por data decrescente
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.scheduledDate) - new Date(a.scheduledDate)
  )

  // Paginação dos agendamentos
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAppointments = sortedAppointments.slice(
    startIndex,
    startIndex + itemsPerPage
  )
  const totalPages = Math.ceil(sortedAppointments.length / itemsPerPage)

  return (
    <div className="page-container">
      <LoadingModal isOpen={isLoading} />
      <HomeButton />
      <BotaoTema />

      <div className="painel-container">
        <Sidebar />
        <div className="painel-conteudo">
          <h2>
            {userRole === 'ADMIN'
              ? 'Todos os Agendamentos'
              : 'Seus Agendamentos'}
          </h2>

          {/* Botão para abrir formulário de novo agendamento */}
          {!editingAppointmentId && (
            <button onClick={toggleForm} className="side">
              {showForm ? 'Voltar para Lista' : 'Novo Agendamento'}
            </button>
          )}

          {/* Renderiza formulário ou lista ou edição de status */}
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
              existingAppointments={appointments} // para checagem de conflito
            />
          ) : editingAppointmentId ? (
            <AppointmentStatusForm
              appointmentId={editingAppointmentId}
              onClose={closeStatusForm}
              fetchAppointments={() =>
                fetchAppointments(userRole, localStorage.getItem('token'))
              }
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
            </>
          )}

          {/* Modal para confirmação de cancelamento */}
          {showModal && (
            <Modal
              onCancel={() => setShowModal(false)}
              onConfirm={confirmCancel}
              modalMessage="Tem certeza que deseja cancelar este agendamento?"
              buttonMessage="Confirmar Cancelamento"
              isDelete={true}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Appointments
