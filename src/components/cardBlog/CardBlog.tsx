import { Button } from "@mui/material";
import { IBlogs } from "interfaces/IBlogs";
import React from "react";

export default function CardBlog(props: IBlogs) {
  const {
    id_post,
    post_title,
    post_cover,
    post_short_text,
    post_text,
    id_category,
  } = props;

  const resume = post_text.substring(0, 200);
  const caminhoImagem = "https://sorvetec.com.br/public/img/uploads/";

  return (
    <div>
      <img src={caminhoImagem + post_cover} alt={post_title} />
      <p>{resume}</p>
      <Button variant="outlined">Continuar Lendo</Button>
    </div>
  );
}
