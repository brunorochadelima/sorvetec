import api from "api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import tema from "theme/Base.module.scss";
import style from "./ProdutoDetalhes.module.scss";
import { BsWhatsapp } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import Chip from "@mui/material/Chip";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Alert, Button, Snackbar } from "@mui/material";

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [price, setPrice] = useState(" ");
  const [promotional_price, setPromotional_price] = useState();
  const [description, setDescription] = useState();
  const [productImage, setProductImage] = useState<any[]>([]);
  const [payment_option, setPayment_option] = useState();
  const [availability, setAvailability] = useState();
  const [cart_url, setCart_url] = useState("");
  const [avisoEstoque, setAvisoEstoque] = useState(false);

  useEffect(() => {
    api.get(`web_api/products/${id}`).then((response) => {
      setName(response.data.Product.name);
      setPrice(response.data.Product.price);
      setPromotional_price(response.data.Product.promotional_price);
      setDescription(response.data.Product.description);
      setProductImage(response.data.Product.ProductImage);
      setPayment_option(response.data.Product.payment_option_html);
      setAvailability(response.data.Product.availability);
    });
  }, [id]);

  // mapeia o array de objetos productImage e retorna apenas uma propriedade de cada item (o https)
  var imagens = productImage.map(function (item, indice) {
    return item.https;
  });

  // converter valores do produto para R$
  const priceFormatado = Number(price).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const promotional_priceFormatado = Number(promotional_price).toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" }
  );

  //Função verifica se produto está com desconto para fazer a rendericação condicional dos preços
  function estaEmPromocao() {
    if (promotional_price && promotional_price > 0) {
      return (
        <>
          <p className={style.container_produto__price}>{priceFormatado}</p>
          <Chip
            label={`🡻 Economia de R$ ${
              Number(price) - Number(promotional_price)
            },00`}
            color="success"
          />
          <p className={style.container_produto__promocional_price}>
            <span>
              {Number(promotional_price) > 0 ? promotional_priceFormatado : " "}
            </span>
          </p>
        </>
      );
    }
    return (
      <p className={style.container_produto__promocional_price}>
        <span>{priceFormatado}</span>
      </p>
    );
  }

  // Adiciona ao carrinho
  function adicionarProdutoCarrinho() {
    api
      .post("web_api/cart/", {
        Cart: {
          session_id: price,
          product_id: id,
          quantity: 1,
          variant_id: 0,
        },
      })
      .then((response) => {
        setCart_url(response.data.cart_url);
      })
      .catch((error) => {
        console.log(error);
        // setAvisoEstoque(error.response.data.causes[0]);
        setAvisoEstoque(true);
      });
  }

  //Redireciona para checkout quando o hook cart_url recebe a url
  useEffect(() => {
    if (cart_url.length > 0) {
      window.location.href = cart_url;
    }
  }, [cart_url]);

  return (
    <>
      <section className={tema.container}>
        {/* Slider fotos produto */}

        <div className={style.container_produto}>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={false}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={style.mySwiper}
          >
            {imagens.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item} alt={name} decoding="async" />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={style.container_produto__detalhes_produto}>
            <Chip label={availability} />
            <h1 className={tema.titulo_h3}>{name}</h1>
            <p className={style.container_produto__codigo}>CÓD: {id}</p>

            {estaEmPromocao()}

            <p className={style.container_produto__opcoes_pagamento}>
              {parse(`${payment_option}`)}
            </p>

            {/* Aviso estoque baixo */}
            <Snackbar
              open={avisoEstoque}
              autoHideDuration={6000}
              onClose={() => setAvisoEstoque(false)}
              message="Note archived"
            >
              <Alert severity="info">
                Desculpe, pode não haver mais estoque desse produto, entre em
                contato pelo televendas <b>(34) 3257-0800</b>
              </Alert>
            </Snackbar>

            <Button
              onClick={adicionarProdutoCarrinho}
              sx={{
                color: "white",
                width: "70%",
                height: "60px",
                "&:hover": { backgroundColor: "#6fa03b" },
              }}
              color="success"
              variant="contained"
              size="large"
              startIcon={<FiShoppingCart />}
            >
              Comprar
            </Button>
            <p>
              Gostou? Conheça em nosso showroom,{" "}
              <a
                href="https://www.multivisi.com.br/showroom"
                target="_blank"
                rel="noreferrer"
              >
                agende aqui.
              </a>
            </p>
          </div>
        </div>

        {/* Descrição do produto */}
        <div className={style.descricao}>{parse(`${description}`)}</div>
        <br />

        {/* Whatsapp */}
        <div className={style.box_whatsapp}>
          <h3>Ficou com dúvidas? Que tal nos chamar pelo WhatsApp? </h3>
          <a
            href="https://api.whatsapp.com/send?phone=553432570800&text=Ol%C3%A1%20Multivisi"
            target="_blank"
            rel="noreferrer"
          >
            <p>
              <BsWhatsapp /> Entrar em contato pelo WhatsApp
            </p>
          </a>
        </div>
      </section>
    </>
  );
}
