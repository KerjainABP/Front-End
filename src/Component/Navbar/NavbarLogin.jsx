import React from 'react'
import Logo from "../../assets/Logo.png"
import { Link } from 'react-router-dom'
const NavbarLogin = () => {
  return (
    <div className='flex justify-between items-center lg:px-[144px] lg:py-6 bg-white'>
        <div>
            <img src={Logo} alt="" />
        </div>
        <div>
            <div className='flex gap-6'>
                <Link to={`/`}>Home</Link>
                <Link className='' to={`/perusahaan`}>Profile</Link>
                <Link className='' to={`/perusahaan`}>Saran</Link>
                <Link className='' to={`/perusahaan`}>Perusahaan</Link>
            </div>
        </div>
        <div className='flex gap-4'>
            <div className='border w-6 h-6 rounded-full bg-slate-600'>

            </div>
            <p>Willy Ocean</p>
        </div>
    </div>
  )
}

export default NavbarLogin