import React from 'react'
import ProductList from '../components/ProductList'
import SidebarCart from '../components/SidebarCart'



export default function ToysPage({
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

    const brinquedos = products.filter(product => {
        const categoryId = typeof product.category === 'object' ? product.category._id : product.category;
        return categoryId === '681625d74df39560a264eb70';
      });


    const filteredProducts = brinquedos.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <div className="page-inner-content">
            <div className="section-title">
                <h3>Nossos Brinquedos</h3>
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

