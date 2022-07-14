import api from "api/api";
import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import tema from "theme/Tema.module.scss";
import style from "./ProdutoDetalhes.module.scss";
import FormRdStation from "components/FormRdStation";
import { BsWhatsapp, BsArrowUpRightCircle } from "react-icons/bs";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [productImage, setProductImage] = useState<any[]>([]);

  useEffect(() => {
    api.get(`web_api/products/${id}`).then((response) => {
      setName(response.data.Product.name);
      setPrice(response.data.Product.price);
      setDescription(response.data.Product.description);
      setProductImage(response.data.Product.ProductImage);
    });
  }, [id]);

  const descriptionHtml = parse(`${description}`);

  // mapeamos o array de objetos productImage e retornabdo apenas uma propriedade de cada item (o https)
  var imagens = productImage.map(function (item, indice) {
    return item.https;
  });

  return (
    <>
      <section className={tema.container}>
        {/* Slider fotos produto */}
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {imagens.map((item, index) => (
            <SwiperSlide key={index}>
              <div>
                <img src={item} alt={name} decoding="async"/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <p>{name}</p>
        <p>{price}</p>
        <div className={style.descricao}>{descriptionHtml}</div>
        <br />
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
