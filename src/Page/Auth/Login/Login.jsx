import React, { useState } from 'react'
import Navbar from '../../../Component/Navbar/Navbar'
import { TbEye, TbEyeClosed } from "react-icons/tb"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);
    const [open, setOpen] = useState(true)
    const [data, setData] = useState({
        "email": "",
        "password": ""
    })
    const notify = (text) => toast(text);
    const handleChangeText = (e) => {
        const { id, value } = e.target;
        setData((prevCustomer) => ({
            ...prevCustomer,
            [id]: value
        }));
    };
   
    
    const handleSubmit = async () => {
        try {

            const response = await axios.post('https://kerjainbe-production.up.railway.app/api/loginuser', {
                'email': data.email,
                'password': data.password
            }, {
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                setCookie('userID', response.data.id, { path: '/' })
                notify("Berhasil Masuk")
                setTimeout(() => {
                    navigate('/dashboardUser');
                }, 2000);
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
            <div className='bg-[#E5E5E5] h-[100vh] flex flex-row border justify-center items-center'>
                <div className=' '>
                    <h1 className='mb-4'>Apakah anda mencari karyawan? </h1>
                    <div className=' flex flex-col gap-4 bg-white px-10 py-5 lg:px-[72px] lg:py-8 lg:w-[450px]'>
                        <h1 className='font-bold text-[36px]'>Masuk</h1>
                        <div>
                            <p>Email</p>
                            <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                                <input className='outline-none w-[90%] ' type="email" name="email" id="email" onChange={handleChangeText} value={data.email} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
                            </div>
                        </div>
                        <div className='mb-[45px]'>
                            <p>Password</p>
                            <div className=' border border-[#051A49] px-3 py-[6px] flex items-center rounded'>
                                {open ?
                                    (<input className='outline-none w-[90%] ' type="password" name="password" id="password" onChange={handleChangeText} value={data.password} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />) :
                                    (<input className='outline-none w-[90%] ' type="text" name="password" id="password" onChange={handleChangeText} value={data.password} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />)

                                }
                                <button className='text-[24px]' onClick={() => setOpen(!open)}>
                                    {open ? (<TbEyeClosed className='' />) : (<TbEye className='' />)}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <button type="button" className="text-white w-full bg-[#051A49] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"  onClick={handleSubmit}>Masuk</button>
                        </div>
                    </div>
                </div>
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

export default Login