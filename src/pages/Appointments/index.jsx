import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../../services/api'
import Sidebar from '../../components/Sidebar/Sidebar'
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
  const itemsPerPage = 5

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
            <form onSubmit={handleSubmit}>
              <div>
                <label className="appointment-form-label">Pet:</label>
                <select
                  value={selectedPet}
                  onChange={e => setSelectedPet(e.target.value)}
                  className="input-standard"
                >
                  <option value="">Selecione</option>
                  {pets.map(pet => (
                    <option key={pet._id} value={pet._id}>
                      {pet.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="appointment-form-label">Services:</label>
                {services && services.length > 0 ? (
                  services.map(service => (
                    <div key={service._id} className="service-option-container">
                      <input
                        type="checkbox"
                        className="service-checkbox"
                        value={service._id}
                        id={service._id}
                        name={service._id}
                        onChange={e => {
                          const { checked, value } = e.target
                          setSelectedServices(prev =>
                            checked
                              ? [...prev, value]
                              : prev.filter(id => id !== value)
                          )
                        }}
                      />
                      <label htmlFor={service._id} className="service-label">
                        {service.name} - R$ {service.price}
                      </label>
                    </div>
                  ))
                ) : (
                  <p>Loading services...</p>
                )}
              </div>

              <div>
                <label className="appointment-form-label">Data e Hora:</label>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="input-standard"
                />
              </div>

              <button type="submit" className="side">
                Agendar
              </button>
            </form>
          ) : (
            <>
              {paginatedAppointments.length === 0 ? (
                <p>Você ainda não tem agendamentos.</p>
              ) : (
                paginatedAppointments.map(ag => (
                  <div key={ag._id} className="appointment-card">
                    <p>
                      <strong>Pet:</strong> {ag.pet.name}
                    </p>
                    <p>
                      <strong>Serviços:</strong>{' '}
                      {ag.services.map(s => s.name).join(', ')}
                    </p>
                    <p>
                      <strong>Data:</strong>{' '}
                      {new Date(ag.scheduledDate).toLocaleString()}
                    </p>
                    <p>
                      <strong>Status:</strong> {ag.status}
                    </p>
                    {ag.status !== 'cancelado' && (
                      <button
                        onClick={() => handleCancel(ag._id)}
                        className="cancel-button"
                      >
                        Cancelar Agendamento
                      </button>
                    )}
                  </div>
                ))
              )}

              {/* Paginação atualizada */}
              <div className="pagination-container">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  Página Anterior
                </button>

                <span className="pagination-info">
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage(prev => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="pagination-button"
                >
                  Próxima Página
                </button>
              </div>
            </>
          )}

          {/* Modal de Cancelamento */}
          {showModal && (
            <div className="modal-background">
              <div className="modal">
                <p>Tem certeza que deseja cancelar este agendamento?</p>
                <div className="button-junto">
                  <button
                    onClick={() => setShowModal(false)}
                    className="form-button"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmCancel}
                    className="form-button"
                    style={{ backgroundColor: 'red' }}
                  >
                    Confirmar Cancelamento
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Appointments
