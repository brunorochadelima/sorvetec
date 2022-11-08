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
import { TextEditor } from "./TextEditor";
import { ICategorias } from "interfaces/ICategorias";
import { IBlogs } from "interfaces/IBlogs";
import { BiEdit } from "react-icons/bi";
import apiBlog from "api/apiBlog";

export default function UpdatePost() {
  const [post, setPost] = useState<IBlogs>();
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [categoria, setCategoria] = useState("");
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
      });
    }
  }, [parametros.id]);

  function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    apiBlog
      .put(`api/posts/${parametros.id}`, {
        post_title: post?.post_title.replace(/<script>[\s\S]*?<\/script>/, ""),
        post_text: post?.post_text.replace(/<script>[\s\S]*?<\/script>/, ""),
        category_id: categoria,
        post_url: post?.post_url.replace(/<script>[\s\S]*?<\/script>/, ""),
        post_meta_description: post?.post_meta_description.replace(
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

  //Captura evento onChange do input e atualiza o Hook post
  function alterarPost(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let nome = e.target.name;
    let valor = e.target.value;

    if (post !== undefined) {
      setPost({ ...post, [nome]: valor });
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
            focused
            value={post?.post_title}
            name="post_title"
            onChange={alterarPost}
          />

          <TextField
            sx={{ mt: 3 }}
            label="Url"
            placeholder="exemplo-de-url-amigavel"
            helperText="Não incluir espaços vazios, acentos e caraters especiais como #, *, @, etc. "
            fullWidth
            focused
            value={post?.post_url}
            name="post_url"
            onChange={alterarPost}
          />
          
          <TextField
            sx={{ mt: 3 }}
            label="Meta Description"
            focused
            fullWidth
            required
            value={post?.post_meta_description}
            multiline
            name="post_meta_description"
            onChange={alterarPost}
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

          <TextEditor
            onBlur={(novoTexto: string) => {
              if (post) {
                setPost({ ...post, post_text: novoTexto });
              }
            }}
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
