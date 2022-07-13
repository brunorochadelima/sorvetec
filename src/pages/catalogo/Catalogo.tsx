import React, { useEffect, useState } from "react";
import api from "api/api";
import CardProduto from "components/cardProduto/CardProduto";
import style from "./Catalogo.module.scss";
import tema from "theme/Tema.module.scss";


interface IProdutos {
  Product: any;
  id: number;
  Products: any;
  dados: any;
}

export default function Catalogo() {
  type Produto = typeof produtos[0];
  const [produtos, setprodutos] = useState<IProdutos[]>([]);


  useEffect(() => {
    api
      .get<IProdutos>("web_api/products", {
        params: {
          category_id: 421,
          available: 1,
        },
      })
      .then((response) => setprodutos(response.data.Products));
  }, []);

  return (
    <div className={tema.container}>
      <div className={style.grid_cards}>
        {produtos.map((produto) => (
          <div
            key={produto.Product.id}
            
          >
            <CardProduto {...produto} />
          </div>
        ))}
      </div>
    </div>
  );
}

//https://www.multivisi.com.br/web_api/products?page=7
