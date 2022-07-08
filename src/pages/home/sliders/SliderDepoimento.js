import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//Container e estilos só para carrosel de videos
import "./sliderDepoimento.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

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
        modules={[Autoplay, Pagination, Navigation]}
        className="container"
      >
        <SwiperSlide>
          <iframe className="swiper-lazy"
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/__UWtcN86ck"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </SwiperSlide>

        <SwiperSlide>
          <iframe className="swiper-lazy"
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/__UWtcN86ck"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </SwiperSlide>

        <SwiperSlide>
          <iframe className="swiper-lazy"
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/__UWtcN86ck"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </SwiperSlide>

        <SwiperSlide>
          <iframe className="swiper-lazy"
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/__UWtcN86ck"
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
