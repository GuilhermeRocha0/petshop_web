import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { logout } from '../../utils/auth'
import './pets.css'
import './modal.css'

const Pets = () => {
  const [pets, setPets] = useState([])
  const [error, setError] = useState('')
  const [selectedPet, setSelectedPet] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const fetchPets = async () => {
    try {
      const response = await api.get('/pets', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPets(response.data.pets)
    } catch (err) {
      setError('Erro ao carregar pets.')
    }
  }

  useEffect(() => {
    fetchPets()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const confirmDelete = petId => {
    setSelectedPet(petId)
    setShowModal(true)
  }

  const deletePet = async () => {
    try {
      await api.delete(`/pets/${selectedPet}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPets(pets.filter(pet => pet._id !== selectedPet))
      setShowModal(false)
    } catch (err) {
      setError('Erro ao deletar o pet.')
      setShowModal(false)
    }
  }

  return (
    <div className="painel-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button>
          <Link to="/perfil">Seus Dados</Link>
        </button>
        <button>
          <Link to="/pets">Pets</Link>
        </button>
        <button>Agendamentos</button>
        <button
          onClick={handleLogout}
          className="sidebar-button"
          style={{
            backgroundColor: 'red',
            fontWeight: '700',
            marginTop: '32px'
          }}
        >
          Sair
        </button>
      </div>

      {/* Conteúdo */}
      <div className="painel-conteudo">
        <h2>Seus Pets</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {pets.length === 0 ? (
          <p>Você ainda não cadastrou nenhum pet.</p>
        ) : (
          pets.map(pet => (
            <div
              key={pet._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '10px'
              }}
            >
              <p>
                <strong>Nome:</strong> {pet.name}
              </p>
              <p>
                <strong>Raça:</strong> {pet.breed}
              </p>
              <p>
                <strong>Porte:</strong> {pet.size}
              </p>
              <p>
                <strong>Idade:</strong> {pet.age}
              </p>
              <p>
                <strong>Observações:</strong> {pet.notes || '-'}
              </p>

              <div className="button-junto">
                <Link to={`/editar-pet/${pet._id}`}>
                  <button>Editar</button>
                </Link>
                <button
                  onClick={() => confirmDelete(pet._id)}
                  style={{ backgroundColor: 'red' }}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))
        )}

        <div style={{ marginTop: '20px' }}>
          <Link to="/cadastrar-pet">
            <button className="side">Cadastrar Novo Pet</button>
          </Link>
        </div>
      </div>

      {/* Modal de confirmação */}
      {showModal && (
        <div className="modal-background">
          <div className="modal">
            <p>Tem certeza que deseja excluir este pet?</p>
            <div className="button-junto">
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button onClick={deletePet} style={{ backgroundColor: 'red' }}>
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pets
