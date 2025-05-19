import React from "react";
import Product from "./Product";

export default function ProductList({ products , addProductToCart, addToCartTotal }) {
    return (<div className="product-list">
      {products.map((product) => (
        <Product key={product.id} {...product} 
        addProductToCart ={addProductToCart}
        addToCartTotal={addToCartTotal} />
        ))}  
    </div>
    );
}