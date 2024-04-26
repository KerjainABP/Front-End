import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import Logo from "../../../assets/Logo.png"
const EditLowongan = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [cookies] = useCookies(['perusahaanID'])
    const perusahaanID = cookies.perusahaanID
    const [data, setData] = useState(null)
    useEffect(() => {
        const perusahaanID = cookies.perusahaanID;

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://kerjainbe-production.up.railway.app/api/user/lowongan/${id}`);
                console.log(response.data)
                setData(response.data)



            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (perusahaanID) {
            fetchData();
        }
    }, [cookies.perusahaanID]); // Memperbarui data saat userID berubah
    const handleChangeText = (e) => {
        const { id, value } = e.target;
        setData((prevCustomer) => ({
            ...prevCustomer,
            [id]: value
        }));
    };
    const handleSubmit = async () => {
        try {
            const response = await axios.put(`https://kerjainbe-production.up.railway.app/api/pt/lowonganperusahaan/edit/${id}`, data);
            setTimeout(() => {
                navigate('/dashboardPerusahaan');
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className=' bg-[#E5E5E5] font-popins' >
            <div className=' px-[144px] py-5 flex items-center gap-[35%] bg-white '>
                <img src={Logo} alt="" />
                <p className='lg:text-[40px] lg:font-bold'>Edit Iklan Lowongan Kerja</p>
            </div>
            <div className='px-[144px] py-20 flex gap-9'>
                <div className='bg-white py-8 px-14 w-[40vw]'>
                    <h1 className='text-[24px] font-medium mb-6 '>Informasi Posisi</h1>
                    <div className='flex flex-col gap-9'>
                        <div>
                            <h3 className='text-[20px]'>Jabatan</h3>
                            <p className='text-[14px] text-[#6C7894] mb-3'>Masukkan nama jabatan (contoh: Front-end Developer)</p>
                            <input className='border-2 border-[#051A49] w-full outline-none rounded-md px-4 py-2' placeholder='Jabatan' type="text" onChange={handleChangeText} value={data?.nama_posisi} id='nama_posisi' name='nama_posisi' />
                        </div>
                        <div>
                            <h3 className='text-[20px]'>Lokasi</h3>
                            <p className='text-[14px] text-[#6C7894] mb-3'>Masukkan daerah, kota, atau wilayah (misalnya Kopo, Bandung)</p>
                            <input className='border-2 border-[#051A49] w-full outline-none rounded-md px-4 py-2' placeholder='Lokasi' type="text" onChange={handleChangeText} value={data?.lokasi} id='lokasi' name='lokasi' />
                        </div>
                        <div>
                            <h3 className='text-[20px]'>Gaji</h3>
                            <p className='text-[14px] text-[#6C7894] mb-3'>Masukkan kisaran gaji untuk ditawarkan ke kandidat</p>
                            <div className='flex gap-7 items-center w-full'>
                                <div>
                                    <h3 className='text-[20px]'>Dari</h3>
                                    <div className='flex items-center border-2 border-[#051A49] px-4 py-2  rounded-md gap-2 '>
                                        <p>Rp </p>
                                        <input className=' outline-none w-[12vw]' placeholder='Masukkan Gaji Minimal' type="number" onChange={handleChangeText} value={data?.gaji_dari} id='gaji_dari' name='gaji_dari' />
                                    </div>
                                </div>
                                <div>
                                    <h3 className='text-[20px]'>Sampai</h3>
                                    <div className='flex items-center border-2 border-[#051A49] px-4 py-2  rounded-md gap-2 '>
                                        <p>Rp </p>
                                        <input className=' outline-none w-[12vw]' placeholder='Masukkan Gaji Maksimal' type="number" onChange={handleChangeText} value={data?.gaji_hingga} id='gaji_hingga' name='gaji_hingga' />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='bg-white py-8 px-14 w-[40vw] flex flex-col justify-between'>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <h1 className='text-[24px] font-medium'>Deskripsi Pekerjaan</h1>
                            <p className='text-[14px] text-[#6C7894] mb-3'>Masukkan kisaran gaji untuk ditawarkan ke kandidat</p>
                            <textarea className='border  border-[#051A49] w-full resize-none h-[20vh] outline-none px-3 py-3 rounded-md' name="deskripsi_pekerjaan" id="deskripsi_pekerjaan" cols="30" rows="10" onChange={handleChangeText} value={data?.deskripsi_pekerjaan}></textarea>
                        </div>
                        <div>
                            <h1 className='text-[24px] font-medium'>Kualifikasi</h1>
                            <textarea className='border  border-[#051A49] w-full resize-none h-[10vh] outline-none px-3 py-3 rounded-md' name="kualifikasi" id="kualifikasi" cols="30" rows="10" onChange={handleChangeText} value={data?.kualifikasi}></textarea>
                        </div>
                        <div>
                            <h3 className='text-[20px]'>Slot</h3>
                            <input className='border-2 border-[#051A49] w-full outline-none rounded-md px-4 py-2' placeholder='Slot' type="number" onChange={handleChangeText} value={data?.slot_posisi} id='slot_posisi' name='slot' />
                        </div>
                    </div>
                    <div>
                        <button onClick={handleSubmit}>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditLowongan