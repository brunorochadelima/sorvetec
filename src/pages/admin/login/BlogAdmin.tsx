import {
  Alert,
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import axios from "axios";
import { ICategorias } from "interfaces/ICategorias";
import React, { useEffect, useState } from "react";
import tema from "theme/Base.module.scss"
import { EditorConvertToHTML } from "./EditorTexto";

export default function BlogAdmin() {
  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [categoria, setCategoria] = useState("");
  const [texto, setText] = useState("");
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
    formData.append("post_title", titulo);
    formData.append("category_id", categoria);
    formData.append("post_text", texto);
    if (imagem) {
      formData.append("post_cover", imagem);
    }

    // Cria post
    axios
      .request({
        url: "http://127.0.0.1:8000/api/posts/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then((response) => {
        console.log(response);
        setRespostaApi("")
      })
      .catch((error) => {
        console.log(error);
        setRespostaApi(error.response.data.message);
      })
      .finally(() => {
        setMostrarAlerta(true);
      });
  }

  //Pegar a lista de categgorias na api
  useEffect(() => {
    axios
      .get("https://www.sorvetec.com.br/laravel/public/api/categories")
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

  return (
    <Container>
      <div>
        <h2 className={tema.titulo_h2}>Criar Postagem</h2>
        <Box component="form" onSubmit={aoSubmeterForm}>
          <TextField
            label="Titulo do post"
            fullWidth
            onChange={(e) => setTitulo(e.target.value)}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", my: 4 }}>
            <Box sx={{ width: "50%" }}>
              <InputLabel id="categoria">Categoria</InputLabel>
              <Select
                sx={{ minWidth: "250px" }}
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
              <InputLabel id="imagem_capa">Imagem capa</InputLabel>
              <TextField type="file" onChange={selecionarImagem} />
            </Box>
          </Box>


          <TextareaAutosize
              aria-label="Escreva aqui o conteúdo do post"
              minRows={15}
              placeholder="Escreva aqui o conteúdo do post..."
              style={{ width: '100%' }}

            onChange={(e) => setText(e.target.value)}
          />

          <Button sx={{my: 4}} variant="contained" size="large" type="submit">
            Criar post
          </Button>

          {mostrarAlerta && alert()}
          <br/>
        </Box>

      </div>
        <EditorConvertToHTML/>
    </Container>
  );
}
