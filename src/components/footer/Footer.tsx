import { ReactComponent as Logo } from "assets/imagens/logo-sorvetec.svg";
import { ReactComponent as SeloMultivisi } from "assets/imagens/selo-multivisi.svg";
import { Link } from "react-router-dom";
import tema from "theme/Base.module.scss";
import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={style.background}>
      <footer className={tema.container}>
        <div className={style.footer}>
          <div className={style.footer__logos}>
            <Logo />
            <a href="https://www.multivisi.com.br/">
              <SeloMultivisi />
            </a>
          </div>
          <div>
            <p className={style.footer__title}>Fale com a gente</p>
            <p>Televendas:</p>
            <p>
              <b>(34) 3257 0800</b>
            </p>
            <p>
              Segunda a sexta 08h às 19h <br />
              <br /> Sábado das 08h às 12h{" "}
            </p>
          </div>
          <div>
            <p className={style.footer__title}>Mapa do site</p>
            <Link to="/">
              <p>Home</p>
            </Link>
            <Link to="/calculadora">
              <p>Calculadora de lucro</p>
            </Link>
            <Link to="/quem-somos">
              <p>Sobre</p>
            </Link>
            <Link to="/blog">
              <p>Blog</p>
            </Link>
            <Link to="/produtos">
              <p>Máquinas</p>
            </Link>
          </div>
          <div>
            <p className={style.footer__title}>Showrooms</p>
            <p>Uberlândia</p>
            <p>São Paulo</p>
            <p>Belo Horizonte</p>
            <p>Rio de Janeiro</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
