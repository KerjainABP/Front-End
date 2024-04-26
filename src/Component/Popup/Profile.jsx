import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TbX } from 'react-icons/tb';
import { useCookies } from 'react-cookie';
import axios from 'axios';
const EditProfile = ({ handleDialog, setHandleDialog }) => {
    const [userData, setUserData] = useState({
        nama: '',
        email: '',
        tanggalLahir: '',
        deskripsi: ''
    });
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);
    const navigate = useNavigate()
    useEffect(() => {
        const userID = cookies.userID;

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://kerjainbe-production.up.railway.app/api/user/${userID}`);
                setUserData(response.data);
                setUserData({
                    nama: response.data.nama,
                    email: response.data.email,
                    tanggalLahir: response.data.tanggal_lahir,
                    deskripsi: response.data.deskripsi
                })
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
        // Menghapus cookie 'userID'
        removeCookie('userID', { path: '/' });

        // Mengatur ulang state userData atau state lain yang relevan
        setUserData({
            nama: '',
            email: '',
            tanggalLahir: '',
            deskripsi: ''
        });

        // Mengalihkan pengguna ke halaman login
        navigate('/');
    };

    const handleSaveProfile = async () => {
        const userID = cookies.userID;
        try {
            const response = await axios.put(`https://kerjainbe-production.up.railway.app/api/user/edit/${userID}`, {
                nama:userData.nama,
                email:userData.email,
                tanggal_lahir: userData.tanggalLahir,
                deskripsi:userData.deskripsi
            });
            console.log('Profil berhasil diperbarui', response.data);
            // Menutup dialog atau memberikan feedback ke pengguna
            navigate(0)
            
            
        } catch (error) {
            console.error('Gagal memperbarui profil', error);
        }
    };

    const handleDeleteUser = async () => {
        const userID = cookies.userID;
        try {
            await axios.delete(`https://kerjainbe-production.up.railway.app/api/deleteuser/${userID}`);
            console.log('Pengguna berhasil dihapus');
            // Menghapus cookie 'userID'
            removeCookie('userID', { path: '/' });
            // Opsi untuk navigasi setelah penghapusan berhasil
            navigate('/'); // Asumsikan '/login' adalah route untuk halaman login
        } catch (error) {
            console.error('Gagal menghapus pengguna', error);
        }
    };

    const handleSendPhoto = async (photoData) => {
        const userID = cookies.userID;
        const dataImg = new FormData()
        dataImg.append('image',photoData)
        try {
            const response = await axios.post(`https://kerjainbe-production.up.railway.app/api/user/editpfp/${userID}`, dataImg ,{
                headers:{
                    "Custom-Header":"value"
                }
            });
            console.log('Foto berhasil dikirim', response.data);
            // Tambahkan logika atau feedback tambahan jika diperlukan
        } catch (error) {
            console.error('Gagal mengirim foto', error);
        }
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
                        <input type="text" className='outline-none border-2 w-full border-[#051A49] px-3 py-2 rounded' value={userData.nama} onChange={(e) => setUserData({...userData, nama: e.target.value})} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[20px] font-medium'>Email</h1>
                        <input type="text" className='outline-none border-2 w-full border-[#051A49] px-3 py-2 rounded' value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[20px] font-medium'>Tanggal Lahir</h1>
                        <input type="date" className='outline-none border-2 w-full border-[#051A49] px-3 py-2 rounded' value={userData.tanggalLahir} onChange={(e) => setUserData({...userData, tanggalLahir: e.target.value})} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[20px] font-medium'>Deskripsi</h1>
                        <textarea type="text" className='resize-none outline-none border-2 w-full border-[#051A49] px-3 py-2 rounded' value={userData.deskripsi} onChange={(e) => setUserData({...userData, deskripsi: e.target.value})}></textarea>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-4 items-center'>
                        <button className='px-2 py-2 bg-[#ED1A1A] text-white rounded-md' onClick={handleDeleteUser}>Hapus Akun</button>
                        <button className='px-2 py-2 bg-[#051A49] text-white rounded-md' onClick={handleSaveProfile}>Simpan</button>
                    </div>
                    <div>
                        <button className='px-2 py-2 bg-[#051A49] text-white rounded-md' onClick={handleLogout}>Keluar</button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile