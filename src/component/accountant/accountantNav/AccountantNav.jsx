import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { SiMarketo } from "react-icons/si";
import { VscSignOut } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import logo from "../../../png/gsr.png"
import { Popup } from 'reactjs-popup';
const AccountantNav = ({ sidebar }) => {
    const nav = useNavigate()
    const sideClose = () => {
        sidebar.current.classList.remove("open-side")
    }


    const [isTrue, setIsTrue] = useState(0);
    return (
        <div className='side-bar' ref={sidebar}>

        <div>
            <h3> <img src={logo}></img>Accoutant</h3>
            <ul>
                <li onClick={() => { nav('/accountant'); setIsTrue(0); sideClose() }} className={isTrue === 0 ? "Admin-navigation-cn" : ""}><MdDashboard />Activity</li>
                <li onClick={() => { nav('/accountant/profile'); setIsTrue(1); sideClose() }} className={isTrue === 1 ? "Admin-navigation-cn" : ""}><FaUser />Profile</li>
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

export default AccountantNav