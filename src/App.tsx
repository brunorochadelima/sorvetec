import BotaoFlutuante from "components/BotaoFlutuante";
import Footer from "components/footer/Footer";
import { ReactComponent as IconLoading } from "assets/imagens/icon-loading.svg";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "components/header/Header";
import { lazy, Suspense } from "react";
import { BuscaProvider } from "context/Busca";
import ScrollToTop from "utils/ScrollToTop";
import { isAuthenticated } from "pages/admin/login/auth";

const Home = lazy(() => import("pages/home/Home"));
const Catalogo = lazy(() => import("pages/catalogo/Catalogo"));
const QuemSomos = lazy(() => import("pages/quemSomos/QuemSomos"));
const Pagina404 = lazy(() => import("pages/pagina404/Pagina404"));
const Busca = lazy(() => import("pages/busca/Busca"));
const ProdutoDetalhes = lazy(() =>
  import("pages/produtoDetalhes/ProdutoDetalhes")
);
const Calculadora = lazy(() => import("pages/calculadora/Calculadora"));
const BlogFeed = lazy(() => import("pages/blog/BlogFeed"));
const BlogPost = lazy(() => import("pages/blog/BlogPost"));
const Login = lazy(() => import("pages/admin/login/Login"));


//https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5

function PrivateRoute({ children }:any) {
  const navigate = useNavigate();
  let auth = isAuthenticated();
  return auth ? children : navigate("/login");
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
            <Route path="/calculadora" element={<Calculadora />} />
            <Route path="/busca" element={<Busca />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/blog" element={<BlogFeed />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="*" element={<Pagina404 />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <Catalogo />
                </PrivateRoute>
              }
            />

          </Routes>
          <Footer />
        </Suspense>
        <BotaoFlutuante />
      </BuscaProvider>
    </BrowserRouter>
  );
}

export default App;
