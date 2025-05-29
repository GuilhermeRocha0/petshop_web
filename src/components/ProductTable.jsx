import React from 'react'

const ProductTable = ({ products }) => {
  return (
    <div className="table-container">
      <h2 className="table-title">Produtos</h2>
      <div className="table-responsive">
        <table className="custom-table">
          <thead className="custom-thead">
            <tr className="custom-tr">
              <th className="custom-th">Nome</th>
              <th className="custom-th">Descrição</th>
              <th className="custom-th">Preço</th>
              <th className="custom-th">Quantidade</th>
              <th className="custom-th">Categoria</th>
              <th className="custom-th">Imagem</th>
            </tr>
          </thead>
          <tbody className="custom-tbody">
            {products.map(product => (
              <tr className="custom-tr" key={product._id}>
                <td className="custom-td">{product.name}</td>
                <td className="custom-td">{product.description}</td>
                <td className="custom-td">R$ {product.price.toFixed(2)}</td>
                <td className="custom-td">{product.quantity}</td>
                <td className="custom-td">{product.category.name}</td>
                <td className="custom-td">
                  {product.image && (
                    <img src={product.image} alt={product.name} width="50" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductTable
