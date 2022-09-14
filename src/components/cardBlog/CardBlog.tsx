import { Button } from "@mui/material";
import { IBlogs } from "interfaces/IBlogs";
import parse from "html-react-parser";
import style from "./CardBlog.module.scss";
import { useNavigate } from "react-router-dom";

export default function CardBlog(props: IBlogs) {
  const { id, post_title, post_cover, post_text } = props;

  const tituloSemEspaco = post_title.split(" ").join("-");

  //Redireciona para post
  const navigate = useNavigate();
  function redirecionaParaPost(id: Number) {
    navigate(`/blog/${id}/?title=${tituloSemEspaco}`);
  }

  const resume = post_text.substring(0, 120);

  // const caminhoImagem = "https://sorvetec.com.br/public/img/uploads/";
  // Se na url da imagem tiver "posts_cover" utilizar caminho do laravel caso contrario usar pasta public
  const caminhoImagem =
    post_cover.substring(0, 11) === "posts_cover"
      ? "http://localhost:8000/storage/"
      : "https://sorvetec.com.br/public/img/uploads/";

  return (
    <div
      className={style.containerCard}
      onClick={() => redirecionaParaPost(id)}
    >
      <img src={caminhoImagem + post_cover} alt={post_title} />
      <h2>{post_title}</h2>
      <div> {parse(`${resume} ...`)}</div>
      <br />
      <Button variant="outlined">Continuar Lendo</Button>
    </div>
  );
}
