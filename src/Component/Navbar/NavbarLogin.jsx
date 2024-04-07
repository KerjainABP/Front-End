import React from 'react'
import Logo from "../../assets/Logo.png"
import { Link, useLocation } from 'react-router-dom'
const NavbarLogin = (props) => {
    const locate = useLocation()
    const { nama, popUpProfile } = props
    return (
        <div className='flex justify-between items-center lg:px-[144px] lg:py-6 bg-white'>
            <div>
                <img src={Logo} alt="" />
            </div>
            <div>
                <div className='flex gap-6'>
                    <Link to={locate.pathname === "/lihatPerusahaan" ? "/dashboardUser":"/"}>Home</Link>
                    <button className='' onClick={popUpProfile} >Profile</button>
                    <Link className='' to={`/lihatPerusahaan`}>Perusahaan</Link>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='border rounded-full bg-slate-600'>
                    <img className='w-10 h-10 rounded-full object-cover' src="https://i.pinimg.com/564x/4e/86/ad/4e86ad1a5714fb61a1a178ff4548bcf8.jpg" alt="" />
                </div>
                <p>{nama}</p>
            </div>
        </div>
    )
}

export default NavbarLogin