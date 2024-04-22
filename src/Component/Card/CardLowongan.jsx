import React, { useEffect, useState } from 'react'
import { TbMapPin } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'
const CardLowongan = (props) => {
    const { id, perusahaan, posisi, lokasi, gajiMin, gajiMax, deskripsi } = props
    const [dataKualifikasi, setDataKualifikasi] = useState([])
    function formatCurrency(amount) {
        // Mengubah angka menjadi string dan membalikkan string tersebut
        const reversedAmount = String(amount).split('').reverse().join('');
        // Menambahkan titik sebagai pemisah ribuan setiap 3 karakter
        const formattedAmount = reversedAmount.match(/.{1,3}/g).join('.').split('').reverse().join('');
        // Mengembalikan string dengan format mata uang
        return `Rp ${formattedAmount}`;
    }
    
    return (
        <NavLink to={`/kualifikasi/${id}`} key={id} className='border rounded-lg mx-[340px] px-6 py-2 flex justify-between '>
            <div>
                <div className='flex items-center gap-4 mb-6'>
                    <div className='w-10 h-10 bg-slate-600 rounded-full mb-2'></div>
                    <div>
                        <h1 className='text-[24px] font-semibold'>{posisi}</h1>
                        <h1 className='text-[18px] font-medium'>{perusahaan}</h1>
                    </div>

                </div>
                <p className='flex items-center gap-3 text-[20px]'><TbMapPin className='text-[24px]' />{lokasi}</p>
                <p className='mb-8'>{formatCurrency(gajiMin)} - {formatCurrency(gajiMax)}</p>

                <p className='w-[800px]'>{deskripsi}</p>
            </div>
        </NavLink>
    )
}

export default CardLowongan