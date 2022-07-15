import { AppBar, Box, Container, Toolbar } from '@mui/material'
import { ReactComponent as Logo } from "assets/imagens/logo-sorvetec.svg";
import React from 'react'

export default function Header() {

  var largura = window.screen.availWidth

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{margin: 0}}>
      <Container maxWidth="lg">
        <Toolbar sx={{padding: 2}}><Logo/></Toolbar>
      </Container>
      </AppBar>
    </Box>
  )
}

