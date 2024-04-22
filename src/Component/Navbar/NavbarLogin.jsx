import React from 'react'
import Logo from "../../assets/Logo.png"
import { Link, useLocation } from 'react-router-dom'

const NavbarLogin = (props) => {
    const locate = useLocation()
    const { nama, popUpProfile } = props
    const linkDestination = (locate) => {
        // Cek jika path adalah "/lihatPerusahaan", "/dashboardUser", atau dimulai dengan "/kualifikasi/"
        if (locate.pathname === "/lihatPerusahaan" ||
            locate.pathname === "/dashboardUser" ||
            locate.pathname.startsWith("/kualifikasi/")|| locate.pathname === "/lamaranku" || locate.pathname.startsWith("/lowongan")) {
            return "/dashboardUser";
        } else {
            return "/";
        }
    };
    return (
        <div className='flex justify-between items-center px-5 py-3 lg:px-[144px] lg:py-6 bg-white'>
            <div>
                <img src={Logo} alt="" />
            </div>
            <div>
                <div className='flex gap-6'>
                    <Link to={linkDestination(locate)}>Home</Link>
                    <button className='' onClick={popUpProfile} >Profile</button>
                    <Link className='' to={`/lamaranku`}>Lamaranku</Link>
                    <Link className='' to={`/lihatPerusahaan`}>Perusahaan</Link>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div className='border rounded-full bg-slate-600 w-[40px] h-10'>

                </div>
                <p>{nama}</p>
            </div>
        </div>
    )
}

export default NavbarLogin