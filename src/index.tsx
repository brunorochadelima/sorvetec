import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F280AA",
      dark: "#e84c81",
    },
    secondary: {
      main: "#FFC048",
      dark: "#ffa820",
    },
  },

  typography: {
    fontSize: 16,
    fontFamily: "Rubik",
  },

  shape: {
    borderRadius: 25,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
