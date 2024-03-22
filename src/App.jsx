import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from './Page/LandingPage/LandingPage'
import Login from './Page/Auth/Login/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/masuk' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App