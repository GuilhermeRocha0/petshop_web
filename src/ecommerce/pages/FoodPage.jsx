import React from 'react'
import ProductList from '../components/ProductList'
import SidebarCart from '../components/SidebarCart'



export default function FoodPage({
    products,
    showSidebarCart,
    setShowSidebarCart,
    addProductToCart,
    selectedProducts,
    cartTotal,
    removeProductFromCart,
    removeAllFromCart,
    addToCartTotal,
    searchTerm,
    setSearchTerm,
    darkMode
}) {

    const alimentos = products.filter(product => {
        const categoryId = typeof product.category === 'object' ? product.category._id : product.category;
        return categoryId === '6828e62847213da6c66f6590';
      });


    const filteredProducts = alimentos.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <div className="page-inner-content">
            <div className="section-title">
                <h3>Nossos Alimentos</h3>
                <div className="underline"></div>
            </div>
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

