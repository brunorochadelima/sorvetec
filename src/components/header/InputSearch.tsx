import { Box, InputAdornment, TextField } from "@mui/material";
import React, { memo } from "react";
import { useContext } from "react";
import { BuscaContext } from "context/Busca";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

function InputSearch() {
  const navigate = useNavigate();

  function redirecionaParaBusca(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    navigate("/busca");
  }

  const { query, setQuery } = useContext(BuscaContext);

  return (
    <Box
      component="form"
      onSubmit={redirecionaParaBusca}
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
  );
}

export default memo(InputSearch);
