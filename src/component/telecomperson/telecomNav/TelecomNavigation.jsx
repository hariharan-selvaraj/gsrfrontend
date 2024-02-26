import React from 'react'
import './telecomNavigation.css'
import { useNavigate } from 'react-router-dom'
const TelecomNavigation = () => {
  const nav = useNavigate()
  return (
    <div className='Telecom-nav-display'>
        <div onClick={()=>nav('/telecom')}>Activity</div>
        <div onClick={()=>nav('/telecom/profile')}>Settings</div>
    </div>
  )
}

export default TelecomNavigation