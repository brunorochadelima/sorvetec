import { Button } from "@mui/material";
import { IBlogs } from "interfaces/IBlogs";
import parse from "html-react-parser";
import style from "./CardBlog.module.scss";
import { useNavigate } from "react-router-dom";

export default function CardBlog(props: IBlogs) {
  const { post_title, post_cover, post_text, post_url } = props;

  //Redireciona para post
  const navigate = useNavigate();
  function redirecionaParaPost(post_url: string) {
    navigate(`/blog/${post_url}`);
  }

  const resume = post_text.substring(0, 120);

  // const caminhoImagem = "https://sorvetec.com.br/public/img/uploads/";
  // Se na url da imagem tiver "posts_cover" utilizar caminho do laravel caso contrario usar pasta public
  //Ex caminho laravel: https://sorvetec.com.br/laravel/public/storage/
  //Ex caminho local: http://localhost:8000/storage/
  const caminhoImagem =
    post_cover.substring(0, 11) === "posts_cover"
      ? "https://sorvetec.com.br/laravel/public/storage/"
      : "https://sorvetec.com.br/public/img/uploads/";

  return (
    <a
      href={`/blog/${post_url}`}
      onClick={(e) => {
        e.preventDefault();
        redirecionaParaPost(post_url);
      }}
      className={style.containerCard}
    >
      <img src={caminhoImagem + post_cover} alt={post_title} />
      <h2>{post_title}</h2>
      {parse(`${resume} ...`)}
      <Button variant="outlined">Continuar Lendo</Button>
    </a>
  );
}
