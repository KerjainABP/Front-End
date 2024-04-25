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
    function formatCurrency(lowongan, itemId) {
        // Mencari objek lowongan berdasarkan id
        const item = lowongan.find((items) => items.id === itemId);
        if (!item) return "Data tidak ditemukan"; // Jika item tidak ditemukan, kembalikan pesan error
        // Fungsi untuk mengubah angka menjadi format mata uang
        const formatAmount = (amount) => {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
        };
        // Menggunakan fungsi formatAmount untuk gajiMin dan gajiMax
        const gajiMinFormatted = formatAmount(item.gaji_dari);
        const gajiMaxFormatted = formatAmount(item.gaji_hingga);

        // Mengembalikan string dengan format mata uang
        return `${gajiMinFormatted} - ${gajiMaxFormatted}`;
    }
    function getLokasi(lowongan, itemId) {
        const item = lowongan.find((items) => items.id === itemId);
        if (!item) return "Data tidak ditemukan"
        return item.lokasi
    }
    useEffect(() => {
        const userID = cookies.userID;
        const fetchData = async () => {
            try {
                const user = await axios.get(`http://127.0.0.1:8000/api/user/${userID}`)
                const lamaran = await axios.get(`http://127.0.0.1:8000/api/user/lowonganstatus/${userID}`);
                const lowongan = await axios.get(`http://127.0.0.1:8000/api/user/lowongan/all`)
                const perusahaan = await axios.get(`http://127.0.0.1:8000/api/user/perusahaan/all`)
                setUserData(user.data)
                setDataPerusahaan(perusahaan.data)
                setDataLowongan(lowongan.data)
                setDataLamaran(lamaran.data);
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
            <NavbarLogin nama={userData?.nama} pp={userData?.profile_picture} popUpProfile={() => setShowDialog(true)} />
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : userData ? (
                    <div className='px-5 md:px-[140px] max-md:pt-28'>
                        <h1 className='text-[32px] font-bold'>Lamaranku</h1>
                        <div className='flex flex-col gap-4 xl:items-center '>
                            {dataLamaran.map((item) => (
                                <div className='border px-8 py-4 rounded-xl flex max-xl:flex-col xl:justify-between xl:items-end xl:w-[50%] max-xl:gap-5'>
                                    <div>
                                        <div className='mb-3 max-xl:flex xl:items-center gap-3'>
                                            <div className='w-10 h-10 bg-slate-600 rounded-full mb-2'></div>
                                            <div>
                                                <h1 className='text-[20px] w-full font-semibold leading-5'>{item?.nama_posisi}</h1>
                                                <p className='text-[20px]'>{searchPT(dataPerusahaan, [item])}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className='flex items-center gap-3 text-[20px]'><TbMapPin />{getLokasi(dataLowongan, item?.id_lowongan)}</p>
                                            <p className='text-[20px]'>{formatCurrency(dataLowongan, item?.id_lowongan)} </p>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <h1 className='text-center'>{item?.status === "applied" ? (<div className='text-[24px] py-4 px-6 border rounded-xl'> Diproses</div>) : (item?.status === 'diterima' ? (<div className='bg-[#378D2F] text-white text-[24px] py-4 px-6 border rounded-xl'>Diterima</div>) : (item?.status === 'ditolak'?(<div className="bg-[#CB4242] text-white text-[24px] py-4 px-9 border rounded-xl">Ditolak</div>):(<div className="bg-[#051A49] text-white text-[24px] py-4 px-9 border rounded-xl">Selesai</div>)))}</h1>
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