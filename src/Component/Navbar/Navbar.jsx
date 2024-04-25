import React, { useState } from 'react';
import Logo from "../../assets/Logo.png";
import { Link, useLocation } from 'react-router-dom';
import { TbMenu2, TbX } from 'react-icons/tb';
const Navbar = () => {
    const location = useLocation();
    const [open, setOpen] = useState(true)
    return (
        <div className='fixed w-[100vw] flex justify-between items-center px-5 py-3 lg:px-[144px] lg:py-6 bg-white font-popins'>
            <div className='flex items-center justify-between max-md:w-full'>
                <Link to={`/`}>
                    <img src={Logo} alt="" />
                </Link>
                <button onClick={() => setOpen(!open)} className='md:hidden'>
                    {open ?
                        (<TbMenu2 className='text-[32px]' />)
                        :
                        (<TbX className='text-[32px]' />)
                    }
                </button>
            </div>
            <div className='max-md:hidden'>
                <div className='flex gap-3 lg:gap-6'>
                    <Link to={location.pathname === "/masukPerusahaan" ? "/masuk" : (location.pathname === "/daftarPerusahaan" ? "/daftar" : "/")} className={location.pathname === "/" || location.pathname === "/masuk" || location.pathname === "/daftar" ? "text-slate-500 cursor-default" : "text-black"}>Pekerja</Link>
                    <Link to={location.pathname === "/masuk" ? "/masukPerusahaan" : (location.pathname === "/daftar" ? "/daftarPerusahaan" : "/perusahaan")} className={location.pathname === "/perusahaan" || location.pathname === "/masukPerusahaan" || location.pathname === "/daftarPerusahaan" ? "text-slate-500 cursor-default" : "text-black"}>Perusahaan</Link>
                </div>
            </div>
            <div className='flex gap-4 max-md:hidden'>
                <button><Link to={location.pathname === "/" || location.pathname === '/daftar' ? '/masuk' : '/masukPerusahaan'}>Masuk</Link></button>
                <button><Link to={location.pathname === "/" || location.pathname === '/masuk' ? '/daftar' : '/daftarPerusahaan'}>Daftar</Link></button>
            </div>
            <div className={`md:hidden absolute top-20 bg-white w-full mx-[-20px] min-h-[100vh] transition-all ${open?"translate-x-full":"translate-x-0"}`}>
                <div className='my-5'>
                    <div className='flex flex-col items-center gap-3 lg:gap-6 text-[20px]'>
                        <Link to={location.pathname === "/masukPerusahaan" ? "/masuk" : (location.pathname === "/daftarPerusahaan" ? "/daftar" : "/")} className={location.pathname === "/" || location.pathname === "/masuk" || location.pathname === "/daftar" ? "text-slate-500 cursor-default" : "text-black"}>Pekerja</Link>
                        <Link to={location.pathname === "/masuk" ? "/masukPerusahaan" : (location.pathname === "/daftar" ? "/daftarPerusahaan" : "/perusahaan")} className={location.pathname === "/perusahaan" || location.pathname === "/masukPerusahaan" || location.pathname === "/daftarPerusahaan" ? "text-slate-500 cursor-default" : "text-black"}>Perusahaan</Link>
                    </div>
                </div>
                <div className='flex gap-4 justify-center text-[20px]'>
                    <button><Link to={location.pathname === "/" || location.pathname === '/daftar' ? '/masuk' : '/masukPerusahaan'}>Masuk</Link></button>
                    <button><Link to={location.pathname === "/" || location.pathname === '/masuk' ? '/daftar' : '/daftarPerusahaan'}>Daftar</Link></button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
