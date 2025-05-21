import React from 'react'

const EditProfileForm = ({ formData, onChange, onCancel, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="form-container">
      <h3>Editar Perfil</h3>

      <div>
        <label className="profile-form-label">Nome:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="input-standard"
          required
        />
      </div>

      <div>
        <label className="profile-form-label">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          className="input-standard"
          required
        />
      </div>

      <div>
        <label className="profile-form-label">CPF:</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
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
          Salvar Alterações
        </button>
      </div>
    </form>
  )
}

export default EditProfileForm
