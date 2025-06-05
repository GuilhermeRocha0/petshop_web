import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Sidebar from '../../components/Sidebar/index'
import api from '../../services/api'
import ServiceCard from '../../components/ServiceCard'
import ServiceForm from '../../components/ServiceForm'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
import './services.css'
import HomeButton from '../../components/HomeButton'
import BotaoTema from '../../components/BotaoTema'
import LoadingModal from '../../components/LoadingModal'

const Services = () => {
  const [services, setServices] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedServiceId, setSelectedServiceId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const toggleForm = () => {
    setEditingService(null)
    setShowForm(prev => !prev)
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setIsLoading(true)

    try {
      const res = await api.get('/services')
      setServices(res.data.services || [])
    } catch (err) {
      toast.error('Erro ao carregar serviços.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e, name, price, estimatedTime) => {
    e.preventDefault()
    setIsLoading(true)

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada.')
      setIsLoading(false)
      return
    }

    if (!name || !price || !estimatedTime) {
      toast.error('Preencha todos os campos obrigatórios.')
      setIsLoading(false)
      return
    }

    try {
      if (editingService) {
        await api.put(
          `/services/${editingService._id}`,
          { name, price, estimatedTime },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        toast.success('Serviço atualizado com sucesso!')
      } else {
        await api.post(
          '/services/register',
          { name, price, estimatedTime },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        toast.success('Serviço cadastrado com sucesso!')
      }

      setShowForm(false)
      setEditingService(null)
      fetchServices()
    } catch (err) {
      toast.error('Erro ao salvar serviço.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = service => {
    setEditingService(service)
    setShowForm(true)
  }

  const handleDelete = id => {
    setSelectedServiceId(id)
    setShowModal(true)
  }

  const confirmDelete = async () => {
    setIsLoading(true)

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada.')
      setIsLoading(false)
      return
    }

    try {
      await api.delete(`/services/${selectedServiceId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Serviço deletado com sucesso!')
      fetchServices()
    } catch (err) {
      toast.error('Erro ao deletar serviço.')
    } finally {
      setIsLoading(false)
    }

    setShowModal(false)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedServices = services.slice(
    startIndex,
    startIndex + itemsPerPage
  )
  const totalPages = Math.ceil(services.length / itemsPerPage)

  return (
    <div className="page-container">
      <LoadingModal isOpen={isLoading} />
      <HomeButton />
      <BotaoTema />

      <div className="painel-container">
        <Sidebar />
        <div className="painel-conteudo">
          <h2>Serviços</h2>

          <button onClick={toggleForm} className="side">
            {showForm ? 'Voltar para Lista' : 'Novo Serviço'}
          </button>

          {showForm ? (
            <ServiceForm
              editingService={editingService}
              handleSubmit={handleSubmit}
            />
          ) : (
            <>
              {paginatedServices.length === 0 ? (
                <p className="message">Nenhum serviço encontrado.</p>
              ) : (
                <div className="service-list">
                  {paginatedServices.map(service => (
                    <ServiceCard
                      key={service._id}
                      service={service}
                      onEdit={() => handleEdit(service)}
                      onDelete={() => handleDelete(service._id)}
                    />
                  ))}
                </div>
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}

          {showModal && (
            <Modal
              onCancel={() => setShowModal(false)}
              onConfirm={confirmDelete}
              modalMessage="Tem certeza que deseja excluir este serviço?"
              buttonMessage="Excluir Serviço"
              isDelete={true}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Services
