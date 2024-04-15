import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../../Component/Navbar/Navbar'
import { TbEye, TbEyeClosed } from 'react-icons/tb'
import axios from 'axios'

const DaftarPerusahaan = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const [data, setData] = useState({
    "nama": "",
    "email": "",
    "password": "",
    "deskripsi": "",
    "tipe": "",
    "tahunBerdiri": ""

  })
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChangeText = (e) => {
    const { id, value } = e.target;
    setData((prevCustomer) => ({
      ...prevCustomer,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    console.log("Nama", data.nama)
    console.log("Email", data.email)
    console.log("Password", data.password)
    console.log("Tanggal Lahir", data.tahunBerdiri)
    console.log("Tipe", selectedOption)
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/registerperusahaan', {
        'nama': data.nama,
        'email': data.email,
        'password': data.password,
        'tahun_berdiri': data.tahunBerdiri,
        'tipe':selectedOption
      }, {
        headers: { 'Content-Type': 'application/json' }
      }).then(function (response) {
        navigate('/masukPerusahaan')
      }).catch(function (error) {
        console.log(error);
      })
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className='font-popins'>
      <Navbar />
      <div className='bg-[#E5E5E5] lg:h-[100vh] flex flex-col gap-3 border justify-center items-center pt-32 '>
        <div className=''>
          <p className='text-right text-[#104ACC] font-bold'>Apakah anda mencari Pekerjaan? </p>
          <div className='flex flex-col bg-white px-6 py-4 gap-3 lg:gap-6 lg:px-[72px] lg:py-8 lg:w-[450px]'>
            <h1 className='font-bold text-[36px]'>Daftar</h1>
            <div className=''>
              <p>Nama Perusahaan</p>
              <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                <input className='outline-none w-[90%] ' type="text" name="nama" id="nama" onChange={handleChangeText} value={data.nama} />
              </div>
            </div>
            <div className=''>
              <p>Email</p>
              <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                <input className='outline-none w-[90%] ' type="email" name="email" id="email" onChange={handleChangeText} value={data.email} />
              </div>
            </div>
            <div className=''>
              <p>Password</p>
              <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                {open ?
                  (<input className='outline-none w-[90%] ' type="password" name="password" id="password" value={data.password} onChange={handleChangeText} />) :
                  (<input className='outline-none w-[90%] ' type="text" name="password" id="password" value={data.password} onChange={handleChangeText} />)

                }
                <button className='text-[24px]' onClick={() => setOpen(!open)}>
                  {open ? (<TbEyeClosed className='' />) : (<TbEye className='' />)}
                </button>
              </div>
            </div>
            <div className=''>
              <p>Tahun Berdiri</p>
              <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                <input className='outline-none w-[90%] ' type="number" name="tahunBerdiri" id="tahunBerdiri" onChange={handleChangeText} value={data.tahunBerdiri} />
              </div>
            </div>
            <div className=''>
              <p>Tipe</p>
              <div className='border border-[#051A49] px-3 py-[6px] flex flex-col items-left rounded'>
                <div className='flex items-center gap-3'>
                  <input
                    className='outline-none'
                    type="radio"
                    name="negri"
                    id="negri"
                    value="Negri"
                    checked={selectedOption === 'Negri'}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="negri">Negri</label>
                </div>
                <div className='flex items-center gap-3'>
                  <input
                    className='outline-none'
                    type="radio"
                    name="swasta"
                    id="swasta"
                    value="Swasta"
                    checked={selectedOption === 'Swasta'}
                    onChange={handleOptionChange}
                  />
                  <label htmlFor="swasta">Swasta</label>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">

              <button type="button" onClick={handleSubmit} className="text-white w-full bg-[#051A49] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Daftar</button>
              <p>Sudah punya akun? <Link to='/' className='text-[#003EC8]'>masuk disini</Link></p>
            </div>
          </div>

        </div>
        <p className='font-bold text-[#051A49] text-[20px] lg:text-[28px]'>Solusi Pertama Bagi Perusahaan</p>
      </div>

    </div>

  )
}

export default DaftarPerusahaan