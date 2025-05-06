import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination-container">
    <button
      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
      className="pagination-button"
    >
      Página Anterior
    </button>

    <span className="pagination-info">
      Página {currentPage} de {totalPages}
    </span>

    <button
      onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="pagination-button"
    >
      Próxima Página
    </button>
  </div>
)

export default Pagination
