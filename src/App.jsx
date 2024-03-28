import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from './Page/LandingPage/Pengguna'
import Login from './Page/Auth/Login/Login'
import Daftar from './Page/Auth/Signup/Daftar'
import Perusahaan from './Page/LandingPage/Perusahaan'
import DashboardUser from './Page/Dashboard/User/DashboardUser'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/dashboardUser' element={<DashboardUser/>}/>
        <Route path='/perusahaan' element={<Perusahaan/>}/>
        <Route path='/masuk' element={<Login/>}/>
        <Route path='/daftar' element={<Daftar/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App