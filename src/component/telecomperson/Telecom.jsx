import React ,{useRef} from 'react'
import './telecom.css'
import {  Route, Routes } from 'react-router-dom'
import TelecomNavigation from './telecomNav/TelecomNavigation'
import TeleMainPage from './mainpage/TeleMainpage'
import Profile from './profile/Profile'

const Telecom = () => {
  const sidebar=useRef(null)
  const handleClick =() => {
    sidebar.current.classList.add("open-side")
}
  return (
    <div className='Admin-main-display' style={{width:"100%"}}>

       
        <TelecomNavigation sidebar={sidebar} />
        <div className='Admin-content'>
          
        <Routes>
          <Route path='/' element={<TeleMainPage sidebar={sidebar} handleClick={handleClick}/>} />
          {/* <Route path='/profile' element={<Profile sidebar={sidebar} handleClick={handleClick} />} /> */}
          {/* <Route path='/marketing' element={<MarketingData sidebar={sidebar} handleClick={handleClick}/>} />
          <Route path='/profile' element={<AdminProfile sidebar={sidebar} handleClick={handleClick}/>} /> */}

        </Routes>

      
        </div>
    </div>

  )
}

export default Telecom



