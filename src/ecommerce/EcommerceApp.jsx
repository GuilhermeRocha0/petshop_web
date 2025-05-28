import { Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar'
import { useEffect, useState } from 'react'
import api from '../services/api'

import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ConfirmOrder from './pages/ConfirmOrder'
import ToysPage from './pages/ToysPage'
import FoodPage from './pages/FoodPage'

function EcommerceApp() {
  const [products, setProducts] = useState([])
  const [showSidebarCart, setShowSidebarCart] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const addToCartTotal = amount => {
    setCartTotal(prev => prev + amount)
  }

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

    const existing = selectedProducts.find(item => item._id === id)

    if (existing) {
      if (existing.quantity >= 5) {
        alert('Limite máximo de 5 unidades por produto.')
        return
      }
      if (existing.quantity + 1 > productToAdd.quantity) {
        alert(`Estoque insuficiente. Disponível: ${productToAdd.quantity}`)
        return
      }

      setSelectedProducts(
        selectedProducts.map(item =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { ...productToAdd, quantity: 1 }
      ])
    }

    setCartTotal(cartTotal + productToAdd.price)
  }

  const removeProductFromCart = id => {
    const existing = selectedProducts.find(item => item._id === id)
    if (!existing) return

    if (existing.quantity > 1) {
      setSelectedProducts(
        selectedProducts.map(item =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      )
      setCartTotal(cartTotal - existing.price)
    } else {
      setSelectedProducts(selectedProducts.filter(item => item._id !== id))
      setCartTotal(cartTotal - existing.price)
    }
  }

  const removeAllFromCart = id => {
    const existing = selectedProducts.find(item => item._id === id)
    if (!existing) return

    setSelectedProducts(selectedProducts.filter(item => item._id !== id))
    setCartTotal(cartTotal - existing.price * existing.quantity)
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
                removeProductFromCart={removeProductFromCart}
                removeAllFromCart={removeAllFromCart} // ✅ ADICIONAR ESTA LINHA
                selectedProducts={selectedProducts}
                addProductToCart={addProductToCart}
                addToCartTotal={addToCartTotal}
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
                darkMode={darkMode}
                removeProductFromCart={removeProductFromCart}
                removeAllFromCart={removeAllFromCart} // ✅ ADICIONAR ESTA LINHA
                selectedProducts={selectedProducts}
                addProductToCart={addProductToCart}
                addToCartTotal={addToCartTotal}
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
          path='/brinquedos'
          element={
            <ToysPage
            darkMode={darkMode}
                removeProductFromCart={removeProductFromCart}
                removeAllFromCart={removeAllFromCart} // ✅ ADICIONAR ESTA LINHA
                selectedProducts={selectedProducts}
                addProductToCart={addProductToCart}
                addToCartTotal={addToCartTotal}
                products={products}
                setShowSidebarCart={setShowSidebarCart}
                showSidebarCart={showSidebarCart}
                cartTotal={cartTotal}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            ></ToysPage>
          }
          />

          
<Route
          path='/alimentos'
          element={
            <FoodPage
            darkMode={darkMode}
                removeProductFromCart={removeProductFromCart}
                removeAllFromCart={removeAllFromCart} // ✅ ADICIONAR ESTA LINHA
                selectedProducts={selectedProducts}
                addProductToCart={addProductToCart}
                addToCartTotal={addToCartTotal}
                products={products}
                setShowSidebarCart={setShowSidebarCart}
                showSidebarCart={showSidebarCart}
                cartTotal={cartTotal}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            ></FoodPage>
          }
          />

          

          <Route
            path="/confirmar-pedido"
            element={
              <ConfirmOrder
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
