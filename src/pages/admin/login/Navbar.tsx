import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { BiAddToQueue } from "react-icons/bi";
import {
  MdFormatListBulleted,
  MdLogout,
  MdMenu,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { CgList } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "assets/imagens/logo-sorvetec.svg";
import apiBlog from "api/apiBlog";
import { memo, useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  //pega o token
  var token = localStorage.getItem("token");

  function logout() {
    apiBlog
      .get("api/logout", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }

  return (
    <>
      <Box>
        <Box onClick={() => setOpen(!open)} sx={{ py: 1 }}>
          {open === false && <MdMenu size={35} color="#46474B" />}
        </Box>
      </Box>
      <Drawer variant="persistent" open={open}>
        <Box sx={{ display: "flex", justifyContent: "end", pt: 1 }}>
          <MdOutlineArrowBackIosNew size={25} onClick={() => setOpen(false)} />
        </Box>
        <List>
          <ListItem>
            <Logo />
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate("/criar-post")}>
              <ListItemIcon>
                <BiAddToQueue size={25} />
              </ListItemIcon>
              <ListItemText primary={"Criar Post"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate("/listar-posts")}>
              <ListItemIcon>
                <CgList size={25} />
              </ListItemIcon>
              <ListItemText primary={"Lista de Posts"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <MdLogout size={25} />
              </ListItemIcon>
              <ListItemText primary={"Sair"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default memo(Navbar);
