import React, { useState, useEffect } from 'react';
import { useReportData } from '../hooks/useReportData';
import { useSort } from '../hooks/useSort';

const AppointmentTable = () => {
  const [filters, setFilters] = useState({ date: '', status: '', cpf: '', email: '' });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedFilters(filters), 500);
    return () => clearTimeout(handler);
  }, [filters]);

  const { data: appointments, loading, error } = useReportData('/appointments/all', debouncedFilters);
  const { sortedData, handleSort } = useSort(appointments, 'scheduledDate');

  return (
    <div>
      <h2>Agendamentos</h2>

      <input
        type="date"
        value={filters.date}
        onChange={e => setFilters({ ...filters, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Status"
        value={filters.status}
        onChange={e => setFilters({ ...filters, status: e.target.value })}
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

      {loading && <p>Carregando agendamentos...</p>}
      {error && <p style={{ color: 'red' }}>Erro ao carregar dados: {error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('scheduledDate')}>Data</th>
              <th onClick={() => handleSort('status')}>Status</th>
              <th onClick={() => handleSort('userId.cpf')}>CPF</th>
              <th onClick={() => handleSort('userId.email')}>Email</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={4}>Nenhum agendamento encontrado.</td>
              </tr>
            ) : (
              sortedData.map(appointment => (
                <tr key={appointment._id}>
                  <td>{new Date(appointment.scheduledDate).toLocaleDateString()}</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.userId?.cpf || '-'}</td>
                  <td>{appointment.userId?.email || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentTable;
