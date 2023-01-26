import { IBlogs } from "interfaces/IBlogs";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import tema from "theme/Base.module.scss";
import style from "./BlogPost.module.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiBlog from "api/apiBlog";
import { Helmet } from "react-helmet-async";
import { ReactComponent as IconLoading } from "assets/imagens/icon-loading.svg";

export default function BlogPost() {
  const { post_url } = useParams();
  const [post, setPost] = useState<IBlogs>();
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    try {
      apiBlog.get(`api/posts?url=${post_url}`).then((response) => {
        console.log(response.data.data[0]);
        setPost(response.data.data[0]);
        setLoad(false);

        if (!response.data.data[0]) {
          window.location.href = "/laravel/public/404";
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [post_url]);

  const caminho_texto_imagens = post?.post_text
    .split("../../assets")
    .join("https://www.sorvetec.com.br/public/img");

  const metaDescription = post?.post_meta_description;

  const caminhoImagemCover =
    post?.post_cover.substring(0, 11) === "posts_cover"
      ? `https://sorvetec.com.br/laravel/public/storage/${post?.post_cover}`
      : `https://sorvetec.com.br/public/img/uploads/${post?.post_cover}`;

  //Exemplo caminho imagem válido para corpo texto:
  //https://www.sorvetec.com.br/public/img/uploads/gallery/images/2018/04/foto.png

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post?.post_title,
    author: {
      "@type": "Organization",
      name: "Sorvetec",
      url: "https://www.sorvetec.com.br"
    },
    datePublished: post?.created_at,
    image: {
      "@type": "ImageObject",
      url: caminhoImagemCover,
      width: 280,
      height: 203,
    },
    articleBody: caminho_texto_imagens,
    articleSection: "Máquinas de sorvete",
    keywords: "sorvete, sorvetec, máquinas de sorvete",
    url: `https://www.sorvetec.com.br/blog/${post_url}`
  };

  return (
    <>
      <Helmet>
        {/* Google tags */}
        <title>{post?.post_title}</title>
        <meta name="description" content={metaDescription} />
        <link
          rel="canonical"
          href={`https://www.sorvetec.com.br/blog/${post_url}`}
        />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <article className={style.container_conteudo}>
        {load && (
          <div style={{ height: "100vh" }}>
            <IconLoading />
          </div>
        )}
        <br />
        <h1 className={tema.titulo_h2}>{post?.post_title}</h1>
        <br />
        <hr />
        <div>{parse(`${caminho_texto_imagens}`)}</div>
        <br />
        <Button variant="contained" size="large" onClick={() => navigate(-1)}>
          ‹ Voltar
        </Button>
      </article>
    </>
  );
}
