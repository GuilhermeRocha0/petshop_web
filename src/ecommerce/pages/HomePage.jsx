import React from 'react'
import Header from '../components/Header'
import SidebarCart from '../components/SidebarCart'
import ProductList from '../components/ProductList'

export default function HomePage({
  products,
  showSidebarCart,
  setShowSidebarCart,
  addProductToCart,
  selectedProducts,
  cartTotal,
  removeProductFromCart,
  addToCartTotal,
  darkMode
}) {

  const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <Header />
      <SidebarCart
        darkMode={darkMode}
        addToCartTotal={addToCartTotal}
        removeProductFromCart={removeProductFromCart}
        cartTotal={cartTotal}
        selectedProducts={selectedProducts}
        setShowSidebarCart={setShowSidebarCart}
        showSidebarCart={showSidebarCart}
      ></SidebarCart>
      <div className="page-inner-content">
        <div className="section-title">
          <h3>Produtos Selecionados</h3>
          <div className="underline"></div>
        </div>

        <div className="main-content">
          <ProductList
            addProductToCart={addProductToCart}
            products={filteredProducts}
            addToCartTotal={addToCartTotal}
          ></ProductList>
        </div>
      </div>
    </>
  )
}
