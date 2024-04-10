import React from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import LandingPage1 from "../../assets/landingPage1.png"
import { Link } from 'react-router-dom'
const LandingPage = () => {
  return (
    <div className='font-popins bg-[#e5e5e5] h-[100vh]'>
        <Navbar/>
        <div className='flex lg:justify-around flex-col-reverse items-center pt-32 px-5 py-4 gap-6 2xl:flex-row lg:px-[144px] lg:pt-40 lg:py-6 '>
          <div>
            <h1 className='text-[28px] 2xl:text-[60px] font-medium 2xl:w-[612px] mb-4'>Temukan Pekerjaan sesuai bidang dan kemampuan kamu</h1>
            <p className=' 2xl:text-[20px] font-light 2xl:w-[600px] mb-10 lg:mb-20 border'>Temukan pekerjaan yang sesuai dengan Anda di Kerjain. Beragam lowongan dari berbagai bidang menanti. </p>
            <Link to={`/daftar`} className='px-5 max-lg:py-4 border bg-[#051A49] text-white lg:px-9 lg:py-6 lg:text-[18px] rounded-3xl '>Daftarkan Diri Anda</Link>
          </div>
          <div className=''>
            <img src={LandingPage1} alt="" />

          </div>
        </div>
    </div>
  )
}

export default LandingPage