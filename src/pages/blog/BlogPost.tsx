import { IBlogs } from "interfaces/IBlogs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import tema from "theme/Base.module.scss";
import style from "./BlogPost.module.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiBlog from "api/apiBlog";
import { Helmet } from "react-helmet-async";

export default function BlogPost() {
  const { post_url } = useParams();
  const [post, setPost] = useState<IBlogs>();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      apiBlog.get(`api/posts?url=${post_url}`).then((response) => {
        console.log(response.data.data[0]);
        setPost(response.data.data[0]);

        if (!response.data.data[0]) {
          window.location.href = '/laravel/public/404';
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

  // Adicionando dados estruturados - https://search.google.com/test/rich-results
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.sorvetec.com.br/${post?.post_url}`,
    },

    headline: post?.post_title,
    description: post?.post_meta_description,
    image: caminhoImagemCover,
    datePublished: post?.created_at,
    dateModified: post?.updated_at,

    author: {
      "@type": "Organization",
      name: "Sorvetec",
    },
    publisher: {
      "@type": "Organization",
      name: "Sorvetec",
      url: "https://www.sorvetec.com.br",
      logo: {
        "@type": "ImageObject",
        "url": "https://www.sorvetec.com.br/logo192.png",
        "height" : 192, 
        "width" : 192 
      }
    },

    url: `https://www.sorvetec.com.br/${post?.post_url}`,
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

        {/* Open Graph tags */}
        <meta property="og:site_name" content="Blog da Sorvetec" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post?.post_title} />
        <meta property="og:description" content={metaDescription} />
        <meta
          property="og:url"
          content={`https://www.sorvetec.com.br/blog/${post_url}`}
        />
        <meta property="og:image" content={caminhoImagemCover} />
        <meta property="article:published_time" content={post?.created_at} />
        <meta property="article:modified_time" content={post?.updated_at} />
      </Helmet>

      <article className={style.container_conteudo}>
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
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
