import React from 'react'
import './profile.css'
import { MdEdit } from 'react-icons/md'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    return (
        <div className='Telecom-dashboard-display'>

            <div className='Telecom-dashboard-content'>
                <div className='Telecom-dashboard-part'>
                    <label>Personal Details</label>
                    <div>First Name      : vin</div>
                    <div>Last Name  : ...</div>
                    <div>phone no  : 3454532312</div>
                    <div>Gender    : male</div>
                    <div>Address   : achampathu</div>
                    <div>city      : madurai</div>
                    <div>state     : TamilNadu</div>
                    <Popup
                        trigger={<td className='Telecom-profile-edit'><MdEdit /></td>}
                        modal
                        closeOnDocumentClick
                    >
                        {close => (
                            <div className="popup">
                                <h3>Edit Data</h3>
                                <div className='pop-form'>
                                    <input type='' placeholder='first name' required />
                                    <input type='' placeholder='Last name' required />
                                    <input type='' placeholder='phone number' required />
                                    <input type='' placeholder='gender' required />

                            <input type='' placeholder='address' required />
                            <input type='' placeholder='city' required />
                            <input type='' placeholder='status' required />


                                </div>
                                <div className="actions">
                                    <button className="Admin-header-button-submit" onClick={() => { close(); toast('edited successfully') }}>Edit</button>
                                    <button className="Admin-header-button-submit" onClick={close}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </Popup>        </div>
                <div className='Telecom-dashboard-part-2'>
                    <ul>Profile Info</ul>
                    <li>Email : vin123@gmail.com</li>
                    <li>Employee id : gsr-3</li>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Profile