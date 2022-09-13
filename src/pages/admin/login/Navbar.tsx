import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import { BiAddToQueue } from "react-icons/bi";
import { MdFormatListBulleted } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "assets/imagens/logo-sorvetec.svg";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" open={true}>
      <List>
        <ListItem>
          <Logo />
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/criar-post")}>
            <ListItemIcon>
              <BiAddToQueue />
            </ListItemIcon>
            <ListItemText primary={"Criar Post"} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/listar-posts")}>
            <ListItemIcon>
              <MdFormatListBulleted />
            </ListItemIcon>
            <ListItemText primary={"Listar posts"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
