import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TbX, TbMapPin } from 'react-icons/tb';
import { useCookies } from 'react-cookie';
import axios from 'axios';
const PTProfile = ({ handleDialog, setHandleDialog }) => {
    const [userData, setUserData] = useState({
        nama: '',
        email: '',
        tipe: '',
        tahun_berdiri: '',
        deskripsi: ''
    });
    const [dataLowongan, setDataLowongan] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['perusahaanID']);
    const navigate = useNavigate();
    useEffect(() => {
        const userID = cookies.perusahaanID;

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/pt/${userID}`);
                const lowongan = await axios.get(`http://127.0.0.1:8000/api/pt/lowonganperusahaan/${userID}`);
                console.log(lowongan.data)
                setUserData({
                    nama: response.data.nama,
                    email: response.data.email,
                    tahun_berdiri: response.data.tahun_berdiri,
                    tipe: response.data.tipe,
                    deskripsi: response.data.deskripsi
                })
                setDataLowongan(lowongan.data)
            } catch (error) {
                console.log(error)
            }
        };

        if (userID) {
            fetchData();
        }
    }, [cookies.userID]);
    const handleCloseDialog = () => {
        // Additional logic if needed
        setHandleDialog(!handleDialog);

    };

    const handleLogout = () => {
        removeCookie('perusahaanID', { path: '/' });
        setUserData({});
        navigate('/');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-60"></div>
            <div className="relative sm:w-[800px] h-fit w-full max-sm:w-[400px] px-10 bg-white rounded-[16px] font-inter max-sm:px-[10px]  py-[42px] ">
                <div className='flex justify-between items-center w-full border-b-2 border-blue-950 mb-5'>
                    <h1 className='text-[#031C32] font-satoshi font-bold text-[24px]'>Profile Saya</h1>
                    <button className="" onClick={handleCloseDialog}>
                        <TbX className='text-[48px]' />
                    </button>
                </div>
                <div className='flex flex-col gap-5 pb-8 mb-5 border-b-2 border-black'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[20px] font-medium'>Nama</h1>
                        <input type="text" className='outline-none border-2 w-full border-[#051A49] px-3 py-2 rounded' value={userData?.nama} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[20px] font-medium'>Email</h1>
                        <input type="text" className='outline-none border-2 w-full border-[#051A49] px-3 py-2 rounded' value={userData?.email} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[20px] font-medium'>Tanggal Berdiri</h1>
                        <input type="number" className='outline-none border-2 w-full border-[#051A49] px-3 py-2 rounded' value={userData?.tahun_berdiri} />
                    </div>
                    <div>
                        <h1 className='text-[#031C32] font-satoshi font-bold text-[24px]'>Riwayat Iklan Pekerjaan</h1>
                        <div className='grid grid-cols-2 gap-4'>
                            {dataLowongan && dataLowongan.map((item, i) => (
                                <div key={i} className='border p-3 bg-[#051A49] text-white rounded-xl'>
                                    <div className='flex items-center gap-3 mb-3'>
                                        <div className='w-10 h-10 bg-slate-600 rounded-full'>
                                        </div>
                                        <div>
                                            <p>{item?.nama_posisi}</p>
                                            <p>{userData?.nama}</p>
                                        </div>


                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <TbMapPin className='text-[24px]'/>
                                        <p>{item?.lokasi}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-3 items-center'>
                        <button className='px-2 py-2 bg-[#ED1A1A] text-white rounded-md'>Hapus Akun</button>
                        <button className='px-2 py-2 bg-[#051A49] text-white rounded-md'>Simpan</button>
                    </div>
                    <div>
                        <button className='px-2 py-2 bg-[#051A49] text-white rounded-md' onClick={handleLogout}>Keluar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PTProfile