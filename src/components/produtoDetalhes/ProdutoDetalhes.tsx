import api from "api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

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
    <section>
      <p>{name}</p>
      <p>{price}</p>
      {descriptionHtml}
    </section>
  )
}
