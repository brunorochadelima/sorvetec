import BotaoFlutuante from "components/BotaoFlutuante";
import Footer from "components/footer/Footer";
import { ReactComponent as IconLoading } from "assets/imagens/icon-loading.svg";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
const ProdutoDetalhes = lazy(
  () => import("pages/produtoDetalhes/ProdutoDetalhes")
);
const Calculadora = lazy(() => import("pages/calculadora/Calculadora"));
const BlogFeed = lazy(() => import("pages/blog/BlogFeed"));
const BlogPost = lazy(() => import("pages/blog/BlogPost"));
const Login = lazy(() => import("pages/admin/login/Login"));
const CriarPost = lazy(() => import("pages/admin/login/CriarPost"));
const ListarPosts = lazy(() => import("pages/admin/login/ListarPosts"));
const AtualizaPost = lazy(() => import("pages/admin/login/AtualizaPost"));

//https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5

//verifica se usuário está logado para exibir rotas privadas
function PrivateRoute({ children }: any) {
  let auth = isAuthenticated();
  return auth ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <BuscaProvider>
        {window.location.pathname === "/login" ||
        window.location.pathname === "/criar-post" ||
        window.location.pathname === "/listar-posts" ||
        window.location.pathname.includes("/atualizar-post") ? null : (<Header />)}
        
        <Suspense fallback={<div><IconLoading /></div>}>
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
              path="/criar-post"
              element={
                <PrivateRoute>
                  <CriarPost />
                </PrivateRoute>
              }
            />

            <Route
              path="/listar-posts"
              element={
                <PrivateRoute>
                  <ListarPosts />
                </PrivateRoute>
              }
            />

            <Route
              path="/atualizar-post/:id"
              element={
                <PrivateRoute>
                  <AtualizaPost />
                </PrivateRoute>
              }
            />
          </Routes>
          {window.location.pathname !== "/login" ? <Footer /> : null}
        </Suspense>
        <BotaoFlutuante />
      </BuscaProvider>
    </BrowserRouter>
  );
}

export default App;
