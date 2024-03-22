import React from 'react'
import Logo from "../../assets/Logo.png"
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex justify-between items-center lg:px-[144px] lg:py-6'>
        <div>
            <img src={Logo} alt="" />
        </div>
        <div>
            <div className='flex gap-6'>
                <button>Pekerja</button>
                <button>Perusahaan</button>
            </div>
        </div>
        <div className='flex gap-4'>
            <button><Link to={`/masuk`}>Masuk</Link></button>
            <button>Daftar</button>
        </div>
    </div>
  )
}

export default Navbar