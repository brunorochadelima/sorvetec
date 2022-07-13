import React, { Suspense, useEffect, useState } from "react";
import api from "api/api";
import CardProduto from "components/cardProduto/CardProduto";
import style from "./Catalogo.module.scss";
import tema from "theme/Tema.module.scss";
import { ReactComponent as IconLoading } from "assets/imagens/icon-loading.svg";

interface IProdutos {
  Product: any;
  Products: any;
}

export default function Catalogo() {
  const [produtos, setProdutos] = useState<IProdutos[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Carregar produtos sem icone loading
  // useEffect(() => {
  //   api
  //     .get<IProdutos>("web_api/products", {
  //       params: {
  //         category_id: 421,
  //         available: 1,
  //       },
  //     })
  //     .then((response) => setprodutos(response.data.Products));
  // }, []);

  useEffect(() => {
    const getProdutos = async () => {
      await api
        .get(`web_api/products`, {
          params: {
            category_id: 421,
            available: 1,
          },
        })
        .then((response) => setProdutos(response.data.Products));
        
      setLoading(false); //stop loading when data is fetched
    };
    getProdutos();
  }, []);

  return (
    <div className={tema.container}>
      {loading && <IconLoading />}
      <div className={style.grid_cards}>
        {produtos.map((produto) => (
          <div key={produto.Product.id}>
            <CardProduto {...produto} />
          </div>
        ))}
      </div>
    </div>
  );
}

//https://www.multivisi.com.br/web_api/products?page=7
