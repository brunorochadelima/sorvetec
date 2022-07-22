import React from "react";
import sorvetes from "assets/imagens/sorvetes_sorvetec_quem_somos.webp";
import tema from "theme/_base.module.scss";
import styles from "./QuemSomos.module.scss";

export default function QuemSomos() {
  return (
    <section className={tema.container}>
      <div className={styles.quemsomos}>
        <div className={styles.quemsomos__imagem}>
          <img src={sorvetes} alt="sorvetes sorvetec" />
        </div>
        <div className={styles.quemsomos__textos}>
          <h1 className={tema.titulo_h1}>Quem Somos</h1>
          <p>
            A <b>Sorvetec</b> é uma marca do grupo Multivisi que acredita na
            tecnologia para desenvolver inovações no ramo de sorvetes.
          </p>
          <p>
            Reunimos{" "}
            <b>qualidade, praticidade e usabilidade dos equipamentos,</b> a fim
            de projetar, desenvolver e comercializar máquinas modernas para
            sorvete expresso, na chapa e de massa. Nossos equipamentos possuem
            certificação e aprovação do INMETRO, garantindo a qualidade e
            durabilidade do produto.
          </p>
          <p>
            O nosso principal objetivo é{" "}
            <b> ajudar no sonho de empreender dos nossos clientes.</b> Fazemos
            isso, entregando equipamentos de qualidade e de <b> preço baixo</b>{" "}
            para que os nossos parceiros consigam excelentes resultados com os
            seus negócios.
          </p>
          <p>
            Nossas máquinas possuem uma alta capacidade de produção e o{" "}
            <b> retorno de seu investimento</b> se dá de forma rápida e segura.
          </p>
          <p>
            Elas são as mais econômicas do país, permitindo alta rentabilidade
            com o <b> melhor custo-benefício do mercado.</b> Tudo desenvolvido
            para que você tenha o máximo de eficiência e facilidade em sua
            empresa.
          </p>
        </div>
      </div>
    </section>
  );
}
