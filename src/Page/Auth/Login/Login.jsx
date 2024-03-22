import React from 'react'
import Navbar from '../../../Component/Navbar/Navbar'
import {TbEyeClosed} from "react-icons/tb"
const Login = () => {
  return (
    <div className=''>
        <Navbar/>
        <div className='bg-[#E5E5E5] h-[90vh]  flex flex-row border justify-center items-center'>
            <div className=' '>
                <h1>Apakah anda mencari karyawan? </h1>
                <div className=' bg-white lg:px-[72px] lg:py-8 lg:w-[450px]'>
                    <h1 className='font-bold text-[36px]'>Masuk</h1>
                    <div>
                        <p>Email</p>
                        <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                            <input className='outline-none w-[90%] ' type="email" name="email" id="email" />
                        </div>
                    </div>
                    <div>
                        <p>Password</p>
                        <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                            <input className='outline-none w-[90%] ' type="password" name="password" id="password" />
                            <button className='text-[24px]'><TbEyeClosed className=''/></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login