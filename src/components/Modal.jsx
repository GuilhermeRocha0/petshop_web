import React from 'react'

const Modal = ({
  onCancel,
  onConfirm,
  modalMessage,
  buttonMessage,
  isDelete,
  children
}) => {
  return (
    <div className="modal-background">
      <div className="modal">
        <h3 className="modal-message">{modalMessage}</h3>
        {children}
        <div className="modal-actions">
          <button
            onClick={onCancel}
            className=" modal-button modal-cancel-button"
          >
            Cancelar
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className={
                isDelete
                  ? 'modal-button  modal-delete-button'
                  : 'modal-button modal-confirm-button'
              }
            >
              {buttonMessage}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal
