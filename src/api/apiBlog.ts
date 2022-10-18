import axios from "axios";
//LOCAL: http://127.0.0.1:8000/
//PRODUÇÃO: https://www.sorvetec.com.br/laravel/public/

var token = sessionStorage.getItem("token");

const apiBlog = axios.create({
  baseURL: "https://www.sorvetec.com.br/laravel/public/",
  headers: { Authorization: `Bearer ${token}` },
});

export default apiBlog;
