import { Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar'
import { useEffect, useState } from 'react'
import api from '../services/api' // Importando o axios configurado

import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import Checkout from './pages/Checkout'

function EcommerceApp() {
  const [products, setProducts] = useState([])
  const [showSidebarCart, setShowSidebarCart] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const addToCartTotal = value => setCartTotal(cartTotal + value)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get('/products')
        setProducts(res.data || [])
      } catch (error) {
        setProducts([])
        console.error('Erro ao carregar produtos:', error)
      }
    }
    fetchProducts()
  }, [])

  const addProductToCart = id => {
    const productToAdd = products.find(product => product._id === id)
    if (!productToAdd) return

    // Checa se já existe no carrinho pelo _id
    if (selectedProducts.some(product => product._id === id)) return

    setSelectedProducts([...selectedProducts, productToAdd])
    setCartTotal(cartTotal + productToAdd.price)
  }

  const removeProductFromCart = id => {
    const newSelectedProducts = selectedProducts.filter(
      product => product._id !== id
    )
    setSelectedProducts(newSelectedProducts)
  }

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <NavBar
        selectedProducts={selectedProducts}
        setShowSidebarCart={setShowSidebarCart}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                darkMode={darkMode}
                addToCartTotal={addToCartTotal}
                removeProductFromCart={removeProductFromCart}
                selectedProducts={selectedProducts}
                addProductToCart={addProductToCart}
                products={products}
                setShowSidebarCart={setShowSidebarCart}
                showSidebarCart={showSidebarCart}
                cartTotal={cartTotal}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          />
          <Route
            path="/produtos"
            element={
              <ProductsPage
                addToCartTotal={addToCartTotal}
                darkMode={darkMode}
                removeProductFromCart={removeProductFromCart}
                selectedProducts={selectedProducts}
                addProductToCart={addProductToCart}
                products={products}
                setShowSidebarCart={setShowSidebarCart}
                showSidebarCart={showSidebarCart}
                cartTotal={cartTotal}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cartTotal={cartTotal}
                selectedProducts={selectedProducts}
                darkMode={darkMode}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default EcommerceApp
