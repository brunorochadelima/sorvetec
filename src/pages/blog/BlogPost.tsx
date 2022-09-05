import api from "api/api";
import axios from "axios";
import { IBlogs } from "interfaces/IBlogs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import tema from "theme/Base.module.scss";
import style from "./BlogPost.module.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BlogPost() {
  const { id_post } = useParams();
  const [post, setPost] = useState<IBlogs>();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(`https://api.sorvetec.com.br/api/v1/posts/${id_post}`)
        .then((response) => {
          setPost(response.data[0]);
        });
    } catch (error) {
      console.log(error);
    }
  }, [id_post]);

  const caminhoImagens = post?.post_text
    .split("../../assets")
    .join("https://www.sorvetec.com.br/public/img");

  //Exemplo caminho imagem válido para corpo texto:
  //https://www.sorvetec.com.br/public/img/uploads/gallery/images/2018/04/foto.png

  return (
    <div className={style.container_conteudo}>
      <br />
      <div className={tema.titulo_h2}>{post?.post_title}</div>
      <br />
      <hr />
      <div>{parse(`${caminhoImagens}`)}</div>
      <br />
      <Button variant="contained" size="large" onClick={() => navigate(-1)}>
        ‹ Voltar
      </Button>
    </div>
  );
}
