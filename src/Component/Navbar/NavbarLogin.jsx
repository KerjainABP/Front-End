import React, { useState } from 'react'
import Logo from "../../assets/Logo.png"
import { Link, useLocation } from 'react-router-dom'
import { TbMenu2, TbX } from 'react-icons/tb'

const NavbarLogin = (props) => {
    const locate = useLocation()
    const { nama, popUpProfile, pp } = props
    const linkDestination = (locate) => {
        // Cek jika path adalah "/lihatPerusahaan", "/dashboardUser", atau dimulai dengan "/kualifikasi/"
        if (locate.pathname === "/lihatPerusahaan" ||
            locate.pathname === "/dashboardUser" ||
            locate.pathname.startsWith("/kualifikasi/") || locate.pathname === "/lamaranku" || locate.pathname.startsWith("/lowongan")) {
            return "/dashboardUser";
        } else if (locate.pathname === "/lihatPerusahaan" ||
            locate.pathname === "/dashboardPerusahaan" ||
            locate.pathname.startsWith("/seleksi/")) {
            return "/dashboardPerusahaan";
        }
    };

    const [open, setOpen] = useState(false)
    return (
        <div className='max-md:fixed max-md:w-full max-md:z-30 flex justify-between items-center px-5 py-3 lg:px-[144px] lg:py-6 bg-white'>
            <div className='max-md:flex items-center justify-between max-md:w-full'>
                <img src={Logo} alt="" />
                <button onClick={() => setOpen(!open)} className='text-[32px] md:hidden'>
                    {open ? <TbX /> : <TbMenu2 />}
                </button>
            </div>
            <div className='max-md:hidden'>
                <div className='flex gap-6'>
                    <Link to={linkDestination(locate)}>Home</Link>
                    <button className='' onClick={popUpProfile} >Profile</button>
                    <Link className='' to={`${locate.pathname === "/dashboardPerusahaan"?"/lowonganku":"/lamaranku"}`}>Lamaranku</Link>
                    {locate.pathname === "/lihatPerusahaan" || locate.pathname === "/dashboardUser" || locate.pathname.startsWith("/kualifikasi/") || locate.pathname === "/lamaranku" || locate.pathname.startsWith("/lowongan/") ?
                        (
                            <Link className='' to={`/lihatPerusahaan`}>Perusahaan</Link>

                        ) : ("")}
                </div>
            </div>
            <div className='flex items-center gap-4 max-md:hidden'>
                <div className='border rounded-full bg-slate-600 '>
                        <img className='object-cover rounded-full w-10 h-10' src={`${pp}`} alt="test" />
                </div>
                <p>{nama}</p>
            </div>
            <div className={`md:hidden absolute top-[72px] h-[100vh] mx-[-20px] transition-all px-5 bg-white w-full ${open ? "translate-x-0" : "translate-x-full"}`}>
                <div className='md:hidden my-10 '>
                    <div className='flex flex-col items-center gap-6'>
                        <Link to={linkDestination(locate)}>Home</Link>
                        <button className='w-fit' onClick={popUpProfile} >Profile</button>
                        <Link className='' to={`/lowonganku`}>Lamaranku</Link>
                        {locate.pathname === "/lihatPerusahaan" || locate.pathname === "/dashboardUser" || locate.pathname.startsWith("/kualifikasi/") || locate.pathname === "/lamaranku" || locate.pathname.startsWith("/lowongan") ?
                            (
                                <Link className='' to={`/lihatPerusahaan`}>Perusahaan</Link>

                            ) : ("")}
                    </div>
                </div>
                <div className='flex items-center gap-4 md:hidden'>
                    <div className='border rounded-full w-[40px] h-10'>
                    </div>
                    <p>{nama}</p>
                </div>
            </div>
        </div>
    )
}

export default NavbarLogin