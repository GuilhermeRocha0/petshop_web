import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Sidebar from '../../components/Sidebar/index'
import api from '../../services/api'
import ProductCard from '../../components/ProductCard'
import ProductForm from '../../components/ProductForm'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
import './products.css'

const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)

  const toggleForm = () => {
    setEditingProduct(null)
    setShowForm(prev => !prev)
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Token não encontrado')
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
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories')
      setCategories(res.data)
    } catch (err) {
      toast.error('Erro ao carregar categorias.')
    }
  }

  const handleSubmit = async (
    e,
    name,
    price,
    stock,
    category,
    image,
    description
  ) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada.')
      return
    }

    if (!name || !price || !category || !stock) {
      toast.error('Preencha todos os campos obrigatórios.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', price)
      formData.append('quantity', stock)
      formData.append('description', description) // ✅ Adicionei a description
      formData.append('category', category)
      if (image) formData.append('image', image)

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        toast.success('Produto atualizado com sucesso!')
      } else {
        await api.post('/products', formData, {
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
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada.')
      return
    }

    try {
      await api.delete(`/products/${selectedProductId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Produto deletado com sucesso!')
      fetchProducts()
    } catch (err) {
      toast.error('Erro ao deletar produto.')
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
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
