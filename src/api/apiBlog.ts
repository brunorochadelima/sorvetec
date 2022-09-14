import axios from 'axios'

// https://www.sorvetec.com.br/laravel/public/api/login
const apiBlog = axios.create({
  baseURL: 'http://127.0.0.1:8000/'
})

export default apiBlog;
