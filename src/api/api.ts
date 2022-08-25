import axios from 'axios'

const api = axios.create({
  baseURL: 'https://www.multivisi.com.br/'
})

export default api;



