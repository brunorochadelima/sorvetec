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
import UrlDecoder from "utils/UrlDecoder";

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

  const metaDescription = post?.post_text.substring(1, 150);
  // const tituloSemEspaco = post?.post_title.split(" ").join("-");
  //Remove caracters especiais do título

  function titulo() {
    if (post?.post_title !== undefined) {
      const tituloSemEspaco = UrlDecoder(post?.post_title);
      return tituloSemEspaco;
    }
  }

  const caminhoImagem =
    post?.post_cover.substring(0, 11) === "posts_cover"
      ? "https://sorvetec.com.br/laravel/public/storage/"
      : "https://sorvetec.com.br/public/img/uploads/";

  //Exemplo caminho imagem válido para corpo texto:
  //https://www.sorvetec.com.br/public/img/uploads/gallery/images/2018/04/foto.png

  return (
    <>
      <Helmet>
        {/* Google tags */}
        <title>{post?.post_title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`/blog/${id}?title=${titulo()}`} />

        {/* Open Graph tags */}
        <meta property="og:site_name" content="Blog da Sorvetec" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post?.post_title} />
        <meta property="og:description" content={metaDescription} />
        <meta
          property="og:url"
          content={`https://www.sorvetec.com.br/blog/${id}/?title=${titulo()}`}
        />
        <meta property="og:image" content={caminhoImagem + post?.post_cover} />
        <meta property="article:published_time" content={post?.created_at} />
        <meta property="article:modified_time" content={post?.updated_at} />
      </Helmet>

      <article className={style.container_conteudo}>
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
    </>
  );
}
