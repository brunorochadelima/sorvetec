import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import tema from "theme/Base.module.scss";
import { Container } from "@mui/system";

export default function AtualizaPost() {
  const [post, setPost] = useState({});

  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      axios
        .get(`http://127.0.0.1:8000/api/posts/${parametros.id}`)
        .then((response) => {
          console.log(response);
          setPost(response.data);
        });
    }
  }, [parametros.id]);

  return (
    <Container>
      <Navbar />
      <div>
        <h1 className={tema.titulo_h2}>Atualizar Post</h1>
      </div>
    </Container>
  );
}
