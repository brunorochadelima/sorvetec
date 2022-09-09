import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F280AA",
      dark: "#e84c81",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFC048",
      dark: "#ffa820",
    },
    success: {
      main: "#7cb342",
      contrastText: "#fff",
    },

    text: {
      primary: "#46474B",
    },
  },

  typography: {
    fontSize: 16,
    fontFamily: "Rubik",
  },

  shape: {
    borderRadius: 20,
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
