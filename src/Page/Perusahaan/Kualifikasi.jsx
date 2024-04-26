import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavbarLogin from '../../Component/Navbar/NavbarLogin'
import EditProfile from '../../Component/Popup/Profile'
import { useCookies } from 'react-cookie'
import { TbBuilding, TbMapPin } from "react-icons/tb";
import axios from 'axios'
import Footer from '../../Component/Footer/Footer'

const Kualifikasi = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [kualifikasiData, setKualifikasiData] = useState([])
  const [userData, setUserData] = useState(null);
  const [lowonganData, setLowongan] = useState(null)
  const [perusahaanData, setPerusahaanData] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [cookies] = useCookies(['userID']);
  const searchPT = (perusahaan, post) => {
    const company = perusahaan.filter(item1 => item1.id === post.id_perusahaan);
    let compName
    company.map((item) => {
      compName = item.nama
    })
    return compName
  }
  function formatCurrency(amount) {
    // Mengubah angka menjadi string dan membalikkan string tersebut
    const reversedAmount = String(amount).split('').reverse().join('');

    // Menambahkan titik sebagai pemisah ribuan setiap 3 karakter
    const formattedAmount = reversedAmount.match(/.{1,3}/g).join('.').split('').reverse().join('');

    // Mengembalikan string dengan format mata uang
    return `Rp ${formattedAmount}`;
  }
  useEffect(() => {
    const userID = cookies.userID;
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://kerjainbe-production.up.railway.app/api/user/${userID}`);
        const lowongan = await axios.get(`https://kerjainbe-production.up.railway.app/api/user/lowongan/${id}`);
        const perusahaan = await axios.get('https://kerjainbe-production.up.railway.app/api/user/perusahaan/all');
        setPerusahaanData(perusahaan.data.find(item => item.id === lowongan.data.id_perusahaan)?.nama)
        setLowongan(lowongan.data)
        setUserData(response.data);
        setKualifikasiData(lowongan.data.kualifikasi.split(". "))
      } catch (error) {
        console.error("Gagal memuat data:", error);
      } finally {
        setLoading(false); // Hentikan loading setelah data selesai dimuat atau terjadi error
      }
    };

    if (userID) {
      fetchData();
    }
  }, [cookies.userID]); // Memperbarui data saat userID berubah

  const handleSubmit = async () => {
    try {
      const applyData = {
        id_user: cookies.userID,
        id_lowongan: id,
      };
      const response = await axios.post(`https://kerjainbe-production.up.railway.app/api/user/apply`, applyData);
      if (response.status === 201) {
        alert('Berhasil melamar pekerjaan');
        navigate('/dashboardUser')
      } else {
        alert('Gagal melamar pekerjaan');
      }
    } catch (error) {
      console.error("Gagal melamar pekerjaan:", error);
      alert('Gagal melamar pekerjaan, silakan coba lagi');
    }
  }
  return (
    <div className='font-popins bg-[#E5E5E5] min-h-[100vh] relative'>
      {loading ? (
        <div className='flex justify-center items-center h-[100vh]'>
          <div className='text-[32px] font-bold'>
            Loading...
          </div>
        </div>
      ) : (
        <div>
          {showDialog && (<EditProfile handleDialog={showDialog} setHandleDialog={setShowDialog} />)}
          <NavbarLogin nama={userData?.nama} popUpProfile={() => setShowDialog(true)} />
          <div className='px-5 xl:px-[144px] text-[#051A49] pt-28 md:pt-9 flex max-md:flex-col md:justify-between pb-40'>
            <div className='xl:w-[40vw]'>
              <div className='flex flex-col gap-3'>
                <h1 className='font-bold text-[28px] md:text-[36px]'>{lowonganData?.nama_posisi}</h1>
                <p className='flex items-center text-[20px] md:text-[32px] font-semibold gap-3'><TbBuilding /> {perusahaanData}</p>
                <p className='flex items-center text-[20px] md:text-[32px] font-semibold gap-3'><TbMapPin /> {lowonganData?.lokasi}</p>
                <div className='xl:hidden'>
                  <h1 className='text-[20px] md:text-[32px] font-semibold'>Kontrak</h1>
                  <p className='md:text-[24px]'>{formatCurrency(lowonganData?.gaji_dari)} - {formatCurrency(lowonganData?.gaji_hingga)}</p>
                </div>
              </div>
              <div className='flex flex-col gap-4 mt-14'>
                <h1 className='text-[20px] md:text-[24px] font-semibold'>Kualifikasi dan Pengalaman</h1>
                <ul className='list-disc list-inside flex flex-col gap-2 '>
                  {kualifikasiData.map((item, index) => (
                    <li key={index} className='md:text-[20px]'>{item}</li>

                  ))}
                </ul>

              </div>
              <div className='mt-10'>
                <h1 className='text-[24px] font-semibold'>Deskripsi</h1>
                <p className='md:text-[20px]'>{lowonganData?.deskripsi_pekerjaan}</p>
              </div>
              <div className='xl:hidden'>
                <button className='bg-[#051A49] w-full py-3 text-white rounded-xl' onClick={handleSubmit}>Lamar Kerjaan</button>
              </div>
            </div>
            <div className='flex flex-col justify-between max-xl:hidden'>
              <div className=''>
                <h1 className='text-[32px] font-semibold'>Kontrak</h1>
                <p className='text-[24px]'>{formatCurrency(lowonganData?.gaji_dari)} - {formatCurrency(lowonganData?.gaji_hingga)}</p>
              </div>
              <div>
                <button className='bg-[#051A49] w-full py-3 text-white rounded-xl' onClick={handleSubmit}>Lamar Kerjaan</button>
              </div>
            </div>
          </div>
          <Footer className={"absolute bottom-0 w-full px-5 xl:px-[144px]"} />
        </div>
      )}

    </div>
  )
}

export default Kualifikasi