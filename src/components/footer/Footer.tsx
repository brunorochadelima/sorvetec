import { ReactComponent as Logo } from "assets/imagens/logo-sorvetec.svg";
import { ReactComponent as SeloMultivisi } from "assets/imagens/selo-multivisi.svg";
import { Link } from "react-router-dom";
import tema from "theme/Base.module.scss";
import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={style.background}>
      <footer className={tema.container}>
        <div className={style.rodape}>
          <div className={style.rodape__logos}>
            <Logo />
            <a href="https://www.multivisi.com.br/">
              <SeloMultivisi />
            </a>
          </div>
          <div>
            <h3>Fale com a gente</h3>
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
            <h3>Mapa do site</h3>
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
            <Link to="/catalogo">
              <p>Máquinas</p>
            </Link>
          </div>
          <div>
            <h3>Showrooms</h3>
            <p>Uberlândia</p>
            <p>São Paulo</p>
            <p>Belo Horizonte</p>
            <p>Recife</p>
            <p>Goiânia</p>
            <p>Porto Alegre</p>
            <p>Rio de Janeiro</p>
            <p>Fortaleza</p>
            <p>Curitiba</p>
            <p>Salvador</p>
            <p>Florianópolis</p>
            <p>Ribeirão Preto</p>
            <p>Brasília</p>
            <p>Campinas</p>
            <p>Cuiabá</p>
            <p>Londrina</p>
            <p>São José Dos Campos</p>
            <p>Sorocaba</p>
            <p>Belém</p>
            <p>Manaus</p>
            <p>Vila Velha</p>
            <p>Campo Grande</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
