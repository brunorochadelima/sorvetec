import axios from "axios";
import React, { useCallback } from "react";
import { IBlogs } from "interfaces/IBlogs";
import CardBlog from "components/cardBlog/CardBlog";
import { ReactComponent as IconLoading } from "assets/imagens/icon-loading.svg";
import tema from "theme/Base.module.scss";
import style from "./BlogFeed.module.scss";
import { Box, Button } from "@mui/material";
import capaBlog from "assets/imagens/capa-blog.webp";
import capaBlogMobile from "assets/imagens/capa-blog-mobile.webp";
import apiBlog from "api/apiBlog";
import { Helmet } from "react-helmet-async";

export default function BlogFeed() {
  const [blogs, setBlogs] = React.useState<IBlogs[]>([]);
  const [loading, setLoading] = React.useState<Boolean>(true);
  const [proximaPagina, setProximaPagina] = React.useState("");

  //dados paginação da api
  const [to, setTo] = React.useState<Number>(0);
  const [total, setTotal] = React.useState<Number>(1);

  function verMais() {
    setLoading(true);
    axios.get(proximaPagina).then((response) => {
      setBlogs([...blogs, ...response.data.data]);
      setProximaPagina(response.data.next_page_url);
      setTo(response.data.to);
      setTotal(response.data.total);
      setLoading(false);
    });
  }

  // function verMais() {
  //   setProximaPagina(proximaPagina + 8);
  // }

  const getBlogs = useCallback(async () => {
    setLoading(true);
    try {
      await apiBlog.get(`api/posts`).then((response) => {
        setBlogs(response.data.data);
        setProximaPagina(response.data.next_page_url);
      });
    } catch (erro) {
      console.log(erro);
    } finally {
      setLoading(false);
    }
  }, []);

  // const getBlogs = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     await axios
  //       .get(
  //         `https://api.sorvetec.com.br/api/v1/posts/offset=0/limit=${proximaPagina}`
  //       )
  //       .then((response) => {
  //         setBlogs(response.data);
  //       });
  //   } catch (erro) {
  //     console.log(erro);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [proximaPagina]);

  React.useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <>
      <Helmet>
        {/* Google tags */}
        <title>Blog da Sorvetec</title>
        <meta
          name="description"
          content="Em nossa página de blog você tira dúvidas, recebe dicas e fica por dentro de tudo o que acontece, não só no mercado de sorvete, mas também de outras delícias geladas."
        />
        <link rel="canonical" href={`/blog`} />
      </Helmet>
      <picture className={style.picture}>
        <source
          width="1920"
          height="490"
          srcSet={capaBlog}
          media="(min-width: 800px)"
        />
        <img
          width="400"
          height="296"
          src={capaBlogMobile}
          alt="oferta máquinas sorvete sorvetec"
          loading="eager"
        />
      </picture>

      <section className={tema.container}>
        {loading && <IconLoading />}
        <div className={style.grid_cards}>
          {blogs.map((blog) => (
            <div key={blog.id}>
              <CardBlog {...blog} />
            </div>
          ))}
        </div>
        {loading && <IconLoading />}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button
            size="large"
            variant="contained"
            onClick={verMais}
            disabled={to >= total}
          >
            + Ver mais
          </Button>
        </Box>
      </section>
    </>
  );
}
