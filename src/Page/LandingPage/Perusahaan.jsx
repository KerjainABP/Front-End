import React from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import LandingPage1 from "../../assets/landingPage1.png"
import { Link } from 'react-router-dom'

const Perusahaan = () => {
  return (
    <div className='font-popins bg-[#e5e5e5] h-[100vh]'>
        <Navbar/>
        <div className='lg:flex justify-around lg:px-[144px] lg:py-6 '>
          <div>
            <h1 className='lg:text-[60px] font-medium lg:w-[630px] lg:mb-16'>Temukan Bakat yang Cocok dengan Perusahaan Anda.</h1>
            <p className='lg:text-[20px] font-light lg:w-[600px] lg:mb-20 border'>Temukan Bakat yang sesuai dengan Perusahaan Anda di Kerjain. Beragam Individual dengan kemampuan yang unik tersedia di kerjain. </p>
            <Link to={`/daftarPerusahaan`} className='border bg-[#051A49] text-white lg:px-9 lg:py-6 lg:text-[18px] rounded-3xl '>Daftarkan Perusahaan Anda</Link>
          </div>
          <div>
            <img src={LandingPage1} alt="" />

          </div>
        </div>
    </div>
  )
}

export default Perusahaan