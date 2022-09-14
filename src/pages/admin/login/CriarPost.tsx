import {
  Alert,
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ICategorias } from "interfaces/ICategorias";
import React, { useEffect, useState } from "react";
import tema from "theme/Base.module.scss";
import { EditorTexto } from "./EditorTexto";
import Navbar from "./Navbar";
import { BiAddToQueue } from "react-icons/bi";
import apiBlog from "api/apiBlog";

export default function CriarPost() {
  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [categoria, setCategoria] = useState("");
  const [texto, setTexto] = useState("");
  const [respostaApi, setRespostaApi] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  function selecionarImagem(evento: React.ChangeEvent<HTMLInputElement>) {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  }

  function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //pega o token
    var token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append(
      "post_title",
      titulo.replace(/<script>[\s\S]*?<\/script>/, "")
    );
    formData.append("category_id", categoria);
    formData.append(
      "post_text",
      texto.replace(/<script>[\s\S]*?<\/script>/, "")
    );
    if (imagem) {
      formData.append("post_cover", imagem);
    }

    // Cria o post
    apiBlog
      .request({
        url: "api/posts",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then((response) => {
        console.log(response);
        setRespostaApi("");
      })
      .catch((error) => {
        console.log(error);
        setRespostaApi(error.response.data.message);
      })
      .finally(() => {
        setMostrarAlerta(true);
      });
  }

  //Pegar a lista de categorias na api
  useEffect(() => {
    apiBlog
      .get("api/categories")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Alerta erro ou sucesso após clicar no botão Criar
  function alert(): JSX.Element {
    if (respostaApi) {
      return <Alert severity="error">{respostaApi}</Alert>;
    } else {
      return <Alert severity="success">Post criado com sucesso!</Alert>;
    }
  }

  //Salva rascunho
  const handleSave = () => {
    localStorage.setItem("document", texto);
  };

  //Recupera rascunho
  const loadDoc = () => {
    const texto = localStorage.getItem("document");
    if (texto) {
      setTexto(texto);
    }
  };

  return (
    <Container>
      <Navbar />
      <div>
        <h2 className={tema.titulo_h2}>
          <BiAddToQueue size={40} /> Criar Post
        </h2>
        <Box component="form" onSubmit={aoSubmeterForm}>
          <TextField
            label="Título do post"
            fullWidth
            onChange={(e) => setTitulo(e.target.value)}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              my: 4,
              flexWrap: "wrap",
            }}
          >
            <Box>
              <InputLabel id="categoria">Categoria</InputLabel>
              <Select
                sx={{ minWidth: 250 }}
                labelId="categoria"
                id="categoria_post"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                {categorias.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.category}{" "}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box>
              <InputLabel id="imagem_capa">Imagem de capa</InputLabel>
              <TextField
                type="file"
                onChange={selecionarImagem}
                sx={{ width: 600 }}
              />
            </Box>
          </Box>

          <EditorTexto
            onBlur={(novoTexto: string) => setTexto(novoTexto)}
            value={texto}
          />

          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, my: 4 }}>
            <Button onClick={handleSave} variant="outlined">
              Salvar rascunho
            </Button>

            <Button onClick={loadDoc} variant="outlined">
              Recuperar rascunho
            </Button>

            <Button variant="contained" size="large" type="submit">
              Criar post
            </Button>
          </Box>

          {mostrarAlerta && alert()}
          <br />
        </Box>
      </div>
    </Container>
  );
}
