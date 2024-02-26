import React from 'react'
import './telecom.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import TelecomNavigation from './telecomNav/TelecomNavigation'
import TeleMainPage from './mainpage/TeleMainpage'
import TelecomHeader from './TeleHeader/TelecomHeader'
import Profile from './profile/Profile'

const Telecom = () => {
  return (
    <div className='Telecom-main-display'>

     <TelecomHeader />

        <div className='Telecom-display'>
        <div className='Telecom-nav'><TelecomNavigation /></div>
        <div className='Telecom-content'>
          
        <Routes>
          <Route path='/' element={<TeleMainPage />} />
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/marketing' element={<MarketingData />} /> */}


  
        </Routes>

        </div>
        </div>
    </div>

  )
}

export default Telecom