import tema from "theme/Tema.module.scss";
import maquinasSorvetec from "assets/imagens/maquinas-sorvetec-home.png";
import style from "pages/home/Home.module.scss";
import sorveteExpresso from "assets/imagens/sorvete-expresso.png";
import sorveteChapa from "assets/imagens/sorvete-chapa.png";
import acai from "assets/imagens/acai.png";
import Button from "@mui/material/Button";
import { lazy, Suspense } from "react";
import IntegratedForm from "components/FormRdStation";
import Footer from "components/footer/Footer";
import SliderDepoimento from "./sliders/SliderDepoimento";
import BotaoFlutuante from "components/BotaoFlutuante";
//const SliderDepoimento = lazy(() => import("./sliders/SliderDepoimento"));


export default function Home() {
  return (
    <>
      <div className={tema.container}>
        <div className={style.grid_container}>
          <div>
            <h1>Empreenda com a Sorvetec</h1>
            <p>
            A hora de se tornar dono(a) do seu próprio negócio finalmente chegou! 
            </p>
          </div>
          <div>
            <img src={maquinasSorvetec} alt="máquinas de sorvete sorvetec" />
          </div>
        </div>
      </div>
      {/* Ondas decorativas */}
      <div className={style.waves}></div>

      {/* Tipos de sorvete  */}
      <div style={{ backgroundColor: "#FFE5D0" }}>
        <div className={tema.container}>
          <div className={style.titulo_centralizado}>
            <h2 style={{ marginTop: 0, paddingTop: 20 }}>
              Lucre com diversos tipos de sorvete
            </h2>
            <p>
            As nossas máquinas possibilitam a variedade de cadárpio que a sua empresa precisa
            </p>
          </div>

          <div className={style.tipos_sorvete__item}>
            <img src={sorveteExpresso} alt="sorvete expresso" />
            <div>
              <h3>Sorvete expresso</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Facilisi morbi sit consectetur elit.
              </p>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                disableElevation
              >
                Conheça as máquinas
              </Button>
            </div>
          </div>

          <div className={style["tipos_sorvete__item--meio"]}>
            <div>
              <h3>Sorvete na chapa</h3>
              <p>
              Use a sua imaginação e crie sabores incríveis de sorvete na chapa para conquistar o seu cliente.
              </p>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                disableElevation
              >
                Conheça as máquinas
              </Button>
            </div>
            <img src={sorveteChapa} alt="sorvete na chapa" />
          </div>

          <div className={style.tipos_sorvete__item}>
            <img src={acai} alt="sorvete expresso" />
            <div>
              <h3>Açaí expresso</h3>
              <p>
              Fature bastante produzindo o seu próprio açaí expresso
              </p>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                disableElevation
              >
                Conheça as máquinas
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={style["waves--reverse"]}></div>
      <div className={style.titulo_centralizado}>
        <h2>O que nossos clientes dizem?</h2>
        <p>
        Confira os depoimentos de pessoas que acreditaram na qualidade de nossas máquinas e se tornaram empreendedores de sucesso.
        </p>
      </div>
      <SliderDepoimento />
      <br />
      <br />
      <IntegratedForm />
      <br />
      <br />
       <BotaoFlutuante/>
    </>
  );
}
