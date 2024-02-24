import React from 'react'
import './adminheader.css'
import { IoIosLogOut } from "react-icons/io";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import img from '../../../png/gsr.png'
const AdminHeader = () => {
    return (
        <div className='Admin-header-display'>
          <div className='admin-logo'>
                <img src={img} alt='logo' width={'70px'} height={'70px'} style={{borderRadius:"80px"}}/>
            </div>
            <div>Admin</div>
            <Popup
                trigger={<div> <IoIosLogOut size={35} /></div>}
                modal
                closeOnDocumentClick
            >
                {close => (
                    <div className="popup">
                        <h2>Do you Want to logout?</h2>
                        <div className="actions">
                            <button className="admin-header-button" onClick={() => {  close(); }}>Yes</button>
                            <button className="admin-header-button" onClick={close}>No</button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    )
}

export default AdminHeader