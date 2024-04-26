import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import NavbarLogin from '../../../Component/Navbar/NavbarLogin';
import axios from 'axios';
import Background from '../../../assets/search.png'
import { Link, NavLink } from 'react-router-dom';
import PTProfile from '../../../Component/Popup/PTProfile';
import Footer from '../../../Component/Footer/Footer';
import { TbMapPin } from 'react-icons/tb';
const Lowonganku = () => {
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
    const searchPT = (perusahaan, post) => {
        const company = perusahaan.filter(item1 => post.some(item2 => item2.id_perusahaan === item1.id));
        let compNames = company.map((item) => item.nama);
        return compNames;
    }
    useEffect(() => {
        const perusahaanID = cookies.perusahaanID;

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://kerjainbe-production.up.railway.app/api/pt/${perusahaanID}`);
                const lowongan = await axios.get(`https://kerjainbe-production.up.railway.app/api/pt/lowonganperusahaan/${perusahaanID}`)
                const pelamar = await axios.get(`https://kerjainbe-production.up.railway.app/api/user/allkerja/get`)
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

    const getPelamar = (kerja, lowonganId) => {
        const pelamar = kerja.filter(item1 => item1.id_lowongan === lowonganId)
        return pelamar.length
    }
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
          <div className='px-5 md:px-[140px] '>
                <h1 className='max-md:pt-28 text-[28px] md:text-[40px] font-bold'>Lowonganku</h1>
                <div className='flex flex-col gap-4'>
                    {dataLowongan.map((item,i)=>(
                        <div className='border px-6 py-3 rounded-md' key={item?.id}>
                            <div className='flex md:flex-col max-md:items-center  gap-2'>
                                <div>
                                    <p className='font-bold text-[20px]'>{item?.nama_posisi}</p>
                                    <p className='font-medium text-[20px]'>{userData?.nama}</p>
                                </div>
                            </div>
                            <div className='mt-3 flex flex-col md:flex-row md:justify-between gap-3 '>
                                <div className='mt-3 flex flex-col gap-3 '>
                                    <p className='flex items-center gap-1 text-[20px]'><TbMapPin/>{item?.lokasi}</p>
                                    <p className='text-[20px]'>{formatCurrency(item?.gaji_dari)} - {formatCurrency(item?.gaji_hingga)}</p>
                                </div>
                                <button className='w-full md:w-fit py-3 bg-[#051A49] md:text-[32px] px-20 text-white rounded-xl'><NavLink to={`/editPekerja/${item?.id}`}>Detail</NavLink></button>
                            </div>
                        </div>
                    ))}
                </div>
          </div>
        ) : null}
        <Footer className={'md:px-[140px]'}/>
      </div>
    </div>
    )
}

export default Lowonganku