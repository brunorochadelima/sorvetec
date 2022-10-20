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
  Snackbar,
} from "@mui/material";
import { EditorTexto } from "./EditorTexto";
import { ICategorias } from "interfaces/ICategorias";
import { IBlogs } from "interfaces/IBlogs";
import { BiEdit } from "react-icons/bi";
import apiBlog from "api/apiBlog";

export default function AtualizaPost() {
  const [post, setPost] = useState<IBlogs>();
  const [titulo, setTitulo] = useState("");
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [categoria, setCategoria] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [texto, setTexto] = useState("");
  const [respostaApi, setRespostaApi] = useState("");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  //Captura o id do post pelo parâmetro da url
  const parametros = useParams();

  // busca o post na primeira renderização a partir do parâmetro da url
  useEffect(() => {
    if (parametros.id) {
      apiBlog.get(`api/posts/${parametros.id}`).then((response) => {
        console.log(response);
        setPost(response.data);
        setTitulo(response.data.post_title);
        setUrl(response.data.post_url);
        setDescription(response.data.post_meta_description);
      });
    }
  }, [parametros.id]);

  function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    apiBlog
      .put(`api/posts/${parametros.id}`, {
        post_title: titulo.replace(/<script>[\s\S]*?<\/script>/, ""),
        post_text: texto.replace(/<script>[\s\S]*?<\/script>/, ""),
        category_id: categoria,
        post_url: url.replace(/<script>[\s\S]*?<\/script>/, ""),
        post_meta_description: description.replace(
          /<script>[\s\S]*?<\/script>/,
          ""
        ),
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

  //Alerta erro ou sucesso após clicar no botão Atualizar
  function Alerta() {
    if (respostaApi) {
      return (
        <Snackbar
          open={mostrarAlerta}
          autoHideDuration={6000}
          onClose={() => setMostrarAlerta(false)}
        >
          <Alert severity="error">{respostaApi}</Alert>
        </Snackbar>
      );
    } else {
      return (
        <Snackbar
          open={mostrarAlerta}
          autoHideDuration={6000}
          onClose={() => setMostrarAlerta(false)}
        >
          <Alert severity="success">Post atualizado!</Alert>
        </Snackbar>
      );
    }
  }

  return (
    <Container>
      <Navbar />
      <div>
        <h2 className={tema.titulo_h2}>
          {" "}
          <BiEdit size={40} /> Atualizar Post
        </h2>
        <Box component="form" onSubmit={aoSubmeterForm}>
          <TextField
            label="Título do post"
            fullWidth
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <TextField
            sx={{ mt: 3 }}
            label="Url"
            placeholder="exemplo-de-url-amigavel"
            helperText="Não incluir espaços vazios, acentos e caraters especiais como #, *, @, etc. "
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <TextField
            sx={{ mt: 3 }}
            label="Meta Description"
            helperText="O Google corta a Meta Description em cerca de 160 caracteres. É preciso que o texto seja menor que isso para aparecer corretamente."
            fullWidth
            required
            value={description}
            multiline
            onChange={(e) => setDescription(e.target.value)}
          />

          <Box sx={{ my: 3 }}>
            <InputLabel id="categoria">Categoria</InputLabel>
            <Select
              sx={{ minWidth: "300px" }}
              labelId="categoria"
              required
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

          <Box sx={{ display: "flex", justifyContent: "end", my: 4 }}>
            <Button variant="contained" size="large" type="submit">
              Atualizar post
            </Button>
          </Box>
            <Alerta />
        </Box>
      </div>
    </Container>
  );
}
