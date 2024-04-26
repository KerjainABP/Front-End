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
import { useCookies } from 'react-cookie';

const CardSwiper = () => {
  const [cookies] = useCookies(['userID']);
  const [perusahaan, setPerusahaan] = useState([])
  const [posts, setPosts] = useState([])
  const [kerja, setKerja] = useState(null)
  const [isApplied, setIsApplied] = useState(null)

  const searchPT = (perusahaan, post) => {
    const company = perusahaan.filter(item1 => post.some(item2 => item2.id_perusahaan === item1.id));
    let compNames = company.map((item) => item.nama);
    return compNames;
  }

  const getPelamar = (kerja, lowonganId) => {
    const pelamar = kerja.filter(item1 => item1.id_lowongan === lowonganId)
    return pelamar.length
  }

  useEffect(() => {
    const userID = cookies.userID;
    const fetchData = async () => {
      try {

        const response = await axios.get('https://kerjainbe-production.up.railway.app/api/user/lowongan/all');
        const perusahaan = await axios.get('https://kerjainbe-production.up.railway.app/api/user/perusahaan/all')
        const kerjas = await axios.get(`https://kerjainbe-production.up.railway.app/api/user/allkerja/get`)
        setPosts(response.data);
        setPerusahaan(perusahaan.data);
        setKerja(kerjas.data)
        setIsApplied(kerjas.data.find(item => item.id_user === userID && item.status !== 'selesai'))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,

          },

          640: {
            slidesPerView: 2,
            spaceBetween: 40,


          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 20,

          }
        }}

        pagination={{
          clickable: true,
        }}
        navigation={window.innerWidth > 1000 ? true : false}
        loop={true}
        modules={[Pagination, Navigation]}
        className="mySwiper h-[400px] xl:h-[300px] xl:pl-20"
      >
        {posts.map((data) => (
          <SwiperSlide key={data.id}>
            {isApplied !== null ? (
              <CardJob
                id={data.id}
                pekerjaan={data.nama_posisi}
                perusahaan={searchPT(perusahaan, [data])}
                slot={data.slot_posisi}
                lokasi={data.lokasi}
                pelamar={getPelamar(kerja, data.id)}
                gajiMin={data.gaji_dari}
                gajiMax={data.gaji_hingga}
              />
            ) : null}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default CardSwiper

