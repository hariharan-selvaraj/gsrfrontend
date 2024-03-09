import React, { useState } from 'react'
import './telecomNavigation.css'
import { useNavigate } from 'react-router-dom'
const TelecomNavigation = () => {
  const nav = useNavigate()
  const [isTrue,setIsTrue]=useState(0);

  return (
    <div className='Telecom-nav-display'>
        <div onClick={()=>{nav('/telecom');setIsTrue(0)}} className={isTrue===0 ? "Admin-navigation-cn":""}>Activity</div>
        <div onClick={()=>{nav('/telecom/profile');setIsTrue(1)}} className={isTrue===1 ? "Admin-navigation-cn":""}>Personal Info</div>
    </div>
  )
}

export default TelecomNavigation