import { useState, useEffect, useRef } from 'react';
import api from '../services/api';

export const useReportData = (endpoint, filters) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lastFiltersRef = useRef(null); // inicializa null para forçar a busca inicial

  useEffect(() => {
    // Só evita buscar se for exatamente igual e já buscou antes
    if (lastFiltersRef.current !== null &&
        JSON.stringify(lastFiltersRef.current) === JSON.stringify(filters)) {
      return;
    }

    lastFiltersRef.current = filters;
    setLoading(true);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(endpoint, {
          params: filters,
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, filters]);

  return { data, loading, error };
};
