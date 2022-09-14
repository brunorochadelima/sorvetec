import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import { BiAddToQueue } from "react-icons/bi";
import { MdFormatListBulleted, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "assets/imagens/logo-sorvetec.svg";
import apiBlog from "api/apiBlog";

export default function Navbar() {
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
    <Drawer variant="permanent" open={true}>
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
              <MdFormatListBulleted size={25} />
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
  );
}
