import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from './Page/LandingPage/Pengguna'
import Login from './Page/Auth/Login/Login'
import Daftar from './Page/Auth/Signup/Daftar'
import Perusahaan from './Page/LandingPage/Perusahaan'
import DashboardUser from './Page/Dashboard/User/DashboardUser'
import LoginPerusahaan from './Page/Auth/Login/LoginPerusahaan'
import DaftarPerusahaan from './Page/Auth/Signup/DaftarPerusahaan'
import DashboardPerusahaan from './Page/Dashboard/Perusahaan/DashboardPerusahaan'
import ListPerusahaan from './Page/Dashboard/User/ListPerusahaan'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/dashboardUser' element={<DashboardUser/>}/>
        <Route path='/dashboardPerusahaan' element={<DashboardPerusahaan/>}/>
        <Route path='/perusahaan' element={<Perusahaan/>}/>
        <Route path='/masuk' element={<Login/>}/>
        <Route path='/masukPerusahaan' element={<LoginPerusahaan/>}/>
        <Route path='/daftar' element={<Daftar/>}/>
        <Route path='/daftarPerusahaan' element={<DaftarPerusahaan/>}/>
        <Route path='/LihatPerusahaan' element={<ListPerusahaan/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App