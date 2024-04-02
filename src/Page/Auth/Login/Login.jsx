import React, { useState } from 'react'
import Navbar from '../../../Component/Navbar/Navbar'
import {TbEye, TbEyeClosed} from "react-icons/tb"
const Login = () => {
    const [open, setOpen] = useState(true)
  return (
    <div className='font-popins'>
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
                    <div className='mb-[45px]'>
                        <p>Password</p>
                        <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                            {open?
                            (<input className='outline-none w-[90%] ' type="password" name="password" id="password" />):
                            (<input className='outline-none w-[90%] ' type="text" name="password" id="password" />)

                            }
                            <button className='text-[24px]' onClick={()=> setOpen(!open)}>
                                {open?(<TbEyeClosed className=''/>):(<TbEye className=''/>)}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center"> 

                        <button type="button" className="text-white w-full bg-[#051A49] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Masuk</button>
    
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login