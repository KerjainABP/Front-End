import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import axios from 'axios'
import CardJob from './CardJob';

const CartPopup = ({ handleClose }) => (
    <div className="cart-popup">
        <p>Item berhasil dimasukkan ke keranjang!</p>
        <button onClick={handleClose}>Tutup</button>
    </div>
);
const CardSwiper = () => {
    // const [posts, setPosts] = useState([])
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8080/api/v1/tanaman');
    //             setPosts(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    // const buyProduct = (product) => {
    //     onBuy(product)
    // }
    // return (
    //     <>
    //         <Swiper
    //             breakpoints={{
    //                 320: {
    //                     slidesPerView: 1,
    //                     spaceBetween: 20,
    //                 },

    //                 640: {
    //                     slidesPerView: 3,
    //                     spaceBetween: 40,

    //                 },
    //                 1000: {
    //                     slidesPerView: 5,
    //                     spaceBetween: 20,
    //                 }
    //             }}

    //             navigation={true}
    //             loop={true}
    //             modules={[Navigation]}
    //             className="mySwiper"
    //         >
    //             <SwiperSlide>
    //                 <CardJob/>
    //             </SwiperSlide>
    //             <SwiperSlide>
    //                 <CardJob/>
    //             </SwiperSlide>
    //             <SwiperSlide>
    //                 <CardJob/>
    //             </SwiperSlide>
    //             <SwiperSlide>
    //                 <CardJob/>
    //             </SwiperSlide>
    //             <SwiperSlide>
    //                 <CardJob/>
    //             </SwiperSlide>
    //         </Swiper>
    //     </>
    // )
    return (
        <>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            loop={true}
            modules={[Pagination, Navigation]}
            className="mySwiper h-[300px]  pl-20"
          >
            <SwiperSlide><CardJob/></SwiperSlide>
            <SwiperSlide><CardJob/></SwiperSlide>
            <SwiperSlide><CardJob/></SwiperSlide>
            <SwiperSlide><CardJob/></SwiperSlide>
            <SwiperSlide><CardJob/></SwiperSlide>
            <SwiperSlide><CardJob/></SwiperSlide>
            <SwiperSlide><CardJob/></SwiperSlide>
            <SwiperSlide><CardJob/></SwiperSlide>
            <SwiperSlide><CardJob/></SwiperSlide>
          </Swiper>
        </>
      );
}

export default CardSwiper