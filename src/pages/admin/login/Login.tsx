import tema from "theme/Base.module.scss";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "./auth";
import apiBlog from "api/apiBlog";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  //se tiver token no local storage, ir direto para o admin
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/criar-post");
    }
  }, [navigate]);

  function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    apiBlog
      .post("api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        sessionStorage.setItem("token", response.data.plainTextToken);
        navigate("/criar-post");
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
                type="password"
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
