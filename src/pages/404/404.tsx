import React from 'react'
import img404 from 'assets/imagens/erro404.png'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import style from "./404.module.scss"

export default function Pagina404() {

  const navigate = useNavigate()
  
  return (
    <div className={style.container404}>
      <img src={img404} alt="erro 404" />
      <p>Ops! Não encontramos essa página</p>
      <Button
      size="large"
      variant="contained"
      onClick={() => navigate(-1)}
      >‹ Voltar</Button>
      
    </div>
  )
}
