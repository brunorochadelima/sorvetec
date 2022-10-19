import axios from "axios";
//LOCAL: http://127.0.0.1:8000/
//PRODUÇÃO: https://www.sorvetec.com.br/laravel/public/

// const apiBlog = axios.create({
//   baseURL: "https://www.sorvetec.com.br/laravel/public/",
//   headers: {Authorization:`Bearer ${sessionStorage.getItem("token")}` },
// });

const baseURL = "https://www.sorvetec.com.br/laravel/public/";

const apiBlog = axios.create({
  baseURL,
});

apiBlog.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default apiBlog;
