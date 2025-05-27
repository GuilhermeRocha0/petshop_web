import React from 'react'
import ProductList from '../components/ProductList'
import SidebarCart from '../components/SidebarCart'

export default function ProductsPage({
  products,
  showSidebarCart,
  setShowSidebarCart,
  addProductToCart,
  selectedProducts,
  cartTotal,
  removeProductFromCart,
  addToCartTotal,
  searchTerm,
  setSearchTerm
}) {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="page-inner-content">
      <div className="section-title">
        <h3>Nossos Produtos</h3>
        <div className="underline"></div>
      </div>
      <SidebarCart
        addToCartTotal={addToCartTotal}
        removeProductFromCart={removeProductFromCart}
        cartTotal={cartTotal}
        selectedProducts={selectedProducts}
        setShowSidebarCart={setShowSidebarCart}
        showSidebarCart={showSidebarCart}
      />
      <div className="main-content">
        <ProductList
          addProductToCart={addProductToCart}
          products={filteredProducts}
          addToCartTotal={addToCartTotal}
        />
      </div>
    </div>
  )
}
