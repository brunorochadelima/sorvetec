import BotaoFlutuante from "components/BotaoFlutuante";
import Footer from "components/footer/Footer";
import ProdutoDetalhes from "pages/produtoDetalhes/ProdutoDetalhes";
import { ReactComponent as IconLoading } from "assets/imagens/icon-loading.svg";

import Home from "pages/home/Home";
import Pagina404 from "pages/pagina404/Pagina404";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "components/header/Header";
import { lazy, Suspense } from "react";
import { BuscaProvider } from "context/Busca";
import Busca from "pages/busca/Busca";

const Catalogo = lazy(() => import("pages/catalogo/Catalogo"));

function App() {
  return (
    <BrowserRouter>
      <BuscaProvider>
        <Header />

        <Suspense
          fallback={
            <div>
              <IconLoading />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="catalogo/:id" element={<ProdutoDetalhes />} />
            <Route path="/busca" element={<Busca />} />
            <Route path="*" element={<Pagina404 />} />
          </Routes>
          <Footer />
          <BotaoFlutuante />
        </Suspense>
      </BuscaProvider>
    </BrowserRouter>
  );
}

export default App;
