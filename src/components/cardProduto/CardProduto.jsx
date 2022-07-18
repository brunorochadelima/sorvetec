import style from "./CardProduto.module.scss";
import { useNavigate } from "react-router-dom";

export default function CardProduto(props) {
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
  function estaEmPromocao(props) {
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
  function calculaDesconto() {
    return (
      <div className={style.card__tag_desconto}>
        {(((price - promotional_price) / price) * 100).toFixed(2)}% de desconto
      </div>
    );
  }

  // direciona para detalhes do produto
  function redirecionaParaDetalhes(produtoID) {
    navigate(`/catalogo/${produtoID}`);
  }

  return (
    <div className={style.card} onClick={() => redirecionaParaDetalhes(id)}>
      {promotional_price > 0 && calculaDesconto(props)}

      <img src={ProductImage[0].http} alt="" />
      <h2 className={style.card__nome}>{name}</h2>

      {estaEmPromocao(props)}

      <p>
        ou {payment_option_details[1].plots}X de{" "}
        {payment_option_details[1].value} no cartão
      </p>
    </div>
  );
}
