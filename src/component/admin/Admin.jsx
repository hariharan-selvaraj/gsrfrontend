import React from 'react'
import Nav from './Nav/AdminNav'
import Dashboard from './dashboard/AdminDashboard'
import './admin.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import AdminHeader from './header/AdminHeader'
import AddTelecomperson from './addTelecomperson/AddTelecomperson'
const Admin = () => {
  return (
    <div className='Admin-main-display'>

     <AdminHeader />

        <div className='Admin-display'>
        <div className='Admin-nav'><Nav /></div>
        <div className='Admin-content'>
          
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/addTele' element={<AddTelecomperson />} />  
        </Routes>

        </div>
        </div>
    </div>

  )
}

export default Admin