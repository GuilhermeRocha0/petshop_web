import React, { useState, useEffect } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ptBR from 'date-fns/locale/pt-BR'

registerLocale('pt-BR', ptBR)

const AppointmentForm = ({
  pets,
  services,
  selectedPet,
  selectedServices,
  date,
  setSelectedPet,
  setSelectedServices,
  setDate,
  handleSubmit,
  existingAppointments = []
}) => {
  const [timeError, setTimeError] = useState('')
  const [totalEstimatedTime, setTotalEstimatedTime] = useState(0) // tempo total estimado em minutos

  // Atualiza o tempo total estimado quando os serviços selecionados mudam
  useEffect(() => {
    const total = selectedServices.reduce((sum, serviceId) => {
      const service = services.find(s => s._id === serviceId)
      return service ? sum + service.estimatedTime : sum
    }, 0)
    setTotalEstimatedTime(total)
  }, [selectedServices, services])

  // Retorna true para datas habilitadas (não domingos)
  const isDateEnabled = date => {
    const day = date.getDay()
    return day !== 0 // domingo desabilitado
  }

  // Função para verificar conflito considerando tempo total estimado
  const filterTime = time => {
    const hour = time.getHours()
    const minutes = time.getMinutes()

    // Horário dentro do expediente e minutos múltiplos de 15
    const isWithinBusinessHours =
      hour >= 8 && (hour < 17 || (hour === 17 && minutes === 0))
    const isIntervalValid = minutes % 15 === 0

    if (!isWithinBusinessHours || !isIntervalValid) {
      return false
    }

    // Tempo de início do agendamento que queremos criar
    const appointmentStart = time.getTime()
    // Tempo final do agendamento que queremos criar
    const appointmentEnd = appointmentStart + totalEstimatedTime * 60000

    // Verifica se há conflito com algum agendamento existente
    const conflicting = existingAppointments.some(
      ({ scheduledDate, totalEstimatedTime: existingTime }) => {
        const existingStart = new Date(scheduledDate).getTime()
        const existingEnd = existingStart + existingTime * 60000

        // Conflito ocorre se:
        // O início novo está dentro de um agendamento existente
        // OU o fim novo está dentro de um agendamento existente
        // OU o novo intervalo envolve completamente um agendamento existente
        return (
          (appointmentStart >= existingStart &&
            appointmentStart < existingEnd) ||
          (appointmentEnd > existingStart && appointmentEnd <= existingEnd) ||
          (appointmentStart <= existingStart && appointmentEnd >= existingEnd)
        )
      }
    )

    return !conflicting
  }

  const handleDateChange = selectedDate => {
    if (!selectedDate) {
      setTimeError('Data e horário inválidos.')
      setDate(null)
      return
    }
    setTimeError('')
    setDate(selectedDate)
  }

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <div className="form-group">
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

      <div className="form-group">
        <label className="appointment-form-label">Serviços:</label>
        {services.length > 0 ? (
          services.map(service => (
            <div key={service._id} className="service-option-container">
              <input
                type="checkbox"
                className="service-checkbox"
                value={service._id}
                id={service._id}
                checked={selectedServices.includes(service._id)}
                onChange={e => {
                  const { checked, value } = e.target
                  setSelectedServices(prev =>
                    checked ? [...prev, value] : prev.filter(id => id !== value)
                  )
                }}
              />
              <label htmlFor={service._id} className="service-label">
                {service.name} | Tempo: {service.estimatedTime}min - R$
                {service.price}
              </label>
            </div>
          ))
        ) : (
          <p className="loading-message">Carregando serviços...</p>
        )}
      </div>

      <div className="form-group">
        <label className="appointment-form-label">Data e Hora:</label>
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="dd/MM/yyyy HH:mm"
          timeFormat="HH:mm"
          timeIntervals={15}
          minDate={new Date()}
          filterDate={isDateEnabled}
          filterTime={filterTime}
          locale="pt-BR"
          className="input-standard"
          placeholderText="Selecione uma data e horário"
          timeCaption="Hora"
        />
        {timeError && <p className="error-message">{timeError}</p>}
      </div>

      <button type="submit" className="side" disabled={!!timeError}>
        Agendar
      </button>
    </form>
  )
}

export default AppointmentForm
