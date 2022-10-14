import { Button } from "@mui/material";
import { IBlogs } from "interfaces/IBlogs";
import parse from "html-react-parser";
import style from "./CardBlog.module.scss";
import { useNavigate } from "react-router-dom";

export default function CardBlog(props: IBlogs) {
  const { id, post_title, post_cover, post_text } = props;

  // const tituloSemEspaco = post_title.split(" ").join("-");

  //Remove caracters especiais do título
  const str = post_title;
  const tituloSemEspaco = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/([^\w]+|\s+)/g, "-") // Substitui espaço e outros caracteres por hífen
    .replace(/\-\-+/g, "-") // Substitui multiplos hífens por um único hífen
    .replace(/(^-+|-+$)/, "") // Remove hífens extras do final ou do inicio da string
    .toLowerCase();

  //Redireciona para post
  const navigate = useNavigate();
  function redirecionaParaPost(id: Number) {
    navigate(`/blog/${id}?title=${tituloSemEspaco}`);
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
    <div
      className={style.containerCard}
      onClick={() => redirecionaParaPost(id)}
    >
      <img src={caminhoImagem + post_cover} alt={post_title} />
      <h2>{post_title}</h2>
      <div> {parse(`${resume} ...`)}</div>
      <Button variant="outlined">Continuar Lendo</Button>
    </div>
  );
}
