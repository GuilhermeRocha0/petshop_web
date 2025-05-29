import React from 'react'

const AppointmentTable = ({ appointments }) => {
  return (
    <div className="table-container">
      <h2 className="table-title">Agendamentos</h2>
      <div className="table-responsive">
        <table className="custom-table">
          <thead className="custom-thead">
            <tr className="custom-tr">
              <th className="custom-th">Usuário</th>
              <th className="custom-th">Email</th>
              <th className="custom-th">Pet</th>
              <th className="custom-th">Raça</th>
              <th className="custom-th">Serviços</th>
              <th className="custom-th">Data Agendada</th>
              <th className="custom-th">Status</th>
              <th className="custom-th">Preço Total</th>
            </tr>
          </thead>
          <tbody className="custom-tbody">
            {appointments.map(appointment => (
              <tr className="custom-tr" key={appointment._id}>
                <td className="custom-td">{appointment.userId.name}</td>
                <td className="custom-td">{appointment.userId.email}</td>
                <td className="custom-td">{appointment.pet.name}</td>
                <td className="custom-td">{appointment.pet.breed}</td>
                <td className="custom-td">
                  {appointment.services.map(s => s.name).join(', ')}
                </td>
                <td className="custom-td">
                  {new Date(appointment.scheduledDate).toLocaleString()}
                </td>
                <td className="custom-td">{appointment.status}</td>
                <td className="custom-td">
                  R$ {appointment.totalPrice.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AppointmentTable
