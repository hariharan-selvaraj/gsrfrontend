import React from 'react'
import './adminnav.css'
import { useNavigate } from 'react-router-dom'
const Nav = () => {
  const nav = useNavigate()
  return (
    <div className='Admin-nav-display'>
        <div onClick={()=>nav('/admin/Dashboard')}>Dashboard</div>
        <div onClick={()=>nav('/admin')}>Add Telecom</div>
    </div>
  )
}

export default Nav