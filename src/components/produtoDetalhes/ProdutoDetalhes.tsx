import api from "api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import tema from "theme/Tema.module.scss";
import style from "./ProdutoDetalhes.module.scss";
import FormRdStation from "components/FormRdStation";
import { BsWhatsapp, BsArrowUpRightCircle } from "react-icons/bs";

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    api.get(`web_api/products/${id}`).then((response) => {
      setName(response.data.Product.name);
      setPrice(response.data.Product.price);
      setDescription(response.data.Product.description);
    });
  }, [id]);

  const descriptionHtml = parse(`${description}`);

  return (
    <>
      <section className={tema.container}>
        <p>{name}</p>
        <p>{price}</p>
        <div className={style.descricao}>{descriptionHtml}</div>
        <br />
        <div className= {style.box_whatsapp}>
          <h3>Ficou com alguma dúvida sobre o produto?</h3>
          <a href="https://api.whatsapp.com/send?phone=553432570800&text=Ol%C3%A1%20Multivisi" target="_blank" rel="noreferrer">
          <p>
            <BsWhatsapp /> Chame a gente agora no WhatsApp
          </p></a>
        </div>
      </section>
      <FormRdStation />
    </>
  );
}
