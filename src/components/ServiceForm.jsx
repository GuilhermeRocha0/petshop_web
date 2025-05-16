import React, { useEffect, useState } from 'react'

const ServiceForm = ({ editingService, handleSubmit }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')

  useEffect(() => {
    if (editingService) {
      setName(editingService.name)
      setPrice(editingService.price)
      setEstimatedTime(editingService.estimatedTime)
    }
  }, [editingService])

  return (
    <form
      onSubmit={e => handleSubmit(e, name, price, estimatedTime)}
      className="service-form"
    >
      <div>
        <label className="service-form-label">Nome do Serviço:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input-standard"
          required
        />
      </div>

      <div>
        <label className="service-form-label">Preço (R$):</label>
        <input
          type="number"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          className="input-standard"
          required
        />
      </div>

      <div>
        <label className="service-form-label">Tempo Estimado (minutos):</label>
        <input
          type="number"
          value={estimatedTime}
          onChange={e => setEstimatedTime(Number(e.target.value))}
          className="input-standard"
          required
        />
      </div>

      <button type="submit" className="side">
        {editingService ? 'Atualizar Serviço' : 'Cadastrar Serviço'}
      </button>
    </form>
  )
}

export default ServiceForm
