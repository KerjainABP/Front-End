import React, { useEffect, useState } from 'react';
import NavbarLogin from '../../../Component/Navbar/NavbarLogin';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Background from '../../../assets/search.png'
import { TbSearch, TbArrowRight } from 'react-icons/tb';
import CardJob from '../../../Component/Card/CardJob';
import CardSwiper from '../../../Component/Card/CardSwiper';
import EditProfile from '../../../Component/Popup/Profile';
const DashboardUser = () => {
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(['userID']); // Menggunakan array untuk menyediakan daftar kunci-kunci cookie
  const [showDialog, setShowDialog]= useState(false)
  useEffect(() => {
    const userID = cookies.userID;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://kerjain-be-production.up.railway.app/api/user/${userID}`);
        setUserData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userID) {
      fetchData();
    }
  }, [cookies.userID]); // Memperbarui data saat userID berubah

  return (
    <div className='font-popins'>
      {showDialog && (<EditProfile handleDialog={showDialog} setHandleDialog={setShowDialog} />)}
      <NavbarLogin nama={userData?.nama} popUpProfile={()=>setShowDialog(true)} />
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : userData ? (
          <div className='px-[140px] '>
            <div className='w-full lg:mb-14 h-[540px] bg-cover bg-center rounded-3xl flex justify-center items-center px-[300px]' style={{ backgroundImage: `url(${Background})` }}>
              <div className='bg-white w-full h-[150px] flex items-center gap-20 px-8'>
                <div className='flex flex-col items-center gap-5'>
                  <p className='text-[20px]'>Lokasi</p>
                  <input className='w-[300px] text-center outline-none border-none' type="text" placeholder='Cari Lokasi' />
                </div>
                <div className='flex flex-col items-center gap-5'>
                  <p className='text-[20px]'>Tipe</p>
                  <input className='w-[300px] text-center outline-none border-none' type="text" placeholder='Cari Tipe Pekerjaan' />
                </div>
                <div className='flex w-full'>
                  <button className='w-full bg-[#072462] text-white py-3 text-[20px] flex gap-3 items-center justify-center'><TbSearch /> Cari</button>
                </div>
              </div>
            </div>
            <div className='px-5'>
              <div className='flex items-center justify-between mb-7'>
                <h1 className='text-[20px] font-bold'>New Job</h1>
                <button className='font-medium flex items-center gap-3'>Lihat Semua <TbArrowRight /></button>
              </div>
              <div className=''>
                <CardSwiper />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DashboardUser;
