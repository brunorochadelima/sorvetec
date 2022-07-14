import BotaoFlutuante from "components/BotaoFlutuante";
import Footer from "components/footer/Footer";
import ProdutoDetalhes from "pages/produtoDetalhes/ProdutoDetalhes";


import Catalogo from "pages/catalogo/Catalogo";
import Home from "pages/home/Home";
import Pagina404 from "pages/pagina404/Pagina404";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="catalogo/:id" element={<ProdutoDetalhes/>} />
        <Route path="*" element={<Pagina404 />} />
      </Routes>
        <Footer />
        <BotaoFlutuante/>
    </BrowserRouter>
  );
}

export default App;
