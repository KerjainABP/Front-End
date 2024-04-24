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
  const cookie = useCookies()
  const [perusahaan, setPerusahaan] = useState([])
  const [posts, setPosts] = useState([])
  const [kerja, setKerja] = useState(null)

  const searchPT = (perusahaan, post) => {
    const company = perusahaan.filter(item1 => post.some(item2 => item2.id_perusahaan === item1.id));
    let compNames = company.map((item) => item.nama);
    return compNames;
  }

  const getPelamar = (kerja, lowonganId) =>{
    const pelamar = kerja.filter(item1 => item1.id_lowongan === lowonganId)
    
    
    return pelamar.length
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/lowongan/all');
        const perusahaan = await axios.get('http://127.0.0.1:8000/api/user/perusahaan/all')
        const pelamar = await axios.get(`http://127.0.0.1:8000/api/user/allkerja/get`)
        setPosts(response.data);        
        setPerusahaan(perusahaan.data);
        setKerja(pelamar.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
        {posts.map((data) => (
          <SwiperSlide key={data.id}>
            <CardJob 
            id={data.id} 
            pekerjaan={data.nama_posisi} 
            perusahaan={searchPT(perusahaan, [data])} // Ubah posts menjadi [data]
            slot={data.slot_posisi}
            lokasi={data.lokasi}
            pelamar = {getPelamar(kerja, data.id)}
            gajiMin = {data.gaji_dari}
            gajiMax = {data.gaji_hingga}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default CardSwiper