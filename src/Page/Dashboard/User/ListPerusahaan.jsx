import React, { useEffect, useState } from 'react'
import NavbarLogin from '../../../Component/Navbar/NavbarLogin'
import { useCookies } from 'react-cookie';
import EditProfile from '../../../Component/Popup/Profile';
import PerusahaanImage from "../../../assets/PerusahanImage.png"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TiInputChecked } from "react-icons/ti";
import MarqueePT from '../../../Component/MarqueePT/MarqueePT';
import Footer from '../../../Component/Footer/Footer';

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
                const response = await axios.get(`https://kerjainbe-production.up.railway.app/api/user/${userID}`);
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
            <div className='xl:px-[140px] md:my-10'>
                <div className='flex max-xl:flex-col justify-evenly items-center md:mb-[160px]'>
                    <img src={PerusahaanImage} alt="" />
                    <div className='max-sm:w-full w-[560px]'>
                        <h1 className='max-sm:text-[32px] text-[48px] font-semibold lg:mb-7'>Ikuti jejak perusahaan yang bekerja sama dengan KerjaIn</h1>
                        <button className='bg-black text-white px-8 py-4 lg:mb-10'><Link to={`/daftarPerusahaan`}>Daftar Perusahaan</Link></button>
                        <p className='mds:text-[24px] font-semibold lg:mb-8'>Buat Iklan lowongan, dan temukan individu terbaik untuk perusahaan impian anda.</p>
                        <ul className='flex flex-col gap-4'>
                            <li className='md:text-[24px] flex items-center gap-2 md:gap-5'><TiInputChecked className='text-[32px]' /> Aman dan Tersertifikasi</li>
                            <li className='md:text-[24px] flex items-center gap-2 md:gap-5'><TiInputChecked className='text-[32px]' /> Fleksibel dan Mudah</li>
                            <li className='md:text-[24px] flex items-center gap-2 md:gap-5'><TiInputChecked className='text-[32px]' /> Gratis dan Tidak Dipungut Biaya</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p className='text-center text-[48px] font-bold mb-10 '>Mitra Kerjain</p>
                    <div>
                        <MarqueePT/>
                    </div>
                </div>
            </div>
            <Footer className={"xl:px-[140px]"}/>
        </div>
    )
}

export default ListPerusahaan