import React, { useEffect } from 'react'
import Nav from './Nav/AdminNav'
import Dashboard from './dashboard/AdminDashboard'
import './admin.css'
import { Route, Routes ,useNavigate} from 'react-router-dom'
import AddTelecomperson from './addTelecomperson/AddTelecomperson'
import MarketingData from './MarketingData/MarketingData'
import { useRef } from 'react'
import AdminProfile from './adminProfile/AdminProfile'
import axios from 'axios'
import { VERIFY_USER } from '../../services/api'
import Account from './Accounts/Account'
import ViewProject from './Accounts/ViewProject'

const Admin = () => {
  const sidebar=useRef(null)
  const handleClick =() => {
    sidebar.current.classList.add("open-side")
}
  const nav =useNavigate()




  return (
    <div className='Admin-main-display' style={{width:"100%"}}>
        <Nav sidebar={sidebar} />
        <div className='Admin-content' id="admin">
        <Routes>
          <Route path='/' element={<Dashboard sidebar={sidebar} handleClick={handleClick}/>} />
          <Route path='/addTele' element={<AddTelecomperson sidebar={sidebar} handleClick={handleClick} />} />
          <Route path='/marketing' element={<MarketingData sidebar={sidebar} handleClick={handleClick}/>} />
          <Route path='/profile' element={<AdminProfile sidebar={sidebar} handleClick={handleClick}/>} />
          <Route path='/accounts' element={<Account sidebar={sidebar} handleClick={handleClick}/>} />
          <Route path='/project-transaction' element={<ViewProject />} />
        </Routes>
        </div>
    </div>

  )
}

export default Admin