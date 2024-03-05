import React from 'react'
import './adminheader.css'
import { IoIosLogOut } from "react-icons/io";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import img from '../../../png/gsr.png'
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa6';
const AdminHeader = ({handleClick,title}) => {

    const nav =useNavigate()

    

    return (
        <div className='admin-title'>
        <span onClick={handleClick}><FaBars/></span>
      {title}</div>
    )
}

export default AdminHeader