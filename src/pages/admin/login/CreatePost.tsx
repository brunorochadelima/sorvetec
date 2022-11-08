import {
  Alert,
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Snackbar,
} from "@mui/material";
import { ICategorias } from "interfaces/ICategorias";
import React, { useEffect, useState } from "react";
import tema from "theme/Base.module.scss";
import { TextEditor } from "./TextEditor";
import Navbar from "./Navbar";
import { BiAddToQueue } from "react-icons/bi";
import apiBlog from "api/apiBlog";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function CreatePost() {
  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [categoria, setCategoria] = useState("");
  const [texto, setTexto] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
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
    formData.append("post_url", url.replace(/<script>[\s\S]*?<\/script>/, ""));
    formData.append(
      "post_meta_description",
      description.replace(/<script>[\s\S]*?<\/script>/, "")
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
          <Alert severity="success">Post criado com sucesso!</Alert>
        </Snackbar>
      );
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
            required
            onChange={(e) => setTitulo(e.target.value)}
          />

          <TextField
            sx={{ mt: 3 }}
            label="Url"
            placeholder="exemplo-de-url-amigavel"
            helperText="Não incluir espaços vazios, acentos e caraters especiais como #, *, @, etc. "
            fullWidth
            required
            onChange={(e) => setUrl(e.target.value)}
          />

          <TextField
            sx={{ mt: 3 }}
            label="Meta Description"
            fullWidth
            required
            multiline
            onChange={(e) => setDescription(e.target.value)}
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
                sx={{ minWidth: 300 }}
                labelId="categoria"
                id="categoria_post"
                value={categoria}
                required
                onChange={(e) => setCategoria(e.target.value)}
              >
                {categorias.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.category}{" "}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* <Box>
              <InputLabel id="imagem_capa">Imagem de capa</InputLabel>
              <TextField
                type="file"
                onChange={selecionarImagem}
                sx={{ width: 600 }}
              />
            </Box> */}

            <Box sx={{ mt: 3 }}>
              <InputLabel htmlFor="upload-photo">
                {imagem && imagem.name}
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  onChange={selecionarImagem}
                />
                <Button
                startIcon={<MdOutlineAddPhotoAlternate size={30}/>}
                  sx={{ m: 2 }}
                  color="primary"
                  component="span"
                  variant="contained"
                  size="large"
                >
                   Upload Imagem de capa
                </Button>
              </InputLabel>
            </Box>
          </Box>

          <TextEditor
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
          <Alerta />
          <br />
        </Box>
      </div>
    </Container>
  );
}
