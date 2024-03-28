import React from 'react'
import Navbar from '../../../Component/Navbar/Navbar'
import {TbEyeClosed} from "react-icons/tb"
import { Link } from 'react-router-dom'
const Daftar = () => {
  return (
    <div className=''>
        <Navbar/>
        <div className='bg-[#E5E5E5] h-[90vh]  flex flex-col gap-6 border justify-center items-center '>
            <div className=''>
                <p className='text-right text-[#104ACC] font-bold'>Apakah anda mencari karyawan? </p>
                <div className='flex flex-col bg-white lg:px-[72px] lg:py-8 lg:w-[450px]'>
                    <h1 className='mb-10 font-bold text-[36px]'>Daftar</h1>
                    <div className='mb-10'>
                        <p>Email</p>
                        <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                            <input className='outline-none w-[90%] ' type="email" name="email" id="email" />
                        </div>
                    </div>
                    <div className='mb-[45px]'>
                        <p>Password</p>
                        <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                            <input className='outline-none w-[90%] ' type="password" name="password" id="password" />
                            <button className='text-[24px]'><TbEyeClosed className=''/></button>
                        </div>
                        <Link to='/' className='text-[#003EC8]'>Lupa Kata Sandi ? </Link>
                    </div>
                    <div className="flex flex-col items-center"> 

                        <button type="button" className="text-white w-full bg-[#051A49] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Daftar</button>
                        <p>Sudah punya akun? <Link to='/' className='text-[#003EC8]'>masuk disini</Link></p>
                    </div>
                </div>

            </div>
            <p className='font-bold text-[#051A49] text-[28px]'>Solusi Pertama Bagi Pengganguran</p>
        </div>
        
    </div>

  )
}

export default Daftar