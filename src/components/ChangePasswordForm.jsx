import React from 'react'

const ChangePasswordForm = ({ passwordData, onChange, onCancel, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="form-container">
      <h3>Alterar Senha</h3>

      <div>
        <label className="profile-form-label">Senha Atual:</label>
        <input
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={onChange}
          className="input-standard"
          required
        />
      </div>

      <div>
        <label className="profile-form-label">Nova Senha:</label>
        <input
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={onChange}
          className="input-standard"
          required
        />
      </div>

      <div>
        <label className="profile-form-label">Confirmar Nova Senha:</label>
        <input
          type="password"
          name="confirmNewPassword"
          value={passwordData.confirmNewPassword}
          onChange={onChange}
          className="input-standard"
          required
        />
      </div>

      <div className="button-junto">
        <button
          type="button"
          onClick={onCancel}
          className="profile-cancel-button"
        >
          Cancelar
        </button>
        <button type="submit" className="side">
          Atualizar Senha
        </button>
      </div>
    </form>
  )
}

export default ChangePasswordForm
