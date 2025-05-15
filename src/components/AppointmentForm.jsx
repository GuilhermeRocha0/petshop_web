import React from 'react'

const AppointmentForm = ({
  pets,
  services,
  selectedPet,
  selectedServices,
  date,
  setSelectedPet,
  setSelectedServices,
  setDate,
  handleSubmit
}) => (
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
              {service.name} | Tempo Estimado: {service.estimatedTime}min - R$
              {''}
              {service.price}
            </label>
          </div>
        ))
      ) : (
        <p>Carregando serviços...</p>
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
)

export default AppointmentForm
