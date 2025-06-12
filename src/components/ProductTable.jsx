import React, { useState } from 'react'
import TableNavigator from './TableNavigator'

const ProductTable = ({ products }) => {
  const [nameFilter, setNameFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      product.category.name.toLowerCase().includes(categoryFilter.toLowerCase())
  )

  return (
    <div className="table-container">
      <h2 className="table-title">Produtos</h2>
      <div className="filter-group">
        <input
          type="text"
          placeholder="Filtrar por nome..."
          value={nameFilter}
          onChange={e => setNameFilter(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Filtrar por categoria..."
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      <TableNavigator data={filteredProducts}>
        {currentItems => (
          <div className="table-responsive">
            <table className="custom-table">
              <thead className="custom-thead">
                <tr className="custom-tr">
                  <th className="custom-th">Nome</th>
                  <th className="custom-th">Descrição</th>
                  <th className="custom-th">Preço (R$)</th>
                  <th className="custom-th">Quantidade</th>
                  <th className="custom-th">Categoria</th>
                </tr>
              </thead>
              <tbody className="custom-tbody">
                {currentItems.map(product => (
                  <tr className="custom-tr" key={product._id}>
                    <td className="custom-td">{product.name}</td>
                    <td className="custom-td">{product.description}</td>
                    <td className="custom-td">{product.price.toFixed(2)}</td>
                    <td className="custom-td">{product.quantity}</td>
                    <td className="custom-td">{product.category.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TableNavigator>
    </div>
  )
}

export default ProductTable
