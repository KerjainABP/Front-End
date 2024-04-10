import React from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import LandingPage1 from "../../assets/landingPage1.png"
import { Link } from 'react-router-dom'

const Perusahaan = () => {
  return (
    <div className='font-popins bg-[#e5e5e5] h-[100vh]'>
        <Navbar/>
        <div className='flex 2xl:justify-around flex-col-reverse items-center pt-28 px-5 py-4 gap-6 2xl:flex-row 2xl:px-[144px] lg:pt-40 lg:py-6 '>
          <div>
            <h1 className='text-[28px] 2xl:text-[60px] font-medium 2xl:w-[640px] mb-4'>Temukan Bakat yang Cocok dengan Perusahaan Anda.</h1>
            <p className='2xl:text-[20px] font-light 2xl:w-[600px] mb-10 lg:mb-20 border'>Temukan Bakat yang sesuai dengan Perusahaan Anda di Kerjain. Beragam Individual dengan kemampuan yang unik tersedia di kerjain. </p>
            <Link to={`/daftarPerusahaan`} className='max-lg:py-4 border bg-[#051A49] text-white px-5 lg:px-9 lg:py-6 lg:text-[18px] rounded-3xl '>Daftarkan Perusahaan Anda</Link>
          </div>
          <div className=''>
            <img src={LandingPage1} alt="" />
          </div>
        </div>
    </div>
  )
}

export default Perusahaan