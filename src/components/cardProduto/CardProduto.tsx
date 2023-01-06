import style from "./CardProduto.module.scss";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { IProdutos } from "interfaces/IProdutos";

function CardProduto(props: IProdutos) {
  const navigate = useNavigate();

  // Desestruturação de propriedades
  const {
    Product: {
      price,
      promotional_price,
      name,
      payment_option_details,
      ProductImage,
      id,
      url,
    },
  } = props;

  // converter valores do produto para R$
  const priceDe = Number(price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function pricePor() {
    if ((payment_option_details[0].display_name = "Mercado Pago")) {
      const pricePorNumber = Number(
        payment_option_details[0].value
      ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
      return pricePorNumber;
    }
  }

  const pricePlots = Number(payment_option_details[2].value).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );

  //Função verifica se produto está com desconto para fazer a rendericação condicional dos preços
  function EstaEmPromocao(): JSX.Element {
    if (promotional_price > 0) {
      return (
        <>
          <p className={style.card__precoDe}>{priceDe}</p>
          <p className={style.card__precoPor}>
            <span>{Number(promotional_price) > 0 ? pricePor() : " "}</span>
            <br /> à vista
          </p>
        </>
      );
    }
    return (
      <p className={style.card__precoPor}>
        <span>{pricePor()}</span>
        <br />à vista
      </p>
    );
  }

  // Calcula o desconto em %
  function calculaDesconto(): JSX.Element {
    return (
      <div className={style.card__tag_desconto}>
        {Math.floor(((price - payment_option_details[0].value) / price) * 100)}%
        de desconto
      </div>
    );
  }

  // Direciona para detalhes do produto
  function redirecionaParaDetalhes(produtoID: number): void {
    navigate(
      `/produtos/${produtoID}/${url.https.replace(
        "https://www.multivisi.com.br/",
        ""
      )}`
    );
  }

  return (
    <a
      href={`/produtos/${id}/${url.https.replace(
        "https://www.multivisi.com.br/",
        ""
      )}`}
      onClick={(e) => {
        e.preventDefault();
        redirecionaParaDetalhes(id);
      }}
      className={style.card}
    >
      {promotional_price > 0 && calculaDesconto()}

      <img src={ProductImage[0].thumbs[180].https} alt={name} />
      <h2 className={style.card__nome}>{name}</h2>

      <EstaEmPromocao />

      <p>
        ou {payment_option_details[2].plots}X de {pricePlots} no cartão
      </p>
    </a>
  );
}

export default memo(CardProduto);
