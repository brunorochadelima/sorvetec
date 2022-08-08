import BotaoFlutuante from "components/BotaoFlutuante";
import Footer from "components/footer/Footer";
import { ReactComponent as IconLoading } from "assets/imagens/icon-loading.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "components/header/Header";
import { lazy, Suspense } from "react";
import { BuscaProvider } from "context/Busca";
import ScrollToTop from "utils/ScrollToTop";

const Home = lazy(() => import("pages/home/Home"));
const Catalogo = lazy(() => import("pages/catalogo/Catalogo"));
const QuemSomos = lazy(() => import("pages/quemSomos/QuemSomos"));
const Pagina404 = lazy(() => import("pages/pagina404/Pagina404"));
const Busca = lazy(() => import("pages/busca/Busca"));
const ProdutoDetalhes = lazy(() => import("pages/produtoDetalhes/ProdutoDetalhes"));
const Calculadora = lazy(() => import("pages/calculadora/Calculadora"))
const DialogoModal = lazy(() => import("pages/calculadora/DialogoModal"))

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <BuscaProvider>
        <Header />
        <Suspense fallback={<div><IconLoading /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/calculadora" element={<DialogoModal/>} />
            <Route path="/calculadora-lucro" element={<Calculadora />} />
            <Route path="catalogo/:id" element={<ProdutoDetalhes />} />
            <Route path="/busca" element={<Busca />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="*" element={<Pagina404 />} />
          </Routes>
          <Footer />
        </Suspense>
          <BotaoFlutuante />
      </BuscaProvider>
    </BrowserRouter>
  );
}

export default App;
