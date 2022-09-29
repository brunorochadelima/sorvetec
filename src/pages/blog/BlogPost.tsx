import { IBlogs } from "interfaces/IBlogs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import tema from "theme/Base.module.scss";
import style from "./BlogPost.module.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiBlog from "api/apiBlog";
import { Helmet } from "react-helmet-async";

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<IBlogs>();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      apiBlog.get(`api/posts/${id}`).then((response) => {
        console.log(response.data);
        setPost(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const caminhoImagens = post?.post_text
    .split("../../assets")
    .join("https://www.sorvetec.com.br/public/img");

  //Exemplo caminho imagem válido para corpo texto:
  //https://www.sorvetec.com.br/public/img/uploads/gallery/images/2018/04/foto.png

  return (
    <article className={style.container_conteudo}>
      <Helmet>
        <title>{post?.post_title}</title>
      </Helmet>
      <br />
      <h1 className={tema.titulo_h2}>{post?.post_title}</h1>
      <br />
      <hr />
      <div>{parse(`${caminhoImagens}`)}</div>
      <br />
      <Button variant="contained" size="large" onClick={() => navigate(-1)}>
        ‹ Voltar
      </Button>
    </article>
  );
}
