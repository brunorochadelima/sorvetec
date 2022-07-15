import { AppBar, Box, Container, IconButton, InputBase, MenuItem, Paper, Toolbar } from '@mui/material'
import { ReactComponent as Logo } from "assets/imagens/logo-sorvetec.svg";
import { FiSearch } from 'react-icons/fi';
import React from 'react'

export default function Header() {

  var largura = window.screen.availWidth

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{margin: 0}}>
      <Container maxWidth="xl">
        <Toolbar sx={{py: 2, display: 'flex', flexWrap: 'wrap' }}>
         <Logo/>
         <Box sx={{ justifyContent: 'center', flexGrow: 1, color: 'white', display: { xs: 'none', lg: 'flex' } }} >
         <MenuItem>Início</MenuItem>
         <MenuItem>Calculadora de lucro</MenuItem>
         <MenuItem>Blog</MenuItem>
         <MenuItem>Sobre</MenuItem>
         <MenuItem>Máquinas</MenuItem>
         </Box>

         <Paper sx={{ display: 'flex', flexWrap: 'noWrap', mt:{xs: 2}}}>
         <InputBase sx={{ ml: 1, backgroundColor: 'white', px: 2, py: 1, borderRadius: 2 }} placeholder="O que você procura?"
         inputProps={{ 'aria-label': 'O que você está procurando?' }}
         />
         <IconButton sx={{px: 3}} type="submit" aria-label="search"><FiSearch /></IconButton>
         </Paper>
      
        
        </Toolbar>
      </Container>
      </AppBar>
    </Box>
  )
}

// https://mui.com/pt/system/properties/