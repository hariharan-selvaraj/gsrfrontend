import React from 'react'
import './telecomHeader.css'
import { IoIosLogOut } from "react-icons/io";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import img from '../../../png/gsr.png'
import { useNavigate } from 'react-router-dom';
const TelecomHeader = () => {
    const nav =useNavigate()
    return (
        <div className='Telecom-header-display'>
          <div className='Telecom-logo'>
                <img src={img} alt='logo' width={'70px'} height={'70px'} style={{borderRadius:"80px"}}/>
            </div>
            <div>Telecom Member</div>
            <Popup
                trigger={<div> <IoIosLogOut size={35} /></div>}
                modal
                closeOnDocumentClick
            >
                {close => (
                    <div className="popup">
                        <h2>Do you Want to logout?</h2>
                        <div className="actions">
                            <button className="Telecom-header-button" onClick={() => {  close();nav('/'); }}>Yes</button>
                            <button className="Telecom-header-button" onClick={close}>No</button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    )
}

export default TelecomHeader