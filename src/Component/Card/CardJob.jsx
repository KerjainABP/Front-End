import React from 'react'
import { TbUsersGroup, TbMapPin } from "react-icons/tb";
import { PiMoney } from "react-icons/pi";
const CardJob = (props) => {
    const {pekerjaan, perusahaan, slot, lokasi, gaji} = props
  return (
    <button className='bg-[#051A49] px-6 py-5 w-[400px] text-white rounded-2xl'>
        <div className='flex items-center gap-5 mb-5'>
            <div className='border w-10 h-10 rounded-full bg-white'>
            </div>
            <div>
                <p className='text-[20px] font-semibold'>Pekerjaan</p>
                <p className='font-medium'>Perusahaan</p>
            </div>
        </div>
        <div className='flex flex-col gap-5'>
            <div className='flex items-center gap-2'>
                <TbUsersGroup className='text-[28px]'/>
                <p>Slot / 100</p>
            </div>
            <div className='flex items-center gap-2'>
                <TbMapPin className='text-[28px]'/>
                <p>Lokasi</p>
            </div>
            <div className='flex items-center gap-2'>
                <PiMoney className='text-[28px]'/>
                <p>Rp Gaji</p>
            </div>
        </div>

    </button>
  )
}

export default CardJob