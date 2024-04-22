import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import NavbarLogin from '../../../Component/Navbar/NavbarLogin';
import axios from 'axios';
import Background from '../../../assets/search.png'
import { Link, NavLink } from 'react-router-dom';
import PTProfile from '../../../Component/Popup/PTProfile';
const DashboardPerusahaan = () => {
  const [error, setError] = useState(null);
  const [dataLowongan, setDataLowongan] = useState(null)
  const [userData, setUserData] = useState(null);
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
        const response = await axios.get(`http://127.0.0.1:8000/api/pt/${perusahaanID}`);
        const lowongan = await axios.get(`http://127.0.0.1:8000/api/pt/lowonganperusahaan/${perusahaanID}`)
        const pendaftar = await axios.get(`http://127.0.0.1:8000/api/pt/lowonganperusahaan/pendaftar/${perusahaanID}`)
        setUserData(response.data);
        setDataLowongan(lowongan.data)
        console.log(pendaftar)
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
      {showDialog && (<PTProfile handleDialog={showDialog} setHandleDialog={setShowDialog} />)}
      <NavbarLogin nama={userData?.nama} popUpProfile={() => setShowDialog(true)} />
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
            <div className=''>
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
                        <tr className="bg-[#051A49] border-b  text-white">
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
                            0 / {data.slot_posisi}
                          </td>
                          <td className="px-6 py-4">
                            <NavLink to={`/kualifikasi/${data.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Kualifikasi</NavLink>
                          </td>
                          <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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
      </div>
    </div>
  );
}

export default DashboardPerusahaan