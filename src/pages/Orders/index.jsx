import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { isAuthenticated, logout } from '../../utils/auth';
import Sidebar from '../../components/Sidebar';
import OrderCard from '../../components/OrderCard';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import BotaoTema from '../../components/BotaoTema';
import HomeButton from '../../components/HomeButton';
import './style.css';

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated()) {
        toast.error('Sessão expirada. Faça login novamente.');
        logout();
        navigate('/login');
        return;
      }

      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        toast.error('Informações de usuário ausentes.');
        logout();
        navigate('/login');
        return;
      }

      setUserRole(user.role);

      try {
        const res = await api.get(
          user.role === 'ADMIN' ? '/admin/order-reservations' : '/order-reservation',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(res.data.reservations || []);
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Erro ao carregar pedidos.');
      }
    };

    fetchData();
  }, [navigate]);

  const handleCancel = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const confirmCancel = async () => {
    if (!isAuthenticated()) {
      toast.error('Sessão expirada. Faça login novamente.');
      logout();
      navigate('/login');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      await api.put(`/order-reservation/cancel/${selectedOrderId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedOrders = orders.map(order =>
        order._id === selectedOrderId ? { ...order, status: 'cancelado' } : order
      );
      setOrders(updatedOrders);
      toast.success('Pedido cancelado com sucesso!');
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao cancelar o pedido.');
    }
  };

  const filteredOrders = orders.filter(order => {
    if (userRole !== 'ADMIN') return true;
    const email = order.user?.email?.toLowerCase() || '';
    const cpf = order.user?.cpf || '';
    const search = searchTerm.toLowerCase();
    return email.includes(search) || cpf.includes(search);
  });

  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = sortedOrders.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  return (
    <div className="page-container">
      <HomeButton />
      <BotaoTema />

      <div className="painel-container">
        <Sidebar />
        <div className="painel-conteudo">
          <h2>{userRole === 'ADMIN' ? 'Todos os Pedidos' : 'Seus Pedidos'}</h2>

          {userRole === 'ADMIN' && (
            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar por email ou CPF"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          )}

          {paginatedOrders.length === 0 ? (
            <p>Nenhum pedido encontrado.</p>
          ) : (
            <div className="order-list">
              {paginatedOrders.map(order => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onCancel={handleCancel}
                  userRole={userRole}
                />
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {showModal && (
        <Modal
          onCancel={() => setShowModal(false)}
          onConfirm={confirmCancel}
          modalMessage="Tem certeza que deseja cancelar este pedido?"
          buttonMessage="Confirmar Cancelamento"
          isDelete={true}
        />
      )}
    </div>
  );
};

export default Orders;
