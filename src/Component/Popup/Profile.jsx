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
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
        // Mengatur state showModal menjadi true saat tombol "Keluar" ditekan
        setShowModal(true);
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

    const handleDeleteUser = () => {
        // Mengatur state showDeleteModal menjadi true saat tombol "Hapus Akun" ditekan
        setShowDeleteModal(true);
    };

    const Modal = () => {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-slate-400 px-10 py-4">
                    <div className="flex flex-col gap-3">
                        <p>Apakah Anda yakin ingin keluar?</p>
                        <div className='flex gap-2'>
                            <button className='px-4 py-2 border rounded-lg ' onClick={() => setShowModal(false)}>Batal</button>
                            <button className='px-4 py-2 border rounded-lg bg-[#]' onClick={() => {
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
                            }}>Keluar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const DeleteModal = () => {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
                <div className="bg-slate-500 p-10">
                    <div className="modal-content">
                        <p className='mb-4'>Apakah Anda yakin ingin menghapus akun?</p>
                        <div className='flex items-center justify-between'>
                            <button className='px-3 py-2  ' onClick={() => setShowDeleteModal(false)}>Batal</button>
                            <button className='px-3 py-2 bg-[#ED1A1A] rounded-md' onClick={async () => {
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
                            }}>Hapus Akun</button>

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-60"></div>
            {showModal && <Modal />}
            {showDeleteModal && <DeleteModal />}
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