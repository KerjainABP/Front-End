import React, { useEffect, useState } from 'react';
import NavbarLogin from '../../../Component/Navbar/NavbarLogin';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Background from '../../../assets/search.png'
import { TbSearch, TbArrowRight } from 'react-icons/tb';
import CardJob from '../../../Component/Card/CardJob';
import CardSwiper from '../../../Component/Card/CardSwiper';
import EditProfile from '../../../Component/Popup/Profile';
import LandingPage1 from "../../../assets/landingPage1.png"
import Footer from '../../../Component/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
const DashboardUser = () => {
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(['userID']); // Menggunakan array untuk menyediakan daftar kunci-kunci cookie
  const [showDialog, setShowDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const userID = cookies.userID;

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${userID}`);
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
  const handleSearch = (e) => {
    e.preventDefault();
    // Menggunakan navigate untuk mengalihkan ke listLowongan dengan searchTerm
    navigate(`/lowongan?tipe=${searchTerm}`);
  };

  return (
    <div className='font-popins'>
      {showDialog && (<EditProfile handleDialog={showDialog} setHandleDialog={setShowDialog} />)}
      <NavbarLogin nama={userData?.nama} popUpProfile={() => setShowDialog(true)} />
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
                  <input className='w-[300px] text-center outline-none border-none' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='Cari Tipe Pekerjaan' />
                </div>
                <div className='flex w-full'>
                  <button onClick={handleSearch} className='w-full bg-[#072462] text-white py-3 text-[20px] flex gap-3 items-center justify-center'><TbSearch /> Cari</button>
                </div>
              </div>
            </div>
            <div className='px-5'>
              <div className='flex items-center justify-between mb-7'>
                <h1 className='text-[20px] font-bold'>New Job</h1>
                <Link to={`/lowongan`} className='font-medium flex items-center gap-3'>Lihat Semua <TbArrowRight /></Link>
              </div>
              <div className=''>
                <CardSwiper />
              </div>
            </div>
            <div className='flex flex-row-reverse justify-around items-center lg:mt-[155px] mb-20'>
              <div>
                <h1 className='text-[28px] 2xl:text-[60px] leading-[60px] font-medium 2xl:w-[612px] mb-4'>Temukan Pekerjaan sesuai bidang dan kemampuan kamu</h1>
                <p className=' 2xl:text-[20px] font-light 2xl:w-[600px] mb-10 lg:mb-20'>Temukan pekerjaan yang sesuai dengan Anda di Kerjain. Beragam lowongan dari berbagai bidang menanti. </p>
                
              </div>
              <div className=''>
                <img src={LandingPage1} alt=""  className='w-[568px] h-[368px] rounded-2xl'/>
              </div>
            </div>
            <Footer className={""}/>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DashboardUser;
