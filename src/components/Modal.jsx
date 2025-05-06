import React from 'react'

const Modal = ({ onCancel, onConfirm, modalMessage, buttonMessage }) => {
  return (
    <div className="modal-background">
      <div className="modal">
        <h3 className="modal-message">{modalMessage}</h3>
        <div className="modal-actions">
          <button onClick={onCancel} className="modal-cancel-button">
            Cancelar
          </button>
          <button onClick={onConfirm} className="modal-confirm-button">
            {buttonMessage}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
