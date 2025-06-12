import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Sidebar from '../../components/Sidebar/index'
import api from '../../services/api'
import PetCard from '../../components/PetCard'
import PetForm from '../../components/PetForm'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal'
import './pets.css'
import BotaoTema from '../../components/BotaoTema'
import HomeButton from '../../components/HomeButton'
import LoadingModal from '../../components/LoadingModal'

const Pets = () => {
  const [pets, setPets] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const [showForm, setShowForm] = useState(false)
  const [editingPet, setEditingPet] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedPetId, setSelectedPetId] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  

  const toggleForm = () => {
    setEditingPet(null)
    setShowForm(prev => !prev)
  }

  useEffect(() => {
    fetchPets()
  }, [])

  const fetchPets = async () => {
    setIsLoading(true)

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada.')
      setIsLoading(false)
      return
    }

    try {
      const res = await api.get('/pets', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPets(res.data.pets || [])
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao carregar pets.')
    } finally {
      setIsLoading(false) 
    }
  }

  const handleSubmit = async (e, name, size, age, breed, notes) => {
    e.preventDefault()
    setIsLoading(true)

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada.')
      setIsLoading(false)
      return
    }

    if (!name || !size || !breed || age === '' || isNaN(age)) {
      toast.error('Preencha todos os campos obrigatórios.')
      setIsLoading(false)
      return
    }


    try {
      if (editingPet) {
        await api.put(
          `/pets/${editingPet._id}/edit`,
          { name, size, age, breed, notes },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        toast.success('Pet atualizado com sucesso!')
      } else {
        await api.post(
          '/pets/register',
          { name, size, age, breed, notes },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        toast.success('Pet cadastrado com sucesso!')
      }

      setShowForm(false)
      setEditingPet(null)
      fetchPets()
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao salvar pet.')
    } finally {
      setIsLoading(false) 
    }
  }

  const handleEdit = pet => {
    setEditingPet(pet)
    setShowForm(true)
  }

  const handleDelete = id => {
    setSelectedPetId(id)
    setShowModal(true)
  }

  const confirmDelete = async () => {
    setIsLoading(true)

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Sessão expirada.')
      setIsLoading(false)
      return
    }

    try {
      await api.delete(`/pets/${selectedPetId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Pet deletado com sucesso!')
      fetchPets()
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Erro ao deletar pet.')
    } finally {
      setIsLoading(false) 
    }

    setShowModal(false)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPets = pets.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(pets.length / itemsPerPage)

  return (
    <div className="page-container">
      <LoadingModal isOpen={isLoading} />
      <HomeButton />
      <BotaoTema />

      <div className="painel-container">
        <Sidebar />
        <div className="painel-conteudo">
          <h2>Seus Pets</h2>

          <button onClick={toggleForm} className="side">
            {showForm ? 'Voltar para Lista' : 'Novo Pet'}
          </button>

          {showForm ? (
            <PetForm editingPet={editingPet} handleSubmit={handleSubmit} />
          ) : (
            <>
              {paginatedPets.length === 0 ? (
                <p className="message">Você ainda não tem pets.</p>
              ) : (
                <div className="pet-list">
                  {paginatedPets.map(pet => (
                    <PetCard
                      key={pet._id}
                      pet={pet}
                      onEdit={() => handleEdit(pet)}
                      onDelete={() => handleDelete(pet._id)}
                    />
                  ))}
                </div>
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}

          {showModal && (
            <Modal
              onCancel={() => setShowModal(false)}
              onConfirm={confirmDelete}
              modalMessage="Tem certeza que deseja excluir este pet?"
              buttonMessage="Excluir Pet"
              isDelete={true}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Pets
