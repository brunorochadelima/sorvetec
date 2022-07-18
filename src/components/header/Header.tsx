import * as React from "react";
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

const pages = [
  {
    name: "Início",
    link: "/",
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
  {
    name: "Máquinas",
    link: "/catalogo",
  },
];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
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
            <Logo style={{ padding: "15px" }} />
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
              {pages.map((page) => (
                <Link to={page.link} style={{ textDecoration: "none" }}>
                  {" "}
                  <Typography>
                    <MenuItem key={page.name}>{page.name}</MenuItem>{" "}
                  </Typography>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* Logo mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }}>
            <Logo />
          </Box>

          {/* Lins nav Desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            {pages.map((page) => (
              <Link to={page.link} style={{ textDecoration: "none" }}>
                <Typography sx={{ color: "white" }}>
                  <MenuItem key={page.name}>{page.name}</MenuItem>{" "}
                </Typography>
              </Link>
            ))}
          </Box>

          {/* Input Pesquisa */}
          <Box sx={{ backgroundColor: "white", borderRadius: 2 }}>
            <TextField
              placeholder="O que você procura?"
              type="search"
              variant="outlined"
              fullWidth
              size="small"
              // onChange={handleSearchFieldOnChange}
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
  );
}

// https://mui.com/pt/system/properties/
