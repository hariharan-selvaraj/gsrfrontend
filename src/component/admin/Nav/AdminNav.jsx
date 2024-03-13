import React, { useState } from 'react'
import './adminnav.css'
import { useNavigate } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { SiMarketo } from "react-icons/si";
import { VscSignOut } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import logo from "../../../png/gsr.png"
import {Popup} from 'reactjs-popup';
import { GiCash } from "react-icons/gi";
const Nav = ({sidebar}) => {
  const nav = useNavigate()
  const sideClose =()=>{
    sidebar.current.classList.remove("open-side")
  }
  document.getElementById('admin').style.overflowY= 'auto';
  
  const [isTrue, setIsTrue] = useState(0);
  return (
    <div className='side-bar' ref={sidebar}>

      <div>
        <h3> <img src={logo}></img>Admin</h3>
        <ul>
          <li onClick={() => { nav('/admin'); setIsTrue(0);sideClose()}} className={isTrue === 0 ? "Admin-navigation-cn" : ""}><MdDashboard />Dashboard</li>
          <li onClick={() => { nav('/admin/addTele'); setIsTrue(1);sideClose() }} className={isTrue === 1 ? "Admin-navigation-cn" : ""}><FaUser />User Record</li>
          <li onClick={() => { nav('/admin/marketing'); setIsTrue(2);sideClose() }} className={isTrue === 2 ? "Admin-navigation-cn" : ""}><SiMarketo />Marketing</li>
          <li onClick={() => { nav('/admin/accounts'); setIsTrue(3);sideClose() }} className={isTrue === 3 ? "Admin-navigation-cn" : ""}><GiCash/>Accounts</li>
          <li onClick={() => { nav('/admin/profile'); setIsTrue(3);sideClose() }} className={isTrue === 3 ? "Admin-navigation-cn" : ""}><CgProfile/>Profile</li>
     </ul>
      </div>
      {/* <div className='logout-cont'> */}

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
      {/* </div> */}


      {/* <div> Details</div> */}
    </div>
  )
}

export default Nav