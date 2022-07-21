import { Box, Typography } from "@mui/material";
import api from "api/api";
import CardProduto from "components/cardProduto/CardProduto";
import { BuscaContext } from "context/Busca";
import React, { useContext, useEffect, useState } from "react";
import style from "./Busca.module.scss";
import tema from "theme/Tema.module.scss";

interface IProdutos {
  Product: any;
  Products: any;
}

export default function Busca() {
  const { query, setQuery } = useContext(BuscaContext);
  const [produtosFiltrados, setProdutosFiltrados] = useState<IProdutos[]>([]);

  useEffect(() => {
    try {
      api
        .get("web_api/search", {
          params: { category_id: 421, available: 1, query: query },
        })
        .then((response) => setProdutosFiltrados(response.data.Products));
    } catch (erro) {
      console.log(erro);
    }
  }, [query]);

  return (
    <Box sx={{ my: 2, minHeight: "100vh" }}>
      <Typography variant="h6" color={"#46474B"} align="center">
        Você buscou por: {query}
      </Typography>
      {produtosFiltrados.length === 0 && (
        <Typography variant="h6" color={"orange"} align="center">
          Ops! Não encontramos nenhum produto com o termo pesquisado
        </Typography>
      )}
      <br />
      <div className={tema.container}>
        <div className={style.grid_cards}>
          {produtosFiltrados.map((produto) => (
            <div key={produto.Product.id}>
              <CardProduto {...produto} />
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}
