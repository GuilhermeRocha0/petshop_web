import React, { useState } from 'react'

const OrderTable = ({ orders }) => {
  const [emailFilter, setEmailFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredOrders = orders.filter(order => {
    const emailMatch = order.user.email
      .toLowerCase()
      .includes(emailFilter.toLowerCase())
    const dateMatch = dateFilter
      ? new Date(order.createdAt).toISOString().slice(0, 10) === dateFilter
      : true
    const statusMatch = statusFilter ? order.status === statusFilter : true
    return emailMatch && dateMatch && statusMatch
  })

  return (
    <div className="table-container">
      <h2 className="table-title">Pedidos</h2>
      <div className="filter-group">
        <input
          type="text"
          placeholder="Filtrar por email..."
          value={emailFilter}
          onChange={e => setEmailFilter(e.target.value)}
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
      <div className="table-responsive">
        <table className="custom-table">
          <thead className="custom-thead">
            <tr className="custom-tr">
              <th className="custom-th">Usuário</th>
              <th className="custom-th">Email</th>
              <th className="custom-th">Data Pedido</th>
              <th className="custom-th">Data Válido</th>
              <th className="custom-th">Status</th>
              <th className="custom-th">Qtd. Itens</th>
              <th className="custom-th">Total (R$)</th>
            </tr>
          </thead>
          <tbody className="custom-tbody">
            {filteredOrders.map(order => (
              <tr className="custom-tr" key={order._id}>
                <td className="custom-td">{order.user.name}</td>
                <td className="custom-td">{order.user.email}</td>
                <td className="custom-td">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="custom-td">
                  {new Date(order.validUntil).toLocaleDateString()}
                </td>
                <td className="custom-td">{order.status}</td>
                <td className="custom-td">{order.items.length}</td>
                <td className="custom-td">{order.totalAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderTable
