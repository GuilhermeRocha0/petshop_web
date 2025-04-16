import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000' // ajuste para o endereço da sua API
})

export default api
