import React, { useState } from 'react'
import TableNavigator from './TableNavigator'

const AppointmentTable = ({ appointments }) => {
  const [emailFilter, setEmailFilter] = useState('')
  const [petNameFilter, setPetNameFilter] = useState('')
  const [breedFilter, setBreedFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredAppointments = appointments.filter(appointment => {
    const emailMatch = appointment.userId.email
      .toLowerCase()
      .includes(emailFilter.toLowerCase())
    const petNameMatch = appointment.pet.name
      .toLowerCase()
      .includes(petNameFilter.toLowerCase())
    const breedMatch = appointment.pet.breed
      .toLowerCase()
      .includes(breedFilter.toLowerCase())
    const dateMatch = dateFilter
      ? new Date(appointment.scheduledDate).toISOString().slice(0, 10) ===
        dateFilter
      : true
    const statusMatch = statusFilter
      ? appointment.status === statusFilter
      : true
    return emailMatch && petNameMatch && breedMatch && dateMatch && statusMatch
  })

  return (
    <div className="table-container">
      <h2 className="table-title">Agendamentos</h2>
      <div className="filter-group">
        <input
          type="text"
          placeholder="Filtrar por email..."
          value={emailFilter}
          onChange={e => setEmailFilter(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Filtrar por nome do pet..."
          value={petNameFilter}
          onChange={e => setPetNameFilter(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Filtrar por raça..."
          value={breedFilter}
          onChange={e => setBreedFilter(e.target.value)}
          className="filter-input"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          className="filter-input"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">Todos os Status</option>
          <option value="cancelado">Cancelado</option>
          <option value="pendente">Pendente</option>
          <option value="concluído">Concluído</option>
        </select>
      </div>

      <TableNavigator data={filteredAppointments}>
        {currentItems => (
          <div className="table-responsive">
            <table className="custom-table">
              <thead className="custom-thead">
                <tr className="custom-tr">
                  <th className="custom-th">Usuário</th>
                  <th className="custom-th">Email</th>
                  <th className="custom-th">Pet</th>
                  <th className="custom-th">Raça</th>
                  <th className="custom-th">Data Agendada</th>
                  <th className="custom-th">Status</th>
                </tr>
              </thead>
              <tbody className="custom-tbody">
                {currentItems.map(appointment => (
                  <tr className="custom-tr" key={appointment._id}>
                    <td className="custom-td">{appointment.userId.name}</td>
                    <td className="custom-td">{appointment.userId.email}</td>
                    <td className="custom-td">{appointment.pet.name}</td>
                    <td className="custom-td">{appointment.pet.breed}</td>
                    <td className="custom-td">
                      {new Date(appointment.scheduledDate).toLocaleDateString()}
                    </td>
                    <td className="custom-td">{appointment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TableNavigator>
    </div>
  )
}

export default AppointmentTable
