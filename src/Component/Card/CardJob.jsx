import React from 'react'
import { TbUsersGroup, TbMapPin } from "react-icons/tb";
import { PiMoney } from "react-icons/pi";
import { NavLink, useNavigate } from 'react-router-dom';
const CardJob = (props) => {
    const route = useNavigate()
    const { id, pekerjaan, perusahaan, slot, lokasi, gajiMin, gajiMax,pelamar } = props
    function formatCurrency(amount) {
        // Mengubah angka menjadi string dan membalikkan string tersebut
        const reversedAmount = String(amount).split('').reverse().join('');
        // Menambahkan titik sebagai pemisah ribuan setiap 3 karakter
        const formattedAmount = reversedAmount.match(/.{1,3}/g).join('.').split('').reverse().join('');
        // Mengembalikan string dengan format mata uang
        return `Rp ${formattedAmount}`;
    }
    return (
        <NavLink to={`${id ? `/kualifikasi/${id}`:"/dashboardUser"}`}>
            <button className='bg-[#051A49] px-6 py-5 w-full max-xl:flex flex-col max-xl:h-[300px] xl:w-[400px] text-white rounded-2xl'>
                <div className='flex items-center gap-5 mb-5'>
                    <div>
                        <p className=' md:text-[20px] font-semibold text-left'>{pekerjaan}</p>
                        <p className='font-medium text-left'>{perusahaan}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='flex items-center gap-2'>
                        <TbUsersGroup className='text-[28px]' />
                        <p>{pelamar} / {slot}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <TbMapPin className='text-[28px]' />
                        <p>{lokasi}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <PiMoney className='text-[28px]' />
                        <p className='text-[12px]'>{formatCurrency(gajiMin)} - {formatCurrency(gajiMax)} </p>
                    </div>
                </div>

            </button>

        </NavLink>
    )
}

export default CardJob