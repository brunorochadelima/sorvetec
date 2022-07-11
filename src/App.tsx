import Footer from "components/footer/Footer";
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
        <Route path="*" element={<Pagina404 />} />
      </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
