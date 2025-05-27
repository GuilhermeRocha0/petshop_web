import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/Navbar'
import { useEffect, useState } from 'react'

import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import Checkout from "./pages/Checkout";

function EcommerceApp() {
  const [products, setProducts] = useState([])
  const [showSidebarCart, setShowSidebarCart] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCartTotal = value => setCartTotal(cartTotal + value)

  useEffect(() => {
    fetch('/db.json')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, [])

  const addProductToCart = id => {
    const productToAdd = products.filter(product => product.id === id)[0]
    if (selectedProducts.includes(productToAdd)) return
    setSelectedProducts(selectedProducts.concat(productToAdd))
    setCartTotal(cartTotal + productToAdd.price)
  }

  const removeProductFromCart = id => {
    const newSelecterProducts = selectedProducts.filter(
      product => product.id !== id
    )
    setSelectedProducts(newSelecterProducts)
  }

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
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

          <Route path="/checkout" element={<Checkout cartTotal={cartTotal} selectedProducts={selectedProducts} darkMode={darkMode} />}
          />


        </Routes>
      </main>
    </div>
  )
}

export default EcommerceApp
