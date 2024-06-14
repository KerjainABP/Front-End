import React, { useEffect, useState } from 'react'
import NavbarLogin from '../../../Component/Navbar/NavbarLogin'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import PTProfile from '../../../Component/Popup/PTProfile';
import Footer from '../../../Component/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TbArrowLeft } from 'react-icons/tb';
const Seleksi = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [error, setError] = useState(null);
    const [dataLowongan, setDataLowongan] = useState(null)
    const [userData, setUserData] = useState(null);
    const [perusahaan, setPerusahaan] = useState(null)
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
                const response = await axios.get(`https://bekerjain-production.up.railway.app/api/user/lowongan/${id}`);
                const pelamar = await axios.get(`https://bekerjain-production.up.railway.app/api/pt/lowonganperusahaan/pendaftar/${id}`)
                const perusahaan = await axios.get(`https://bekerjain-production.up.railway.app/api/pt/${perusahaanID}`)
                
                setPerusahaan(perusahaan.data)
                setDataLowongan([response.data]);
                setUserData(pelamar.data)

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

    const handleTerima = (idUser) => {
        const idLowongan = id; // Menggunakan id dari useParams untuk idLowongan
        axios.put(`https://bekerjain-production.up.railway.app/api/pt/lowonganperusahaan/terima/${idLowongan}/${idUser}`)
            .then(response => {
                navigate("/dashboardPerusahaan")
            })
            .catch(error => {
                console.log("Error", error)
            });
    }
    const handleTolak = (idUser) => {
        const idLowongan = id; // Menggunakan id dari useParams untuk idLowongan
        axios.put(`https://bekerjain-production.up.railway.app/api/pt/lowonganperusahaan/tolak/${idLowongan}/${idUser}`)
            .then(response => {
                navigate("/dashboardPerusahaan")
            })
            .catch(error => {
                console.log("Error", error)
            });
    }

    return (
        <div className='font-popins'>
            {showDialog && (<PTProfile handleDialog={showDialog} setHandleDialog={setShowDialog} />)}
            <NavbarLogin nama={perusahaan?.nama} popUpProfile={() => setShowDialog(true)} />
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : userData ? (
                <div className='px-[140px] mt-10'>
                    <div className=''>
                        <Link className='text-[20px] flex gap-3 items-center mb-10 ' to={-1}><TbArrowLeft /> Kembali</Link>
                        <h1 className='text-[48px] font-semibold mb-2'>Seleksi Pelamar</h1>
                        <div className='mb-32'>
                            {dataLowongan.map((item) => (
                                <div key={item.id} className='border rounded-xl p-[30px]'>
                                    <div className='mb-5' >
                                        <div>
                                            <p className='text-[20px] font-bold'>{item.nama_posisi}</p>
                                        </div>
                                    </div>
                                    <p className='text-[20px] font-light'>{item.lokasi}</p>
                                    <p>{formatCurrency(item.gaji_dari)} - {formatCurrency(item.gaji_hingga)}</p>
                                    <p>{item.deskripsi_pekerjaan}</p>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col gap-4'>
                            {userData.map((user) => (
                                <div className='border rounded-xl p-[30px] flex justify-between'>
                                    <div>
                                        <div className='mb-5' >
                                            <div>
                                                <p className='text-[20px] font-bold'>{user.nama}</p>
                                                <p className='text-[18px] '>{user.email}</p>
                                            </div>
                                        </div>
                                        <p>{user.deskripsi}</p>
                                    </div>
                                    <div className='flex flex-col items-center justify-between'>
                                        <button>Cek CV</button>
                                        <div className='flex gap-4'> 
                                            <button className='text-[20px] border px-4 py-2 rounded-md bg-[#378D2F] text-white' onClick={() => handleTerima(user.id)}>Terima</button>
                                            <button className='text-[20px] border px-4 py-2 rounded-md bg-[#CB4242] text-white' onClick={() => handleTolak(user.id)}>Tolak</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Footer />
                </div>
            ) : null}
        </div>
    )
}

export default Seleksi