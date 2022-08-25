import { Button } from "@mui/material";
import { IBlogs } from "interfaces/IBlogs";
import React from "react";
import parse from "html-react-parser";
import tema from "theme/Base.module.scss";
import style from "./CardBlog.module.scss"

export default function CardBlog(props: IBlogs) {
  const {
    id_post,
    post_title,
    post_cover,
    post_short_text,
    post_text,
    id_category,
  } = props;

  const resume = post_text.substring(0, 120);
  const caminhoImagem = "https://sorvetec.com.br/public/img/uploads/";

  return (
    <div className={style.containerCard}>
      <img src={caminhoImagem + post_cover} alt={post_title} />
      <h2>{post_title}</h2>
      <p> {parse(`${resume} ...`)}</p>
      <Button variant="outlined">Continuar Lendo</Button>
    </div>
  );
}
