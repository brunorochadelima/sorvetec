// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//Container e estilos só para carrosel de videos
import "./sliderDepoimento.css";

// import required modules
import {Pagination, Navigation } from "swiper";

export default function SliderDepoimento() {
  return (
    <>
      <Swiper
        lazy={true}
        preloadImages={false}
        slidesPerView={1}
        cssMode={true}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="container_depoimentos"
      >
        <SwiperSlide>
          <iframe
            className="swiper-lazy"
            loading="lazy"
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/n5o09NbsAIc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </SwiperSlide>

        <SwiperSlide>
          <iframe
            className="swiper-lazy"
            loading="lazy"
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/2QPBXs0_0KM"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </SwiperSlide>

        <SwiperSlide>
          <iframe
            className="swiper-lazy"
            loading="lazy"
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/p_yCYZ6Hw0o"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </SwiperSlide>

      </Swiper>
    </>
  );
}
