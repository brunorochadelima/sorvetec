import style from "./CardProduto.module.scss";

export default function CardProduto(props) {
  //função verifica se produto está com desconto para fazer a rendericação condicional
  function estaEmPromocao(props) {
    if (props.Product.promotional_price > 0) {
      return (
        <>
          <p className={style.card__precoDe}>De: R${props.Product.price}</p>
          <p className={style.card__precoPor}>
            Por:{" "}
            <span>
              R$
              {Number(props.Product.promotional_price) > 0
                ? props.Product.promotional_price
                : " "}
            </span>
          </p>
        </>
      );
    }
    return (
      <p className={style.card__precoPor}>
        R$ <span>{props.Product.price}</span>{" "}
      </p>
    );
  }

  function calculaDesconto(props) {
    return (
      <div className={style.card__tag_desconto}> -
      {(((props.Product.price - props.Product.promotional_price) /
        props.Product.price) *
      100).toFixed(2)}%
      </div>
    );
  }

  return (
    <div className={style.card}>
      {props.Product.promotional_price > 0 && calculaDesconto(props)}

      <img src={props.Product.ProductImage[0].http} alt="" />
      {/* <p>ID: {props.Product.id}</p> */}
      <h2 className={style.card__nome}>{props.Product.name}</h2>

      {estaEmPromocao(props)}

      <p>
        ou {props.Product.payment_option_details[2].plots}X de{" "}
        {props.Product.payment_option_details[2].value} à vista no cartão
      </p>
    </div>
  );
}
