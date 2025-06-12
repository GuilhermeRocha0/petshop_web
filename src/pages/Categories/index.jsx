import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Sidebar from '../../components/Sidebar/index'
import api from '../../services/api'
import CategoryCard from '../../components/CategoryCard'
import CategoryForm from '../../components/CategoryForm'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
import './categories.css'
import HomeButton from '../../components/HomeButton'
import BotaoTema from '../../components/BotaoTema'
import LoadingModal from '../../components/LoadingModal'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  

  const toggleForm = () => {
    setEditingCategory(null)
    setShowForm(prev => !prev)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setIsLoading(true)

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada.')
      setIsLoading(false)
      return
    }

    try {
      const res = await api.get('/categories', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCategories(res.data || [])
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao carregar categorias.')
    } finally {
      setIsLoading(false) // Finaliza o loading
    }
  }

  const handleSubmit = async (e, name) => {
    e.preventDefault()
    setIsLoading(true)

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada.')
      setIsLoading(false)
      return
    }

    if (!name) {
      toast.error('Nome da categoria é obrigatório.')
      setIsLoading(false)
      return
    }

    try {
      if (editingCategory) {
        await api.put(
          `/categories/${editingCategory._id}`,
          { name },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        toast.success('Categoria atualizada com sucesso!')
      } else {
        await api.post(
          '/categories',
          { name },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        toast.success('Categoria cadastrada com sucesso!')
      }

      setShowForm(false)
      setEditingCategory(null)
      fetchCategories()
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao salvar categoria.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = category => {
    setEditingCategory(category)
    setShowForm(true)
  }

  const handleDelete = id => {
    setSelectedCategoryId(id)
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
      await api.delete(`/categories/${selectedCategoryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Categoria deletada com sucesso!')
      fetchCategories()
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao deletar categoria.')
    } finally {
      setIsLoading(false)
    }

    setShowModal(false)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCategories = categories.slice(
    startIndex,
    startIndex + itemsPerPage
  )
  const totalPages = Math.ceil(categories.length / itemsPerPage)

  return (
    <div className="page-container">
      <LoadingModal isOpen={isLoading} />
      <HomeButton />
      <BotaoTema />

      <div className="painel-container">
        <Sidebar />
        <div className="painel-conteudo">
          <h2>Categorias</h2>

          <button onClick={toggleForm} className="side">
            {showForm ? 'Voltar para Lista' : 'Nova Categoria'}
          </button>

          {showForm ? (
            <CategoryForm
              editingCategory={editingCategory}
              handleSubmit={handleSubmit}
            />
          ) : (
            <>
              {paginatedCategories.length === 0 ? (
                <p className="message">Nenhuma categoria encontrada.</p>
              ) : (
                <div className="category-list">
                  {paginatedCategories.map(category => (
                    <CategoryCard
                      key={category._id}
                      category={category}
                      onEdit={() => handleEdit(category)}
                      onDelete={() => handleDelete(category._id)}
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
              modalMessage="Tem certeza que deseja excluir esta categoria?"
              buttonMessage="Excluir Categoria"
              isDelete={true}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Categories
