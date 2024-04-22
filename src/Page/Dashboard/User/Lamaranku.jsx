import React, { useEffect, useState } from 'react'
import NavbarLogin from '../../../Component/Navbar/NavbarLogin'
import { useCookies } from 'react-cookie';
import EditProfile from '../../../Component/Popup/Profile';
import axios from 'axios';
import { TbMapPin } from 'react-icons/tb';

const Lamaranku = () => {
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [dataLamaran, setDataLamaran] = useState(null)
    const [dataPerusahaan, setDataPerusahaan] = useState(null)
    const [dataLowongan, setDataLowongan] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [cookies] = useCookies(['userID']); // Menggunakan array untuk menyediakan daftar kunci-kunci cookie
    const [showDialog, setShowDialog] = useState(false)
    const searchPT = (perusahaan, post) => {
        const company = perusahaan.filter(item1 => post.some(item2 => item2.id_perusahaan === item1.id));
        let compNames = company.map((item) => item.nama);
        return compNames;
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
        console.log(userID)
        const fetchData = async () => {
            try {
                const user = await axios.get(`http://127.0.0.1:8000/api/user/${userID}`)
                const lamaran = await axios.get(`http://127.0.0.1:8000/api/user/lowonganstatus/${userID}`);
                const lowongan = await axios.get(`http://127.0.0.1:8000/api/user/lowongan/all`)
                const perusahaan = await axios.get(`http://127.0.0.1:8000/api/user/perusahaan/all`)
                setDataPerusahaan(perusahaan.data)
                setDataLowongan(lowongan.data)
                setDataLamaran(lamaran.data);
                setUserData(user.data)
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
            <NavbarLogin nama={userData?.nama} popUpProfile={() => setShowDialog(true)} />
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : userData ? (
                    <div className='px-[140px] '>
                        <h1 className='text-[32px] font-bold'>Lamaranku</h1>
                        <div className='flex flex-col gap-4 items-center'>
                            {dataLowongan.map((item) => (
                                <div className='border px-8 py-4 rounded-xl flex justify-between items-end w-[50%]'>
                                    <div>
                                        <div className='mb-3'>
                                            <div className='w-10 h-10 bg-slate-600 rounded-full mb-2'></div>
                                            <div>
                                                <h1 className='text-[20px] font-semibold leading-5'>{item?.nama_posisi}</h1>
                                                <p className='text-[20px]'>{searchPT(dataPerusahaan, [item])}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className='flex items-center gap-3 text-[20px]'><TbMapPin/>{item.lokasi}</p>
                                            <p className='text-[20px]'>{formatCurrency(item?.gaji_dari)} - {formatCurrency(item?.gaji_hingga)}</p>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <h1 className='text-[28px] py-4 px-6 border'>Applied</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Lamaranku