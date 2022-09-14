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
import { BiTrash, BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import tema from "theme/Base.module.scss";
import { MdFormatListBulleted } from "react-icons/md";

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
    let text = "Tem certeza de que quer excluir este post? ";
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
        <h1 className={tema.titulo_h2}>
          <MdFormatListBulleted size={40} /> Lista de Posts
        </h1>
      </div>
      <TableContainer component={Paper} sx={{ my: 5 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#F3F4F6" }}>
            <TableRow>
              <TableCell>
                <b>Id</b>
              </TableCell>
              <TableCell>
                <b>Título</b>
              </TableCell>
              <TableCell>
                <b>Editar</b>
              </TableCell>
              <TableCell>
                <b>Excluir</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} hover>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.post_title}</TableCell>
                <TableCell>
                  {
                    <Link to={`/atualizar-post/${post.id}`}>
                      <div>
                        <BiEdit size={30} color="#F280AA" />
                      </div>
                    </Link>
                  }
                </TableCell>
                <TableCell>
                  <BiTrash
                    size={30}
                    color="#E74C3C"
                    onClick={() => excluir(post)}
                  />
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
