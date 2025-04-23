import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

import NavBar from './components/Navbar'
import { useEffect, useState } from 'react'

import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'

function EcommerceApp() {
  const [products, setProducts] = useState([])
  const [showSidebarCart, setShowSidebarCart] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [cartTotal, setCartTotal] = useState(0)

  const addToCartTotal = value => setCartTotal(cartTotal + value)

  useEffect(() => {
    fetch('/db.json')
      .then(res => res.json())
      .then(data => setProducts(data.products))
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
    <div className="App">
      <NavBar
        selectedProducts={selectedProducts}
        setShowSidebarCart={setShowSidebarCart}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                addToCartTotal={addToCartTotal}
                removeProductFromCart={removeProductFromCart}
                selectedProducts={selectedProducts}
                addProductToCart={addProductToCart}
                products={products}
                setShowSidebarCart={setShowSidebarCart}
                showSidebarCart={showSidebarCart}
                cartTotal={cartTotal}
              />
            }
          />
          <Route
            path="/produtos"
            element={<ProductsPage products={products} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default EcommerceApp
