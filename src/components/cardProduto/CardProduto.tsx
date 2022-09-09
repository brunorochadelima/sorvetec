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
    },
  } = props;

  // converter valores do produto para R$
  const priceFormatado = Number(price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const promotional_priceFormatado = Number(promotional_price).toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" }
  );

  //Função verifica se produto está com desconto para fazer a rendericação condicional dos preços
  function estaEmPromocao(): JSX.Element {
    if (promotional_price > 0) {
      return (
        <>
          <p className={style.card__precoDe}>De: {priceFormatado}</p>
          <p className={style.card__precoPor}>
            Por:{" "}
            <span>
              {Number(promotional_price) > 0 ? promotional_priceFormatado : " "}
            </span>
          </p>
        </>
      );
    }
    return (
      <p className={style.card__precoPor}>
        <span>{priceFormatado}</span>
      </p>
    );
  }

  // Calcula o desconto em %
  function calculaDesconto(): JSX.Element {
    return (
      <div className={style.card__tag_desconto}>
        {Math.floor(((price - promotional_price) / price) * 100)}% de desconto
      </div>
    );
  }

  const nomeProdutoSemEspaco = name.split(" ").join("-");

  // Direciona para detalhes do produto
  function redirecionaParaDetalhes(produtoID: number): void {
    navigate(`/catalogo/${produtoID}?${nomeProdutoSemEspaco}`);
  }

  return (
    <div className={style.card} onClick={() => redirecionaParaDetalhes(id)}>
      {promotional_price > 0 && calculaDesconto()}

      <img src={ProductImage[0].thumbs[180].https} alt={name} />
      <h2 className={style.card__nome}>{name}</h2>

      {estaEmPromocao()}

      <p>
        ou {payment_option_details[1].plots}X de{" "}
        {payment_option_details[1].value} no cartão
      </p>
    </div>
  );
}

export default memo(CardProduto);
