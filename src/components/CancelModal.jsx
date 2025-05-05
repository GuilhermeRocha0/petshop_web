import React from 'react'

const CancelModal = ({ onCancel, onConfirm }) => (
  <div className="modal-background">
    <div className="modal">
      <p>Tem certeza que deseja cancelar este agendamento?</p>
      <div className="button-junto">
        <button onClick={onCancel} className="form-button">
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="form-button"
          style={{ backgroundColor: 'red' }}
        >
          Confirmar Cancelamento
        </button>
      </div>
    </div>
  </div>
)

export default CancelModal
