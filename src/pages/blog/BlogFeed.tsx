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

export default function BlogFeed() {
  const [blogs, setBlogs] = React.useState<IBlogs[]>([]);
  const [loading, setLoading] = React.useState<Boolean>();
  const [proximaPagina, setProximaPagina] = React.useState(8);

  function verMais() {
    setProximaPagina(proximaPagina + 8);
  }

  const getBlogs = useCallback(async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `https://api.sorvetec.com.br/api/v1/posts/offset=0/limit=${proximaPagina}`
        )
        .then((response) => {
          setBlogs(response.data);
        });
    } catch (erro) {
      console.log(erro);
    } finally {
      setLoading(false);
    }
  }, [proximaPagina]);

  React.useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <>
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
            <div key={blog.id_post}>
              <CardBlog {...blog} />
            </div>
          ))}
        </div>
        {loading && <IconLoading />}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Button size="large" variant="contained" onClick={verMais}>
            + Ver mais
          </Button>
        </Box>
      </section>
    </>
  );
}
