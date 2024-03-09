import React, { useState } from 'react'
import './telecomNavigation.css'
import { useNavigate } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { SiMarketo } from "react-icons/si";
import { VscSignOut } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import logo from "../../../png/gsr.png"
import {Popup} from 'reactjs-popup';
const TelecomNavigation = ({sidebar}) => {
  const nav = useNavigate()
  const sideClose =()=>{
    sidebar.current.classList.remove("open-side")
  }

  
  const [isTrue, setIsTrue] = useState(0);
  return (
    <div className='side-bar' ref={sidebar}>

      <div>
        <h3> <img src={logo}></img>Telecom</h3>
        <ul>
          <li onClick={() => { nav('/telecom'); setIsTrue(0);sideClose()}} className={isTrue === 0 ? "Admin-navigation-cn" : ""}><MdDashboard />Activity</li>
          <li onClick={() => { nav('/telecom/profile'); setIsTrue(1);sideClose() }} className={isTrue === 1 ? "Admin-navigation-cn" : ""}><FaUser />Profile</li>
          {/* <li onClick={() => { nav('/admin/marketing'); setIsTrue(2);sideClose() }} className={isTrue === 2 ? "Admin-navigation-cn" : ""}><SiMarketo />Marketing</li>
          <li onClick={() => { nav('/admin/profile'); setIsTrue(3);sideClose() }} className={isTrue === 3 ? "Admin-navigation-cn" : ""}><CgProfile/>Profile</li> */}
        </ul>
      </div>

      <Popup
        trigger={<div className='logout-cont'> Logout<VscSignOut /></div>}
        modal
        closeOnDocumentClick
      >
        {close => (
          <div className="popup">
            <h2>Do you Want to logout?</h2>
            <div className="actions">
              <button className="admin-header-button" onClick={() => { close(); nav('/') }}>Yes</button>
              <button className="admin-header-button" onClick={close}>No</button>
            </div>
          </div>
        )}
      </Popup>

    </div>
  )
}

export default TelecomNavigation