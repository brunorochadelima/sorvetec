import tema from "theme/Base.module.scss";
import maquinasSorvetec from "assets/imagens/maquinas-sorvetec-home.webp";
import style from "pages/home/Home.module.scss";
import sorveteExpresso from "assets/imagens/sorvete-expresso.webp";
import sorveteChapa from "assets/imagens/sorvete-chapa.webp";
import acai from "assets/imagens/acai.webp";
import Button from "@mui/material/Button";
// import IntegratedForm from "components/FormRdStation";
import { lazy } from "react";
// import SliderDepoimento from "./sliders/SliderDepoimento";
const SliderDepoimento = lazy(() => import("./sliders/SliderDepoimento"));
const IntegratedForm = lazy(() => import("components/FormRdStation"));

export default function Home() {
  return (
    <main>
      <section className={tema.container}>
        <div className={style.grid_container}>
          <div>
            <h1 className={tema.titulo_h1}>Empreenda com a Sorvetec</h1>
            <p>
              A hora de realizar o sonho de abrir a sua própria empresa
              finalmente chegou!
            </p>
          </div>
          <div>
            <img src={maquinasSorvetec} alt="máquinas de sorvete sorvetec" />
          </div>
        </div>
      </section>

      {/* Ondas decorativas */}
      <div className={style.waves}></div>

      {/* Tipos de sorvete  */}
      <section style={{ backgroundColor: "#FFE5D0" }}>
        <div className={tema.container}>
          <div className={style.titulo_centralizado}>
            <h2
              className={tema.titulo_h2}
              style={{ marginTop: 0, paddingTop: 20 }}
            >
              Lucre com diversos tipos de sorvete
            </h2>
            <p>
              As nossas máquinas possibilitam a variedade de cadárpio que a sua
              empresa precisa
            </p>
          </div>

          <div className={style.tipos_sorvete__item}>
            <img loading="lazy" src={sorveteExpresso} alt="sorvete expresso" />
            <div>
              <h3 className={tema.titulo_h3}>Sorvete expresso</h3>
              <p>
                A sobremesa gelada preferida dos seus clientes, pois além de
                super barata, fica pronta em instantes e é uma delícia.
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
              <h3 className={tema.titulo_h3}>Sorvete na chapa</h3>
              <p>
                Use a sua imaginação e crie sabores incríveis de sorvete na
                chapa para conquistar o seu cliente.
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
            <img loading="lazy" src={sorveteChapa} alt="sorvete na chapa" />
          </div>

          <div className={style.tipos_sorvete__item}>
            <img loading="lazy" src={acai} alt="sorvete expresso" />
            <div>
              <h3 className={tema.titulo_h3}>Açaí expresso</h3>
              <p>Fature bastante produzindo o seu próprio açaí expresso</p>
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
      </section>
      <div className={style["waves--reverse"]}></div>

      {/* Depoimentos */}
      <section>
        <div className={style.titulo_centralizado}>
          <h2 className={tema.titulo_h2}>O que nossos clientes dizem?</h2>
          <p>
            Confira os depoimentos de pessoas que acreditaram na qualidade de
            nossas máquinas e se tornaram empreendedores de sucesso.
          </p>
        </div>
        <SliderDepoimento />
      </section>

      {/* Formulário RdStation */}
      <br />
      <br />
      <div style={{ backgroundColor: "#FFC048" }}>
        <div className={tema.container}>
          <IntegratedForm />
        </div>
      </div>
    </main>
  );
}
