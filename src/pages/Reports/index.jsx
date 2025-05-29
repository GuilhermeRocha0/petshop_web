import React, { useState } from 'react';
import ProductTable from '../../components/ProductTable';
import AppointmentTable from '../../components/AppointmentTable';
import OrderTable from '../../components/OrderTable';

const Reports = () => {
  const [selectedTable, setSelectedTable] = useState('');

  return (
    <div>
      <h1>Relatórios</h1>
      <select onChange={(e) => setSelectedTable(e.target.value)}>
        <option value="">Selecione uma tabela</option>
        <option value="products">Produtos</option>
        <option value="appointments">Agendamentos</option>
        <option value="orders">Pedidos</option>
      </select>

      {selectedTable === 'products' && <ProductTable />}
      {selectedTable === 'appointments' && <AppointmentTable />}
      {selectedTable === 'orders' && <OrderTable />}
    </div>
  );
};

export default Reports;
