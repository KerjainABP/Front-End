import React, { useEffect, useState } from 'react'
import NavbarLogin from '../../../Component/Navbar/NavbarLogin'
import { useCookies } from 'react-cookie';
import EditProfile from '../../../Component/Popup/Profile';
import PerusahaanImage from "../../../assets/PerusahanImage.png"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TiInputChecked } from "react-icons/ti";

const ListPerusahaan = () => {
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cookies] = useCookies(['userID']); // Menggunakan array untuk menyediakan daftar kunci-kunci cookie
    const [showDialog, setShowDialog] = useState(false)
    useEffect(() => {
        const userID = cookies.userID;

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://kerjain-be-production.up.railway.app/api/user/${userID}`);
                setUserData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (userID) {
            fetchData();
        }
    }, [cookies.userID]);
    return (
        <div className='font-popins'>
            {showDialog && (<EditProfile handleDialog={showDialog} setHandleDialog={setShowDialog} />)}
            <NavbarLogin nama={userData?.nama} popUpProfile={() => setShowDialog(true)} />
            <div className='px-[140px] mt-10'>
                <div className='flex justify-evenly items-center mb-[160px]'>
                    <img src={PerusahaanImage} alt="" />
                    <div className='w-[560px]'>
                        <h1 className='text-[48px] font-semibold lg:mb-7'>Ikuti jejak perusahaan yang bekerja sama dengan KerjaIn</h1>
                        <button className='bg-black text-white px-8 py-4 lg:mb-10'><Link to={`/daftarPerusahaan`}>Daftar Perusahaan</Link></button>
                        <p className='text-[24px] font-semibold lg:mb-8'>Buat Iklan lowongan, dan temukan individu terbaik untuk perusahaan impian anda.</p>
                        <ul className='flex flex-col gap-4'>
                            <li className='text-[24px] flex items-center gap-5'><TiInputChecked className='text-[32px]' /> Aman dan Tersertifiaksi</li>
                            <li className='text-[24px] flex items-center gap-5'><TiInputChecked className='text-[32px]' /> Aman dan Tersertifiaksi</li>
                            <li className='text-[24px] flex items-center gap-5'><TiInputChecked className='text-[32px]' /> Aman dan Tersertifiaksi</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p className='text-center text-[48px] font-bold mb-10 '>Mitra Kerjain</p>
                </div>
            </div>
        </div>
    )
}

export default ListPerusahaan