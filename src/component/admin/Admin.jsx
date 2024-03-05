import React from 'react'
import Nav from './Nav/AdminNav'
import Dashboard from './dashboard/AdminDashboard'
import './admin.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import AdminHeader from './header/AdminHeader'
import AddTelecomperson from './addTelecomperson/AddTelecomperson'
import MarketingData from './MarketingData/MarketingData'
import { useRef } from 'react'

const Admin = () => {
  const sidebar=useRef(null)
  const handleClick =() => {
    sidebar.current.classList.add("open-side")
}
  return (
    <div className='Admin-main-display' style={{width:"100%"}}>

     {/* <AdminHeader /> */}

       
        <Nav sidebar={sidebar} />
        <div className='Admin-content'>
          
        <Routes>
          <Route path='/' element={<Dashboard sidebar={sidebar} handleClick={handleClick}/>} />
          <Route path='/addTele' element={<AddTelecomperson sidebar={sidebar} handleClick={handleClick} />} />
          <Route path='/marketing' element={<MarketingData sidebar={sidebar} handleClick={handleClick}/>} />

        </Routes>

      
        </div>
    </div>

  )
}

export default Admin