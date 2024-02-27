import React, { useState } from 'react'
import './adminnav.css'
import { useNavigate } from 'react-router-dom'
const Nav = () => {
  const nav = useNavigate()
  const [isTrue,setIsTrue]=useState(0);
  return (
    <div className='Admin-nav-display'>
        <div onClick={()=>{nav('/admin');setIsTrue(0);}} className={isTrue===0 ? "Admin-navigation-cn":""}>Dashboard</div>
        <div onClick={()=>{nav('/admin/addTele');setIsTrue(1);}} className={isTrue===1 ? "Admin-navigation-cn":""}>User Record</div>
        <div onClick={()=>{nav('/admin/marketing');setIsTrue(2);}} className={isTrue===2 ? "Admin-navigation-cn":""}>Marketing</div>

        {/* <div> Details</div> */}
    </div>
  )
}

export default Nav