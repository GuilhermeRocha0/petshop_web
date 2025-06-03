import React, { useState } from 'react'

const TableNavigator = ({ data, children }) => {
  const options = [10, 25, 50, 100, 'Todos itens']
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const totalItems = data.length
  const perPage = itemsPerPage === 'Todos itens' ? totalItems : itemsPerPage
  const totalPages = Math.ceil(totalItems / perPage) || 1

  const startIdx = (currentPage - 1) * perPage
  const endIdx = Math.min(startIdx + perPage, totalItems)
  const currentItems = data.slice(startIdx, endIdx)

  const handleItemsPerPageChange = e => {
    setItemsPerPage(
      e.target.value === 'Todos itens' ? 'Todos itens' : Number(e.target.value)
    )
    setCurrentPage(1)
  }

  const goToFirst = () => setCurrentPage(1)
  const goToLast = () => setCurrentPage(totalPages)
  const goToPrev = () => setCurrentPage(prev => Math.max(prev - 1, 1))
  const goToNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))

  return (
    <div className="table-navigator">
      <div className="navigator-top">
        <label>Itens por página: </label>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="navigator-info">
        <div className="navigator-text">
          Mostrando de {totalItems === 0 ? 0 : startIdx + 1} até {endIdx} de{' '}
          {totalItems} registros
        </div>

        <div className="navigator-buttons">
          <button onClick={goToFirst} disabled={currentPage === 1}>
            Início
          </button>
          <button onClick={goToPrev} disabled={currentPage === 1}>
            Anterior
          </button>
          <button onClick={goToNext} disabled={currentPage === totalPages}>
            Próxima
          </button>
          <button onClick={goToLast} disabled={currentPage === totalPages}>
            Fim
          </button>
        </div>
      </div>

      {children(currentItems)}

      <div className="navigator-info">
        <div className="navigator-text">
          Mostrando de {totalItems === 0 ? 0 : startIdx + 1} até {endIdx} de{' '}
          {totalItems} registros
        </div>

        <div className="navigator-buttons">
          <button onClick={goToFirst} disabled={currentPage === 1}>
            Início
          </button>
          <button onClick={goToPrev} disabled={currentPage === 1}>
            Anterior
          </button>
          <button onClick={goToNext} disabled={currentPage === totalPages}>
            Próxima
          </button>
          <button onClick={goToLast} disabled={currentPage === totalPages}>
            Fim
          </button>
        </div>
      </div>
    </div>
  )
}

export default TableNavigator
