import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import tema from "theme/Base.module.scss";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Container,
  Alert,
} from "@mui/material";
import { EditorTexto } from "./EditorTexto";
import { ICategorias } from "interfaces/ICategorias";
import { IBlogs } from "interfaces/IBlogs";

export default function AtualizaPost() {
  const [post, setPost] = useState<IBlogs>();
  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [categoria, setCategoria] = useState("");
  const [texto, setTexto] = useState("");
  const [respostaApi, setRespostaApi] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  //Captura o id do post pelo parâmetro da url
  const parametros = useParams();

  // busca o post na primeira renderização a partir do parâmetro da url
  useEffect(() => {
    if (parametros.id) {
      axios
        .get(`http://127.0.0.1:8000/api/posts/${parametros.id}`)
        .then((response) => {
          console.log(response);
          setPost(response.data);
          setTitulo(response.data.post_title);
        });
    }
  }, [parametros.id]);

  function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //pega o token
    var token = localStorage.getItem("token");

    axios
      .put(
        `http://127.0.0.1:8000/api/posts/${parametros.id}`,
        {
          post_title: titulo,
          post_text: texto,
          category_id: categoria,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
    axios
      .get("https://www.sorvetec.com.br/laravel/public/api/categories")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  //Alerta erro ou sucesso após clicar no botão Atualizar
  function alert(): JSX.Element {
    if (respostaApi) {
      return <Alert severity="error">{respostaApi}</Alert>;
    } else {
      return <Alert severity="success">Post atualizado!</Alert>;
    }
  }

  return (
    <Container>
      <Navbar />
      <div>
        <h2 className={tema.titulo_h2}>Atualizar Post</h2>
        <Box component="form" onSubmit={aoSubmeterForm}>
          <TextField
            label="Título do post"
            fullWidth
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <Box sx={{my: 3}}>
            <InputLabel id="categoria">Categoria</InputLabel>
            <Select
              sx={{ minWidth: "300px" }}
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

          <EditorTexto
            onBlur={(novoTexto: string) => setTexto(novoTexto)}
            value={post && post.post_text}
          />

          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, my: 4 }}>
            <Button onClick={handleSave} variant="outlined">
              Salvar rascunho
            </Button>

            <Button onClick={loadDoc} variant="outlined">
              Recuperar rascunho
            </Button>

            <Button variant="contained" size="large" type="submit">
              Atualizar post
            </Button>
          </Box>
          <>
            {mostrarAlerta && alert()}
            <br />
          </>
        </Box>
      </div>
    </Container>
  );
}
