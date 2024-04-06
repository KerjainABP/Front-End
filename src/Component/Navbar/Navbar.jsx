import React from 'react'
import Logo from "../../assets/Logo.png"
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex justify-between items-center lg:px-[144px] lg:py-6 bg-white font-popins'>
        <div>
            <img src={Logo} alt="" />
        </div>
        <div>
            <div className='flex gap-6'>
                <Link to={`/`}>Pekerja</Link>
                <Link className='' to={`/perusahaan`}>Perusahaan</Link>
            </div>
        </div>
        <div className='flex gap-4'>
            <button><Link to={`/masuk`}>Masuk</Link></button>
            <button><Link to={`/daftar`}>Daftar</Link></button>
        </div>
    </div>
  )
}

export default Navbar