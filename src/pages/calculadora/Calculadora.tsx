import { Box, Button, FormControl, FormGroup, TextField } from "@mui/material";
import React, { useState } from "react";
import calculadoraSorvetec from "assets/imagens/calculadora-sorvetec.webp";

export default function Calculadora() {
  const [precoVenda, setPrecoVenda] = useState<Number>();
  const [custoProducao, setCustoProducao] = useState<Number>(1.06);
  const [casquinhasVendidasMes, setCasquinhasVendidasMes] = useState<Number>();

  const calculaLucroPorCasquinha = Number(precoVenda) - Number(custoProducao);
  const lucroMensal = Number(casquinhasVendidasMes) * calculaLucroPorCasquinha;

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    console.log("ok")
  };
 
  return (
    <section>
      <h1>Calculadora de lucro Sorvetec</h1>
      <p>Simule o quanto você pode lucrar produzindo o seu próprio sorvete.</p>


      <Box component="form" onSubmit={aoSubmeterForm}>
      <TextField
        required
        type="number"
        label="Preço de venda"
        onChange={(event) => setPrecoVenda(parseFloat(event.target.value))}
      >
        {" "}
      </TextField>
      <TextField
        required
        type="number"
        label="Custo de produção por casquinha"
        defaultValue="1.06"
        onChange={(event) => setCustoProducao(parseFloat(event.target.value))}
      ></TextField>
      <TextField required type="number" label="Casquinhas vendidas por mês">
      </TextField>
      <Button type="submit" variant="contained" size="large" fullWidth>
        Calcular
      </Button>
      </Box>

      <Box>
        <p>Lucro por casquinha: R$ ${calculaLucroPorCasquinha} </p>
        <p>Lucro mensal:</p>
      </Box>

      <div>
        <img src={calculadoraSorvetec} alt="Calculadora de lucro Sorvetec" />
      </div>

      <p>
        <strong>AVISO IMPORTANTE:</strong> Não garantimos que a sua empresa irá
        lucrar o mesmo valor apresentado em nossa calculadora. Os números
        mostrados são apenas uma referência com base nas informações colhidas.
      </p>
    </section>
  );
}
