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

  const [showForm, setShowForm] = useState(false)
  const toggleForm = () => setShowForm(prev => !prev)

  // Estado para controlar o modal de cancelamento
  const [showModal, setShowModal] = useState(false)
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('Token não encontrado')
        }

        const resPets = await api.get('/pets', {
          headers: { Authorization: `Bearer ${token}` }
        })
        console.log('Pets recebidos:', resPets.data)

        setPets(resPets.data.pets || [])

        const resServices = await api.get('/services')
        console.log('Serviços recebidos:', resServices.data)

        setServices(resServices.data.services || [])

        // Carrega os agendamentos ao carregar a página
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
      const res = await api.post(
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

      // Atualiza a lista de agendamentos após a criação
      const updated = await api.get('/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAppointments(updated.data.appointments || [])
    } catch (err) {
      toast.success('Agendamento cancelado com sucesso!')
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

      // Atualiza a lista de agendamentos após o cancelamento
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
            // Formulário direto na página
            <form onSubmit={handleSubmit}>
              <div>
                <label>Pet:</label>
                <select
                  value={selectedPet}
                  onChange={e => setSelectedPet(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {pets && pets.length > 0 ? (
                    pets.map(pet => (
                      <option key={pet._id} value={pet._id}>
                        {pet.name}
                      </option>
                    ))
                  ) : (
                    <option>Carregando pets...</option>
                  )}
                </select>
              </div>
              <div>
                <label>Serviços:</label>
                {services && services.length > 0 ? (
                  services.map(service => (
                    <div key={service._id}>
                      <input
                        type="checkbox"
                        value={service._id}
                        onChange={e => {
                          const { checked, value } = e.target
                          setSelectedServices(prev =>
                            checked
                              ? [...prev, value]
                              : prev.filter(id => id !== value)
                          )
                        }}
                      />
                      {service.name} - R$ {service.price}
                    </div>
                  ))
                ) : (
                  <p>Carregando serviços...</p>
                )}
              </div>
              <div>
                <label>Data e Hora:</label>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
              <button type="submit" className="side">
                Agendar
              </button>
            </form>
          ) : (
            // Exibição dos agendamentos
            <>
              {appointments.length === 0 ? (
                <p>Você ainda não tem agendamentos.</p>
              ) : (
                appointments.map(ag => (
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
