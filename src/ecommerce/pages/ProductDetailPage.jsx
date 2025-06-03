import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import SidebarCart from '../components/SidebarCart' // ✅ Importa o SidebarCart
import ProductList from '../components/ProductList'

export default function ProductDetailPage({
  addProductToCart,
  addToCartTotal,
  selectedProducts,
  showSidebarCart,
  setShowSidebarCart,
  removeProductFromCart,
  removeAllFromCart,
  cartTotal,
  darkMode,
  products
}) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`)
        setProduct(res.data)
      } catch (err) {
        setError('Produto não encontrado.')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleReserveNow = () => {
    addToCartTotal(product.price)
    addProductToCart(product._id)
    navigate('/loja/confirmar-pedido')
  }

  if (loading) return <p>Carregando produto...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <SidebarCart
        darkMode={darkMode}
        addProductToCart={addProductToCart}
        removeAllFromCart={removeAllFromCart}
        removeProductFromCart={removeProductFromCart}
        cartTotal={cartTotal}
        selectedProducts={selectedProducts}
        setShowSidebarCart={setShowSidebarCart}
        showSidebarCart={showSidebarCart}
      />

      <div className="product-detail-page page-inner-content">
        <div className="section-title">
          <h3>{product.name}</h3>
          <div className="underline"></div>
        </div>
        <div className="product-detail-container">
          <img src={`${apiUrl}${product.imageUrl}`} alt={product.name} />
          <div className="product-detail-info">
            <p><strong>Descrição:</strong> {product.description}</p>
            <p className='price'><strong>Preço:</strong> R$ {product.price}</p>
            <p><strong>Categoria:</strong> {product.category?.name}</p>
            <p><strong>Estoque:</strong> {product.quantity}</p>

            {product.quantity > 0 ? (
              <>
                <button
                  className="btn-icon-expanded"
                  onClick={handleReserveNow}
                >
                  Reservar Agora <FontAwesomeIcon icon={faMoneyBill} />
                </button>

                <button
                  onClick={() => addProductToCart(product._id)}
                  className="btn-icon-expanded add-to-cart-btn"
                >
                  Adicionar ao Carrinho <FontAwesomeIcon icon={faCartShopping} />
                </button>
              </>
            ) : (
              <p className="out-of-stock">Fora de Estoque</p>
            )}
          </div>
        </div>
        {product && (
          <div className="suggestions-section">
            <h3>Produtos Relacionados</h3>
            <div className="underline"></div>
            <ProductList
              products={products.filter(
                (p) => p._id !== product._id && p.category?.name === product.category?.name
              ).slice(0, 4)} // Limita a 4 sugestões
              addProductToCart={addProductToCart}
              addToCartTotal={addToCartTotal}
            />
          </div>
        )}
      </div>

    </>
  )
}
