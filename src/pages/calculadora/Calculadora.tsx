import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import calculadoraSorvetec from "assets/imagens/calculadora-sorvetec.webp";
import tema from "theme/Base.module.scss";
import style from "./Calculadora.module.scss";
import { ReactComponent as BagMoney } from "assets/imagens/bag-money.svg";
import FormRdStation from "components/FormRdStation";

export default function Calculadora() {
  const [precoVenda, setPrecoVenda] = useState<Number>();
  const [custoProducao, setCustoProducao] = useState<Number>(1.06);
  const [casquinhasVendidasMes, setCasquinhasVendidasMes] = useState<Number>();
  const [mostraResultado, setMostraResultado] = useState(false);
  const [modal, setModal] = useState(true);

  function memorizarSessao() {
    localStorage.setItem("myValueInLocalStorage", "false");
  };

  useEffect(() => {
    var storage = localStorage.getItem("myValueInLocalStorage");
    if (storage === "false") {
      setModal(false);
      console.log("ok");
    }
  }, []);

  function exibeModal(): JSX.Element {
    return (
      <Dialog open={modal} maxWidth={"md"}>
        <DialogTitle sx={{ color: "#F280AA", fontWeight: "bold" }}>
          Descubra o quanto poderá lucrar investindo em uma Máquina de Sorvete
          da Sorvetec!
        </DialogTitle>
        <DialogContent onSubmit={memorizarSessao}>
          Insira o seu nome e o melhor e-mail para acessar a nossa Calculadora
          de Lucro, e veja o quanto você pode faturar com as nossas máquinas de
          sorvete.
          <br />
          <br />
          <FormRdStation />
        </DialogContent>
      </Dialog>
    );
  };

  const LucroPorCasquinha = Number(precoVenda) - Number(custoProducao);
  const lucroMensal = Number(casquinhasVendidasMes) * LucroPorCasquinha;

  // converter para R$
  const LucroPorCasquinhaFormatado = Number(LucroPorCasquinha).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );

  // converter para R$
  const lucroMensalFormatado = Number(lucroMensal).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function aoSubmeterForm(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setMostraResultado(true);
  };

  return (
    <section className={tema.container} style={{ minHeight: "100vh" }}>
      {exibeModal()}
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <h1 className={tema.titulo_h2}>Calculadora de lucro Sorvetec</h1>
          <p>
            Simule o quanto você pode lucrar produzindo o seu próprio sorvete.
          </p>

          <Box component="form" onSubmit={aoSubmeterForm}>
            <TextField
              required
              type="text"
              label="Preço de venda"
              onChange={(event) =>
                setPrecoVenda(parseFloat(event.target.value.replace(",", ".")))
              }
              margin="dense"
              fullWidth
            >
              {" "}
            </TextField>
            <TextField
              required
              label="Custo de produção por casquinha"
              defaultValue="1.06"
              onChange={(event) =>
                setCustoProducao(parseFloat(event.target.value))
              }
              margin="dense"
              fullWidth
            ></TextField>
            <TextField
              required
              type="number"
              label="Casquinhas vendidas por mês"
              onChange={(event) =>
                setCasquinhasVendidasMes(parseInt(event.target.value))
              }
              margin="dense"
              fullWidth
            ></TextField>
            <Button
              sx={{ my: 2 }}
              type="submit"
              variant="contained"
              size="large"
              color="secondary"
              disableElevation
              fullWidth
            >
              Calcular
            </Button>
          </Box>

          {mostraResultado && (
            <Box
              className={style.boxResultados}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <BagMoney />
              <div>
                <p>
                  Lucro por casquinha:
                  <span className={style.boxResultados__price}>
                    {" "}
                    {LucroPorCasquinhaFormatado}{" "}
                  </span>
                </p>
                <p>
                  Lucro mensal:{" "}
                  <span className={style.boxResultados__price}>
                    {" "}
                    {lucroMensalFormatado}
                  </span>
                </p>
              </div>
            </Box>
          )}

          <p>
            <strong>AVISO IMPORTANTE:</strong> Não garantimos que a sua empresa
            irá lucrar o mesmo valor apresentado em nossa calculadora. Os
            números mostrados são apenas uma referência com base nas informações
            colhidas.
          </p>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            width={618}
            height={595}
            className={style.img}
            src={calculadoraSorvetec}
            alt="Calculadora de lucro Sorvetec"
          />
        </Grid>
      </Grid>
    </section>
  );
}
