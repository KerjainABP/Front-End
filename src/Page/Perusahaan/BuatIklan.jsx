import React from 'react'
import Logo from "../../assets/Logo.png"
const BuatIklan = () => {
    return (
        <div className=' bg-[#E5E5E5] font-popins' >
            <div className=' px-[144px] py-5 flex items-center gap-[35%] bg-white '>
                <img src={Logo} alt="" />
                <p className='lg:text-[40px] lg:font-bold'>Buat Iklan Lowongan Kerja</p>
            </div>
            <div className='px-[144px] py-20 flex gap-9'>
                <div className='bg-white py-8 px-14 w-[40vw]'>
                    <h1 className='text-[24px] font-medium mb-6 '>Informasi Posisi</h1>
                    <div className='flex flex-col gap-9'>
                        <div>
                            <h3 className='text-[20px]'>Jabatan</h3>
                            <p className='text-[14px] text-[#6C7894] mb-3'>Masukkan nama jabatan (contoh: Front-end Developer)</p>
                            <input className='border-2 border-[#051A49] w-full outline-none rounded-md px-4 py-2' placeholder='Jabatan' type="text" onChange={"handleChangeText"} value={''} id='jabatan' name='jabatan' />
                        </div>
                        <div>
                            <h3 className='text-[20px]'>Lokasi</h3>
                            <p className='text-[14px] text-[#6C7894] mb-3'>Masukkan daerah, kota, atau wilayah (misalnya Kopo, Bandung)</p>
                            <input className='border-2 border-[#051A49] w-full outline-none rounded-md px-4 py-2' placeholder='Lokasi' type="text" onChange={"handleChangeText"} value={''} id='lokasi' name='lokasi' />
                        </div>
                        <div>
                            <h3 className='text-[20px]'>Gaji</h3>
                            <p className='text-[14px] text-[#6C7894] mb-3'>Masukkan kisaran gaji untuk ditawarkan ke kandidat</p>
                            <div className='flex gap-7 items-center w-full'>
                                <div>
                                    <h3 className='text-[20px]'>Dari</h3>
                                    <div className='flex items-center border-2 border-[#051A49] px-4 py-2  rounded-md gap-2 '>
                                        <p>Rp </p>
                                        <input className=' outline-none w-[12vw]' placeholder='Masukkan Gaji Minimal' type="number" onChange={"handleChangeText"} value={''} id='jabatan' name='jabatan' />
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-[20px]'>Sampai</h3>
                                    <div className='flex items-center border-2 border-[#051A49] px-4 py-2  rounded-md gap-2 '>
                                        <p>Rp </p>
                                        <input className=' outline-none w-[12vw]' placeholder='Masukkan Gaji Maksimal' type="number" onChange={"handleChangeText"} value={''} id='jabatan' name='jabatan' />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='bg-white py-8 px-14 w-[40vw] flex flex-col justify-between'>
                    <div>
                        <h1 className='text-[24px] font-medium'>Deskripsi Pekerjaan</h1>
                        <p className='text-[14px] text-[#6C7894] mb-3'>Masukkan kisaran gaji untuk ditawarkan ke kandidat</p>
                        <textarea className='border  border-[#051A49] w-full resize-none h-[35vh] outline-none px-3 py-3 rounded-md'  name="deskripsi" id="deskripsi" cols="30" rows="10"></textarea>
                    </div>
                    <div>
                        <button>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuatIklan