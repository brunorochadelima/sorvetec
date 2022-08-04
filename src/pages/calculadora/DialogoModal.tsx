import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import FormRdStation from "components/FormRdStation";
import React, { useEffect } from "react";
import style from "./DialogoModal.module.scss";

export default function DialogoModal() {
  const [open, setOpen] = React.useState(false);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div className={style.body}>
      <Dialog open={open} maxWidth={"md"} >
        <DialogTitle sx={{ color: "#F280AA", fontWeight: "bold" }}>
          Descubra o quanto poderá lucrar investindo em uma Máquina de Sorvete
          da Sorvetec!
        </DialogTitle>
        <DialogContent>
          Insira o seu nome e o melhor e-mail para acessar a nossa Calculadora
          de Lucro, e veja o quanto você pode faturar com as nossas máquinas de
          sorvete.
          <br />
          <br />
          <FormRdStation />
        </DialogContent>
      </Dialog>
    </div>
  );
}
