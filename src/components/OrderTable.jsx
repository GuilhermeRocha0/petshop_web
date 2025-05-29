import React, { useState, useEffect } from 'react';
import { useReportData } from '../hooks/useReportData';
import { useSort } from '../hooks/useSort';

const OrderTable = () => {
  const [filters, setFilters] = useState({ date: '', cpf: '', email: '' });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedFilters(filters), 500);
    return () => clearTimeout(handler);
  }, [filters]);

  const { data: orders, loading, error } = useReportData('/admin/order-reservations', debouncedFilters);
  const { sortedData, handleSort } = useSort(orders, 'createdAt');

  return (
    <div>
      <h2>Pedidos</h2>

      <input
        type="date"
        value={filters.date}
        onChange={e => setFilters({ ...filters, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="CPF"
        value={filters.cpf}
        onChange={e => setFilters({ ...filters, cpf: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={filters.email}
        onChange={e => setFilters({ ...filters, email: e.target.value })}
      />

      {loading && <p>Carregando pedidos...</p>}
      {error && <p style={{ color: 'red' }}>Erro ao carregar dados: {error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('createdAt')}>Data do Pedido</th>
              <th onClick={() => handleSort('user.name')}>Nome</th>
              <th onClick={() => handleSort('user.email')}>Email</th>
              <th onClick={() => handleSort('user.cpf')}>CPF</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={4}>Nenhum pedido encontrado.</td>
              </tr>
            ) : (
              sortedData.map(order => (
                <tr key={order._id}>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.user?.name || '-'}</td>
                  <td>{order.user?.email || '-'}</td>
                  <td>{order.user?.cpf || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderTable;
