import React, { useCallback, useEffect, useState } from "react";
import api from "api/api";
import CardProduto from "components/cardProduto/CardProduto";
import style from "./Catalogo.module.scss";
import tema from "theme/Base.module.scss";
import { ReactComponent as IconLoading } from "assets/imagens/icon-loading.svg";
import { IProdutos } from "interfaces/IProdutos";

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

  // Função alternativa em caso de erro
  // useEffect(() => {
  //   const getProdutos =  async () => {
  //     await api
  //       .get(`web_api/products`, {
  //         params: {
  //           category_id: 421,
  //           available: 1,
  //         },
  //       })
  //       .then((response) => setProdutos(response.data.Products));

  //     setLoading(false); //stop loading when data is fetched
  //   };
  //   getProdutos();
  // }, []);

  const getProdutos = useCallback(async () => {
    try {
      await api
        .get(`web_api/products`, {
          params: {
            category_id: 421,
            available: 1,
          },
        })
        .then((response) => setProdutos(response.data.Products));
    } catch (erro) {
      console.log(erro);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProdutos();
  }, [getProdutos]);

  return (
    <section className={tema.container}>
      {loading && <IconLoading />}
      <div className={style.grid_cards}>
        {produtos.map((produto) => (
          <div key={produto.Product.id}>
            <CardProduto {...produto} />
          </div>
        ))}
      </div>
    </section>
  );
}

//https://www.multivisi.com.br/web_api/products?page=7
