import React, { useEffect, useState } from 'react'
import NavbarLogin from '../../../Component/Navbar/NavbarLogin'
import { useCookies } from 'react-cookie';
import EditProfile from '../../../Component/Popup/Profile';
import PerusahaanImage from "../../../assets/PerusahanImage.png"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TiInputChecked } from "react-icons/ti";
import Footer from '../../../Component/Footer/Footer';
import CardLowongan from '../../../Component/Card/CardLowongan';

const ListLowongan = () => {
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [dataLowongan, setDataLowongan] = useState(null);
    const [daftarPerusahaan, setDaftarPerusahaan] = useState(null)
    const [dataKualifikasi, setDataKualifikasi] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [cookies] = useCookies(['userID']); // Menggunakan array untuk menyediakan daftar kunci-kunci cookie
    const [showDialog, setShowDialog] = useState(false)
    const searchPT = (perusahaan, post) => {
        const company = perusahaan.filter(item1 => post.some(item2 => item2.id_perusahaan === item1.id));
        let compNames = company.map((item) => item.nama);
        return compNames;
    }
    const handleSearchTipe = (data, search) => {
        const searchLowercase = search.toLowerCase();
        const filteredData = data.filter(item =>     
            item.nama_posisi.replace(/[\s-]+/g, '').toLowerCase().includes(searchLowercase)
        );
        console.log(filteredData);
        return filteredData // Jika Anda ingin menggunakan data yang difilter untuk operasi selanjutnya
    }
    const handleSearchLokasi = (data, lokasi) => {
        const lokasiLowerCase = lokasi.toLowerCase();
        const filteredData = data.filter(item =>     
            item.lokasi.replace(/[\s-]+/g, '').toLowerCase().includes(lokasiLowerCase)
        );
        console.log(filteredData);
        return filteredData // Jika Anda ingin menggunakan data yang difilter untuk operasi selanjutnya
    }
    
    useEffect(() => {
        const userID = cookies.userID;
        const fetchData = async () => {
            const queryParams = new URLSearchParams(location.search);
            const search = queryParams.get('tipe');
            const searchLokasi = queryParams.get('lokasi');
            try {
                const response = await axios.get(`https://kerjainbe-production.up.railway.app/api/user/${userID}`);
                const lowongan = await axios.get(`https://kerjainbe-production.up.railway.app/api/user/lowongan/all`);
                const perusahaan = await axios.get(`https://kerjainbe-production.up.railway.app/api/user/perusahaan/all`);
                
                let filteredLowongan = lowongan.data;
                // Filter berdasarkan tipe jika parameter tipe ada
                if (search) {
                    filteredLowongan = handleSearchTipe(filteredLowongan, search);
                }else if (searchLokasi) {
                    filteredLowongan = handleSearchLokasi(filteredLowongan, searchLokasi)
                }
                
                setDataLowongan(filteredLowongan);
                setDaftarPerusahaan(perusahaan.data);
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
        <div className='font-popins min-h-[100vh]'>
            {showDialog && (<EditProfile handleDialog={showDialog} setHandleDialog={setShowDialog} />)}
            <NavbarLogin nama={userData?.nama}  popUpProfile={() => setShowDialog(true)} />
            <div className='xl:px-[140px] md:my-10 max-md:pt-24 '>
                <h1 className='text-[28px] font-bold mb-3'>Lowongan Tersedia({dataLowongan?.length})</h1>
                <div className='flex flex-col gap-5'>
                    {dataLowongan?.map((item, index) => (
                        <CardLowongan
                            id={item.id}
                            posisi={item.nama_posisi}
                            perusahaan={searchPT(daftarPerusahaan, [item])}
                            lokasi={item.lokasi}
                            gajiMin={item.gaji_dari}
                            gajiMax={item.gaji_hingga}
                            deskripsi={item.deskripsi_pekerjaan}
                        />
                    ))}
                </div>
            </div>
            <Footer className={"px-5 xl:px-[140px]"} />
        </div>
    )
}

export default ListLowongan