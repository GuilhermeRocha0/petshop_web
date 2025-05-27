import React from 'react'
import './LoadingModal.css'

const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null

  return (
    <div className="loading-modal-overlay">
      <div className="loading-modal">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>
    </div>
  )
}

export default LoadingModal
