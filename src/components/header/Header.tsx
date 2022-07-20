import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { GrMenu } from "react-icons/gr";
import { ReactComponent as Logo } from "assets/imagens/logo-sorvetec.svg";
import { InputAdornment, TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "api/api";
import { memo, useState } from "react";
import CardProduto from "components/cardProduto/CardProduto";
import styles from "./Header.module.scss";

const pages = [
  {
    name: "Início",
    link: "/",
  },
  {
    name: "Máquinas",
    link: "/catalogo",
  },
  {
    name: "Calculadora de lucro",
    link: "/calculadora",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Sobre",
    link: "/sobre",
  },
];

interface IProdutos {
  Product: any;
  Products: any;
}

function Header() {
  // Pesquisar Produto
  const [produtosFiltrados, setProdutosFiltrados] = useState<IProdutos[]>([]);
  const [query, setQuery] = useState("");
  const [mostarComponente, setMostrarComponente] = useState(false);

  function pesquisaProduto(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    try {
      setMostrarComponente(true);
      api
        .get("web_api/search", {
          params: { category_id: 421, available: 1, query: query },
        })
        .then((response) => setProdutosFiltrados(response.data.Products));
    } catch (erro) {
      console.log(erro);
    }
  }

  function resultadosBusca() {
    if (mostarComponente && query.length > 0) {
      return (
        <>
          <Box sx={{ my: 2 }}>
            <Typography variant="h6" color={"#46474B"} align="center">
              Você buscou por: {query}
            </Typography>
            {produtosFiltrados.length === 0 && (
              <Typography variant="h6" color={"orange"} align="center">
                Ops! Não encontramos nenhum produto com o termo pesquisado
              </Typography>
            )}
          </Box>
          <div className={styles.containerBusca}>
            {produtosFiltrados.map((produto) => (
              <div key={produto.Product.id}>
                <CardProduto {...produto} />
              </div>
            ))}
          </div>
        </>
      );
    }
  }

  // Funções menu
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              py: 1,
              gap: 1,
            }}
          >
            {/* Logo Desktop */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Link to="/"><Logo style={{ padding: "15px" }} /></Link>
            </Box>

            {/* Navegação Mobile */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                {/* <MenuIcon /> */}
                <GrMenu />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <Link
                    to={page.link}
                    key={page.name}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography>
                      <MenuItem onClick={() => setQuery("")}>
                        {page.name}
                      </MenuItem>{" "}
                    </Typography>
                  </Link>
                ))}
              </Menu>
            </Box>

            {/* Logo mobile */}
            <Box sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }}>
             <Link to="/"><Logo /></Link> 
            </Box>

            {/* Lins nav Desktop */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", justifyContent: "center" },
              }}
            >
              {pages.map((page, index) => (
                <Link
                  to={page.link}
                  key={page.name}
                  style={{ textDecoration: "none" }}
                >
                  <Typography sx={{ color: "white" }}>
                    <MenuItem onClick={() => setQuery("")}>
                      {page.name}
                    </MenuItem>{" "}
                  </Typography>
                </Link>
              ))}
            </Box>

            {/* Input Pesquisa */}
            <Box
              component="form"
              onSubmit={pesquisaProduto}
              sx={{ backgroundColor: "white", borderRadius: 2, flexGrow: 1 }}
            >
              <TextField
                placeholder="O que você está procurando?"
                type="search"
                variant="outlined"
                fullWidth
                size="small"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiSearch />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container onClick={() => setMostrarComponente(false)}>
        {resultadosBusca()}
      </Container>
    </>
  );
}

export default memo(Header);

// https://mui.com/pt/system/properties/
