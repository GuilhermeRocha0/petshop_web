import React from 'react'

const OrderTable = ({ orders }) => {
  return (
    <div className="table-container">
      <h2 className="table-title">Pedidos</h2>
      <div className="table-responsive">
        <table className="custom-table">
          <thead className="custom-thead">
            <tr className="custom-tr">
              <th className="custom-th">Usuário</th>
              <th className="custom-th">Email</th>
              <th className="custom-th">Data Pedido</th>
              <th className="custom-th">Data Valido</th>
              <th className="custom-th">Status</th>
              <th className="custom-th">Qtd. Itens</th>
              <th className="custom-th">Total (R$)</th>
            </tr>
          </thead>
          <tbody className="custom-tbody">
            {orders.map(order => (
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
