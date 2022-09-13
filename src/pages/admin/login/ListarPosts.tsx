import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { IBlogs } from "interfaces/IBlogs";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import tema from "theme/Base.module.scss";

export default function ListarPosts() {
  const [posts, setPosts] = useState<IBlogs[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");

  //pega o token
  var token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/posts")
      .then((response) => {
        setPosts(response.data.data);
        setProximaPagina(response.data.next_page_url);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function carregarDados(url: string) {
    axios
      .get(url)
      .then((response) => {
        setPosts(response.data.data);
        setProximaPagina(response.data.next_page_url);
        setPaginaAnterior(response.data.prev_page_url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function excluir(postAhSerExcluido: IBlogs) {
    let text = "Tem certeza de que quer excluir este post?";
    // eslint-disable-next-line no-restricted-globals
    if (confirm(text) === true) {
      axios
        .delete(`http://127.0.0.1:8000/api/posts/${postAhSerExcluido.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          const listaPosts = posts.filter(
            (post) => post.id !== postAhSerExcluido.id
          );
          setPosts(listaPosts);
        });
    } else {
      text = "Ação cancelada";
    }
  }

  return (
    <Container>
      <Navbar />
      <div>
        <h1 className={tema.titulo_h2}>Lista de Posts</h1>
      </div>
      <TableContainer component={Paper} sx={{ my: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Id</b>
              </TableCell>
              <TableCell>
                <b>Título</b>{" "}
              </TableCell>
              <TableCell>
                <b>Data de criação</b>
              </TableCell>
              <TableCell>
                <b>Data da última alteração</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.post_title}</TableCell>
                <TableCell>{post.created_at}</TableCell>
                <TableCell>{post.updated_at}</TableCell>
                <TableCell>
                  {<Link to={`/atualizar-post/${post.id}`}>Editar</Link>}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => excluir(post)}
                  >
                    <BiTrash /> Exluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box
          sx={{
            py: 3,
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
            gap: 2,
          }}
        >
          <Button
            size="large"
            variant="outlined"
            disabled={!paginaAnterior}
            onClick={() => carregarDados(paginaAnterior)}
          >
            ❮ Voltar
          </Button>

          <Button
            size="large"
            variant="outlined"
            disabled={!proximaPagina}
            onClick={() => carregarDados(proximaPagina)}
          >
            Avançar ❯
          </Button>
        </Box>
      </TableContainer>
    </Container>
  );
}
