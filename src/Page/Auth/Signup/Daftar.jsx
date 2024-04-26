import React, { useState } from 'react'
import Navbar from '../../../Component/Navbar/Navbar'
import {TbEye, TbEyeClosed} from "react-icons/tb"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
const Daftar = () => {
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
            const response = await axios.post('https://kerjainbe-production.up.railway.app/api/registeruser', {
                'nama':data.nama,
                'email': data.email,
                'password':data.password,
                'tanggal_lahir':data.tanggalLahir,
            },{
                headers: {'Content-Type': 'application/json'}
            }).then(function(response) {
                navigate('/masuk')
              }).catch(function(error) {
                console.log(error);
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
                <p className='text-right text-[#104ACC] font-bold'>Apakah anda mencari karyawan? </p>
                <div className='flex flex-col gap-4 justify-center bg-white px-6 py-4 lg:px-[72px] lg:py-8 lg:w-[450px]'>
                    <h1 className='font-bold text-[36px]'>Daftar</h1>
                    <div className=''>
                        <p>Nama</p>
                        <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                            <input className='outline-none w-[90%] ' type="text" name="nama" id="nama" onChange={handleChangeText} value={data.nama}/>
                        </div>
                    </div>
                    <div className=''>
                        <p>Email</p>
                        <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                            <input className='outline-none w-[90%] ' type="email" name="email" id="email" onChange={handleChangeText} value={data.email}/>
                        </div>
                    </div>
                    <div className=''>
                        <p>Password</p>
                        <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                            {open?
                            (<input className='outline-none w-full ' type="password" name="password" id="password" value={data.password} onChange={handleChangeText}/>):
                            (<input className='outline-none w-full ' type="text" name="password" id="password" value={data.password} onChange={handleChangeText}/>)

                            }
                            <button className='text-[24px]' onClick={()=> setOpen(!open)}>
                                {open?(<TbEyeClosed className=''/>):(<TbEye className=''/>)}
                            </button>
                        </div>
                    </div>
                    <div className=''>
                        <p>Tanggal Lahir</p>
                        <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                            <input className='outline-none w-full ' type="date" name="tanggalLahir" id="tanggalLahir" onChange={handleChangeText} value={data.tanggalLahir}/>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2"> 
                        <button type="button" onClick={handleSubmit} className="text-white w-full bg-[#051A49] font-medium rounded-lg py-2">Daftar</button>
                        <p>Sudah punya akun? <Link to='/' className='text-[#003EC8]'>masuk disini</Link></p>
                    </div>
                </div>

            </div>
            <p className='font-bold text-[#051A49] text-[20px] lg:text-[28px]'>Solusi Pertama Bagi Pengganguran</p>
        </div>
        
    </div>

  )
}

export default Daftar