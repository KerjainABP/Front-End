import React, { useState } from 'react'
import Navbar from '../../../Component/Navbar/Navbar'
import {TbEye, TbEyeClosed} from "react-icons/tb"
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios"
const Daftar = () => {
    const notify = (text) => toast(text);
    const warn = (text) => toast.warn(text);
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)
    const [data, setData] = useState({
        "nama":"",
        "email":"",
        "password":"",
        "deskripsi":"",
        "tanggalLahir":""

    })
    const handleChangeText = (e) => {
        const { id, value } = e.target;
        setData((prevCustomer) => ({
          ...prevCustomer,
          [id]: value
        }));
      };
    
    const handleSubmit = async() =>{
        console.log("Nama",data.nama)
        console.log("Email",data.email)
        console.log("Password",data.password)
        console.log("Tanggal Lahir",data.tanggalLahir)
        try {
            const response = await axios.post('https://bekerjain-production.up.railway.app/api/registeruser', {
                'nama':data.nama,
                'email': data.email,
                'password':data.password,
                'tanggal_lahir':data.tanggalLahir,
            },{
                headers: {'Content-Type': 'application/json'}
            }).then(function(response) {
                notify("Berhasil Mendaftar")
                setTimeout(() => {
                    navigate('/masuk');
                }, 2000);
              }).catch(function(error) {
                warn("Terjadi Error")
              })
        } catch (error) {
            console.error('Error:', error);
        }
    }
  return (
    <div className='font-popins'>
        <Navbar/>
        <div className='bg-[#E5E5E5] h-[100vh] flex flex-col gap-6 border justify-center items-center pt-20 lg:pt-32 '>
            <div className=''>
                <Link to={`/masukPerusahaan`} className=''>Apakah anda mencari karyawan? </Link>
                <div className='flex flex-col gap-4 justify-center bg-white px-6 py-4 lg:px-[72px] lg:py-8 lg:w-[450px]'>
                    <h1 className='font-bold text-[30px]'>Daftar Karyawan</h1>
                    <div className=''>
                        <p>Nama</p>
                        <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                            <input className='outline-none w-[90%] ' type="text" name="nama" id="nama" onChange={handleChangeText} value={data.nama} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}/>
                        </div>
                    </div>
                    <div className=''>
                        <p>Email</p>
                        <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                            <input className='outline-none w-[90%] ' type="email" name="email" id="email" onChange={handleChangeText} value={data.email} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}/>
                        </div>
                    </div>
                    <div className=''>
                        <p>Password</p>
                        <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                            {open?
                            (<input className='outline-none w-full ' type="password" name="password" id="password" value={data.password} onChange={handleChangeText} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}/>):
                            (<input className='outline-none w-full ' type="text" name="password" id="password" value={data.password} onChange={handleChangeText} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}/>)

                            }
                            <button className='text-[24px]' onClick={()=> setOpen(!open)}>
                                {open?(<TbEyeClosed className=''/>):(<TbEye className=''/>)}
                            </button>
                        </div>
                    </div>
                    <div className=''>
                        <p>Tanggal Lahir</p>
                        <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                            <input className='outline-none w-full ' type="date" name="tanggalLahir" id="tanggalLahir" onChange={handleChangeText} value={data.tanggalLahir} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}/>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2"> 
                        <button type="button" onClick={handleSubmit} className="text-white w-full bg-[#051A49] font-medium rounded-lg py-2">Daftar</button>
                        <p>Sudah punya akun? <Link to='/masuk' className='text-[#003EC8]'>masuk disini</Link></p>
                    </div>
                </div>

            </div>
            <p className='font-bold text-[#051A49] text-[20px] lg:text-[28px]'>Solusi Pertama Bagi Pengganguran</p>
        </div>
        <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce/>
    </div>

  )
}

export default Daftar