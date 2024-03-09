import React from 'react'
import './adminheader.css'
import { FaBars } from 'react-icons/fa6';
const AdminHeader = ({handleClick,title}) => {
    return (
        <div className='admin-title'>
        <span onClick={handleClick}><FaBars/></span>
      {title}</div>
    )
}

export default AdminHeader