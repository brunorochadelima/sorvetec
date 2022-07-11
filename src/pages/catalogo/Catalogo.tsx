import React, { useEffect, useState } from "react";
import api from "api/api";

interface IProdutos {
  Product: any;
  name: string;
}

export default function Catalogo() {
  const [produtos, setprodutos] = useState<IProdutos[]>([]);
  const [pagina, setpagina] = useState()

  useEffect(() => {
    api
      .get("web_api/products", {
        params: {
          category_id: 421,
          available: 1,
        },
      })
      .then((response) => setprodutos(response.data.Products));
  }, []);

  return (
    <div>
      {produtos.map((produto) => (
        <div key={produto.Product.id}>
          <p>ID: {produto.Product.id}</p>
          <p>{produto.Product.name}</p>
          <p>De:  {produto.Product.price}</p>
          <p>Por: {Number(produto.Product.promotional_price) > 0 ? produto.Product.promotional_price : " "}</p>
          <p>ou {produto.Product.payment_option_details[2].plots}X de {produto.Product.payment_option_details[2].value}  à vista no cartão</p>
          <hr />

         {/* <img src={Products.Product.ProductImage[].http} alt="" /> */}
        </div>
      ))}
    </div>
  );
}

//https://www.multivisi.com.br/web_api/products?page=7
{
}
