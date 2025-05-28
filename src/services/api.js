import axios from 'axios'

const api = axios.create({
  baseURL: 'https://petshopapi-production-e4d6.up.railway.app' // ajuste para o endereço da sua API
})

export default api
