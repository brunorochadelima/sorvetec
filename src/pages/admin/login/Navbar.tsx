import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer } from "@mui/material";
import React from "react";
import { BiAddToQueue } from "react-icons/bi";
import { MdFormatListBulleted } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" open={true}>
      <List>
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
