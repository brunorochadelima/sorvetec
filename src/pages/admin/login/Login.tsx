import tema from "theme/Base.module.scss";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  // Criar função pra ver se o usuário esta autenticado dentro de um compoente separado auth
  // Guardar o token no local storage
  // Criar componente PrivateRoute que retorna <Route/>

  function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post("https://www.sorvetec.com.br/laravel/public/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.plainTextToken);
      })
      .catch((error) => {
        console.log(error);
        setErro(error.response.data);
      });
  }

  return (
    <div style={{ backgroundColor: "#F3F4F6" }}>
      <div className={tema.container}>
        <Box sx={{ display: "grid", placeItems: "center", height: "100vh" }}>
          <Paper sx={{ width: { md: "430px" } }}>
            <Box sx={{ p: 4 }}>
              <p className={tema.titulo_h2}>
                <b>BLOG </b>ADMIN
              </p>
              <h2>Entrar</h2>
              <p>Digite seu e-mail e senha para entrar!</p>
            </Box>

            <Box component="form" onSubmit={aoSubmeterForm} sx={{ px: 2 }}>
              <TextField
                label="Email"
                variant="outlined"
                margin="dense"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Senha"
                variant="outlined"
                margin="dense"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Mensagem erro */}
              <Typography variant="h6" color={"red"}>
                {erro === "Unauthorized" ? "Email e/ou senha inválidos." : ""}
              </Typography>

              <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                sx={{ my: 4 }}
              >
                Entrar
              </Button>
            </Box>
          </Paper>
        </Box>
      </div>
    </div>
  );
}
