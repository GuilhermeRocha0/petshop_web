import React, { useState, useEffect } from 'react';
import { useReportData } from '../hooks/useReportData';
import { useSort } from '../hooks/useSort';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const ProductTable = () => {
  const [filters, setFilters] = useState({ name: '', category: '', priceRange: [0, 1000] });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // debounce para atualizar filtros e evitar múltiplas requisições a cada tecla
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);
    return () => clearTimeout(handler);
  }, [filters]);

  const { data: products, loading, error } = useReportData('/products', debouncedFilters);
  const { sortedData, handleSort } = useSort(products, 'name');

  return (
    <div>
      <h2>Produtos</h2>

      <input
        type="text"
        placeholder="Nome"
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />
      {/* Pode adicionar outros filtros aqui */}

      {loading && <p>Carregando produtos...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Nome</th>
              <th onClick={() => handleSort('price')}>Preço</th>
              <th onClick={() => handleSort('quantity')}>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={3}>Nenhum produto encontrado.</td>
              </tr>
            ) : (
              sortedData.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
