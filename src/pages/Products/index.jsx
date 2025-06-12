import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Sidebar from '../../components/Sidebar/index'
import api from '../../services/api'
import ProductCard from '../../components/ProductCard'
import ProductForm from '../../components/ProductForm'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
import './products.css'
import HomeButton from '../../components/HomeButton'
import BotaoTema from '../../components/BotaoTema'
import LoadingModal from '../../components/LoadingModal'

const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const toggleForm = () => {
    setEditingProduct(null)
    setShowForm(prev => !prev)
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Token não encontrado')
      setIsLoading(false)
      return
    }

    try {
      const res = await api.get('/products', {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Ordenar os produtos em ordem alfabética pelo nome
      const sortedProducts = res.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      )

      setProducts(sortedProducts || [])
    } catch (err) {
      toast.error('Erro ao carregar produtos.')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    setIsLoading(true)

    try {
      const res = await api.get('/categories')
      setCategories(res.data)
    } catch (err) {
      toast.error('Erro ao carregar categorias.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (
    e,
    name,
    price,
    quantity,
    category,
    image,
    description
  ) => {
    e.preventDefault()
    setIsLoading(true)

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada.')
      return
    }

    if (!name || !price || !category || !quantity) {
      toast.error('Preencha todos os campos obrigatórios.')
      setIsLoading(false)
      return
    }

    if (quantity < 0) {
      toast.error('Quantidade não pode ser menor que 0.')
      setIsLoading(false)
      return
    }

    if (price <= 0) {
      toast.error('Preço não pode ser menor ou igual a 0.')
      setIsLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price)
      formData.append('quantity', quantity)
      formData.append('description', description) // ✅ Adicionei a description
      formData.append('category', category)
      if (image) formData.append('image', image)

      if (editingProduct) {
        const res = await api.put(`/products/${editingProduct._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        toast.success('Produto atualizado com sucesso!')
      } else {
        const res = await api.post('/products', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        toast.success('Produto cadastrado com sucesso!')
      }

      setShowForm(false)
      setEditingProduct(null)
      fetchProducts()
    } catch (err) {
      console.log(err)
      toast.error('Erro ao salvar produto.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = product => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = id => {
    setSelectedProductId(id)
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
      const res = await api.delete(`/products/${selectedProductId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Produto deletado com sucesso!')
      fetchProducts()
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.msg || 'Erro ao deletar produto.')
    } finally {
      setIsLoading(true)
    }

    setShowModal(false)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  )
  const totalPages = Math.ceil(products.length / itemsPerPage)

  return (
    <div className="page-container">
      <LoadingModal isOpen={isLoading} />
      <HomeButton />
      <BotaoTema />

      <div className="painel-container">
        <Sidebar />
        <div className="painel-conteudo">
          <h2>Produtos</h2>

          <button onClick={toggleForm} className="side">
            {showForm ? 'Voltar para Lista' : 'Novo Produto'}
          </button>

          {showForm ? (
            <ProductForm
              editingProduct={editingProduct}
              handleSubmit={handleSubmit}
              categories={categories}
            />
          ) : (
            <>
              {paginatedProducts.length === 0 ? (
                <p className="message">Você ainda não tem produtos.</p>
              ) : (
                <div className="admin-product-list">
                  {paginatedProducts.map(product => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onEdit={() => handleEdit(product)}
                      onDelete={() => handleDelete(product._id)}
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
              modalMessage="Tem certeza que deseja excluir este produto?"
              buttonMessage="Excluir Produto"
              isDelete={true}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
