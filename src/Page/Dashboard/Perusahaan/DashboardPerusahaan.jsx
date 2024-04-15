import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import EditProfile from '../../../Component/Popup/Profile';
import NavbarLogin from '../../../Component/Navbar/NavbarLogin';
import axios from 'axios';
import Background from '../../../assets/search.png'
import { Link } from 'react-router-dom';
const DashboardPerusahaan = () => {
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(['perusahaanID']); // Menggunakan array untuk menyediakan daftar kunci-kunci cookie
  const [showDialog, setShowDialog] = useState(false)
  useEffect(() => {
    const perusahaanID = cookies.perusahaanID;

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/pt/${perusahaanID}`);
        setUserData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (perusahaanID) {
      fetchData();
    }
  }, [cookies.perusahaanID]); // Memperbarui data saat userID berubah

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
            <div className='w-full lg:mb-14 h-[540px] bg-cover bg-center rounded-3xl flex justify-center items-center px-[300px] mb-44' style={{ backgroundImage: `url(${Background})`}}>
              <div className=''>
                  <Link to={`/buatIklan`}>Buat Iklan</Link>
              </div>
            </div>
            <div className=''>
              <h1 className='text-[40px] font-medium'>Iklan Pekerjaan</h1>
              <div>

              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DashboardPerusahaan