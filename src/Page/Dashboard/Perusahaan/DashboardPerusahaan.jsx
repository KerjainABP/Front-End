import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import EditProfile from '../../../Component/Popup/Profile';
import NavbarLogin from '../../../Component/Navbar/NavbarLogin';

const DashboardPerusahaan = () => {
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cookies] = useCookies(['perusahaanID']); // Menggunakan array untuk menyediakan daftar kunci-kunci cookie
    const [showDialog, setShowDialog]= useState(false)
    useEffect(() => {
      const perusahaanID = cookies.perusahaanID;
  
      const fetchData = async () => {
        try {
        //   const response = await axios.get(`http://127.0.0.1:8000/api/user/${perusahaanID}`);
        //   setUserData(response.data);
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
        <NavbarLogin nama={userData?.nama} popUpProfile={()=>setShowDialog(true)} />
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : userData ? (
            <div className='px-[140px] '>
              sss
            </div>
          ) : null}
        </div>
      </div>
    );
}

export default DashboardPerusahaan