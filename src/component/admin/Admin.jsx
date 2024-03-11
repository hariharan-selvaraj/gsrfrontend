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

const Admin = () => {
  const sidebar=useRef(null)
  const handleClick =() => {
    sidebar.current.classList.add("open-side")
}
const nav =useNavigate()
// useEffect(() =>{
//   const verify =async () => {
//     if(!localStorage.getItem('token'))
//     {
//       nav("/")
//     }
//     else{
//        const token = localStorage.getItem('token');
//         const {data} =await axios.post(VERIFY_USER,{
//           headers: { 'Authorization': `Bearer ${token}` },
//         })
      
//         if(!data.success)
//         {
//           nav("/admin")
//         }
//         else{
//              localStorage.clear()
//              nav("/")
//         }
//          console.log(data)
        
//     }
   
//   }
//   verify()
// },[])
  return (
    <div className='Admin-main-display' style={{width:"100%"}}>
        <Nav sidebar={sidebar} />
        <div className='Admin-content'>
        <Routes>
          <Route path='/' element={<Dashboard sidebar={sidebar} handleClick={handleClick}/>} />
          <Route path='/addTele' element={<AddTelecomperson sidebar={sidebar} handleClick={handleClick} />} />
          <Route path='/marketing' element={<MarketingData sidebar={sidebar} handleClick={handleClick}/>} />
          <Route path='/profile' element={<AdminProfile sidebar={sidebar} handleClick={handleClick}/>} />
        </Routes>
        </div>
    </div>

  )
}

export default Admin