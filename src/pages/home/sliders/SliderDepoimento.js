// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "@justinribeiro/lite-youtube";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//Container e estilos só para carrosel de videos
import "./sliderDepoimento.css";

// import required modules
import { Pagination, Navigation } from "swiper";

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
          <lite-youtube videoid="n5o09NbsAIc"></lite-youtube>
        </SwiperSlide>

        <SwiperSlide>
          <lite-youtube videoid="2QPBXs0_0KM"></lite-youtube>
        </SwiperSlide>

        <SwiperSlide>
          <lite-youtube videoid="p_yCYZ6Hw0o"></lite-youtube>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
