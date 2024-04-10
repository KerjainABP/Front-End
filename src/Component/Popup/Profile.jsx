import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TbX } from 'react-icons/tb';
import { useCookies } from 'react-cookie';
import axios from 'axios';
const EditProfile = ({ handleDialog, setHandleDialog }) => {
    const [userData, setUserData] = useState({
        nama:'',
        email:'',
        tanggalLahir:'',
        deskripsi:''
    });
    const [cookies] = useCookies(['userID']);
    useEffect(() => {
        const userID = cookies.userID;

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://kerjain-be-production.up.railway.app/api/user/${userID}`);
                setUserData(response.data);
                setUserData({
                    nama : response.data.nama,
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
                        <input type="text" className='outline-none border-2 w-full border-[#051A49] px-3 py-2 rounded' value={userData.nama} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[20px] font-medium'>Email</h1>
                        <input type="text" className='outline-none border-2 w-full border-[#051A49] px-3 py-2 rounded' value={userData.email}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[20px] font-medium'>Tanggal Lahir</h1>
                        <input type="text" className='outline-none border-2 w-full border-[#051A49] px-3 py-2 rounded' value={userData.tanggalLahir}/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[20px] font-medium'>Deskripsi</h1>
                        <textarea type="text" className='resize-none outline-none border-2 w-full border-[#051A49] px-3 py-2 rounded' value={userData.deskripsi}></textarea>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <button className='px-2 py-2 bg-[#ED1A1A] text-white rounded-md'>Hapus Akun</button>
                    <button className='px-2 py-2 bg-[#051A49] text-white rounded-md'>Simpan</button>
                </div>
            </div>
        </div>
    )
}

export default EditProfile