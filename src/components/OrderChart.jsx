import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import api from '../services/api';

const OrderChart = () => {
  const [orders, setOrders] = useState([]);

  const [currentTheme, setCurrentTheme] = useState('light'); // 'light' como padrão

  useEffect(() => {

    const getThemeFromDOM = () => {
      // Lê o atributo 'data-theme' do elemento <html>
      return document.documentElement.dataset.theme || 'light';
    };

    // Define o tema inicial ao montar o componente
    setCurrentTheme(getThemeFromDOM());

    // Isso garante que a cor da legenda se atualize se o tema for trocado
    const observer = new MutationObserver(() => {
      setCurrentTheme(getThemeFromDOM());
    });

    // Configura o observador para monitorar o elemento <html>
    // Apenas para mudanças no atributo 'data-theme'
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []); // Dependência vazia para rodar apenas na montagem e desmontagem

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !user) return;

        const route =
          user.role === 'ADMIN'
            ? '/admin/order-reservations'
            : '/order-reservation';

        const res = await api.get(route, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const orderList = res.data.reservations || res.data;
        setOrders(orderList);
      } catch (error) {
        console.error('Erro ao buscar pedidos: ', error);
      }
    };

    fetchOrders();
  }, []);

  const statusCounts = {
    cancelado: 0,
    pendente: 0,
    concluído: 0
  };

  orders.forEach(order => {
    if (statusCounts[order.status] !== undefined) {
      statusCounts[order.status]++;
    }
  });

  const data = {
    labels: ['Cancelado', 'Pendente', 'Concluído'],
    datasets: [
      {
        data: [
          statusCounts.cancelado,
          statusCounts.pendente,
          statusCounts.concluído
        ],
        backgroundColor: ['#e74c3c', '#f1c40f', '#2ecc71']
      }
    ]
  };

  // Se o tema for 'dark', a cor será branca; caso contrário, será preta.
  const legendTextColor = currentTheme === 'dark' ? '#FFFFFF' : '#000000';

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: legendTextColor, 
          font: {
            size: 15, 
            weight: 'bold' 
          }
        }
      }
    }
  };

  return (
    <div className='chart-card'>
      <h3>Status dos Pedidos</h3>
      <Pie data={data} options={options} className='pie-chart' />
    </div>
  );
};

export default OrderChart;