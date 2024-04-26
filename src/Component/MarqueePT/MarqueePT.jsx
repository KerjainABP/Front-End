import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Marquee from "react-fast-marquee";
import CardMarque from './CardMarque';
const MarqueePT = () => {
    const [daftarPerusahaan, setDaftarPerusahaan] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const perusahaan = await axios.get('https://kerjainbe-production.up.railway.app/api/user/perusahaan/all');
                setDaftarPerusahaan(perusahaan.data)
            } catch (error) {
                console.error("Gagal memuat data:", error);
            }
        };


        fetchData();

    }, []); // Memperbarui data saat userID berubah

    return (
        <Marquee  autoFill={true}>
            {daftarPerusahaan?.map((item, index)=>(
                <div key={index} className='mx-10'>
                    <CardMarque  nama={item.nama}  />
                </div>
            ))}
        </Marquee>
    )
}

export default MarqueePT