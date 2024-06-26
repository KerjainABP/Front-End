import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import NavbarLogin from '../../../Component/Navbar/NavbarLogin';
import axios from 'axios';
import Background from '../../../assets/search.png'
import { Link, NavLink } from 'react-router-dom';
import PTProfile from '../../../Component/Popup/PTProfile';
import Footer from '../../../Component/Footer/Footer';
const DashboardPerusahaan = () => {
  const [error, setError] = useState(null);
  const [dataLowongan, setDataLowongan] = useState(null)
  const [userData, setUserData] = useState(null);
  const [kerja, setKerja] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(['perusahaanID']); // Menggunakan array untuk menyediakan daftar kunci-kunci cookie
  const [showDialog, setShowDialog] = useState(false)
  function formatCurrency(amount) {
    // Mengubah angka menjadi string dan membalikkan string tersebut
    const reversedAmount = String(amount).split('').reverse().join('');
    // Menambahkan titik sebagai pemisah ribuan setiap 3 karakter
    const formattedAmount = reversedAmount.match(/.{1,3}/g).join('.').split('').reverse().join('');
    // Mengembalikan string dengan format mata uang
    return `Rp ${formattedAmount}`;
  }

  useEffect(() => {
    const perusahaanID = cookies.perusahaanID;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://bekerjain-production.up.railway.app/api/pt/${perusahaanID}`);
        const lowongan = await axios.get(`https://bekerjain-production.up.railway.app/api/pt/lowonganperusahaan/${perusahaanID}`)
        const pelamar = await axios.get(`https://bekerjain-production.up.railway.app/api/user/allkerja/get`)
        setUserData(response.data);
        setDataLowongan(lowongan.data)
        setKerja(pelamar.data)
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

  const getPelamar = (kerja, lowonganId) =>{
    const pelamar = kerja.filter(item1 => item1.id_lowongan === lowonganId)
    return pelamar.length
  }
  return (
    <div className='font-popins'>
      {showDialog && (<PTProfile handleDialog={showDialog} setHandleDialog={setShowDialog} />)}
      <NavbarLogin nama={userData?.nama}  popUpProfile={() => setShowDialog(true)} />
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : userData ? (
          <div className='px-[140px] '>
            <div className='w-full lg:mb-14 h-[540px] bg-cover bg-center rounded-3xl flex justify-center items-center px-[300px] mb-44' style={{ backgroundImage: `url(${Background})` }}>
              <div className=''>
                <Link to={`/buatIklan`}>Buat Iklan</Link>
              </div>
            </div>
            <div className='mb-10'>
              <h1 className='text-[40px] font-medium'>Iklan Pekerjaan</h1>
              <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-[#051A49] ">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Lowongan
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Lokasi
                        </th>
                        <th scope="col" className="pl-28 py-3">
                          Gaji
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Pendaftar
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Kualifikasi
                        </th>
                        <th scope="col" className="px-6 py-3">

                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataLowongan.map((data, i) => (
                        <tr key={i} className="bg-[#051A49] border-b  text-white">
                          <th scope="row" className="px-6 py-4 font-medium t whitespace-nowrap dark:text-white">
                            {data.nama_posisi}
                          </th>
                          <td className="px-6 py-4">
                            {data.lokasi}
                          </td>
                          <td className="px-6 py-4">
                            {formatCurrency(data.gaji_dari)} - {formatCurrency(data.gaji_hingga)}
                          </td>
                          <td className="px-6 py-4">
                            {getPelamar(kerja, data.id)} / {data.slot_posisi}
                          </td>
                          <td className="px-6 py-4">
                            <NavLink to={`/seleksi/${data.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Seleksi</NavLink>
                          </td>
                          <td className="px-6 py-4">
                            <NavLink to={`/editLowongan/${data.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</NavLink>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <Footer className={'px-[140px]'}/>
      </div>
    </div>
  );
}

export default DashboardPerusahaan