import React from 'react'
import Nav from './Nav/AdminNav'
import Dashboard from './dashboard/AdminDashboard'
import './admin.css'
import { Outlet } from 'react-router-dom'
import AdminHeader from './header/AdminHeader'
const Admin = () => {
  return (
    <div className='Admin-main-display'>

     <AdminHeader />

        <div className='Admin-display'>
        <div className='Admin-nav'><Nav /></div>
        <div className='Admin-content'>
            hi
        <Outlet />

        </div>
        </div>
    </div>

  )
}

export default Admin