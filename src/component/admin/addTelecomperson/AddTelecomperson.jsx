import React, { useState } from 'react'
import './addTelecomPerson.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoMdAddCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import Admin from '../Admin';
import AdminHeader from '../header/AdminHeader';

const AddTelecomperson = ({ sidebar, handleClick }) => {

    const data = [{ name: "vin", email: "vin123@gmail.com" ,roltype:1}, { name: "bala", email: "bala123@gmail.com",roltype:0}]

    const [isRotating, setRotating] = useState(false);


    const handleRefresh = () => {
        setRotating(true);

        // const data = JSON.parse(localStorage.getItem('marketing'))
        // setDatas(data)
        // Perform your refresh logic here

        // Optionally, reset the rotation after some time or when the refresh is complete
        setTimeout(() => {
            setRotating(false);
        }, 1000);
    }



    return (<div >
        <div className='wrapper-container'>
            <AdminHeader handleClick={handleClick} title="USERS" />
            <div className='user-info'>
                <div className='user-operations'>
                    <input type='text' placeholder='Search By Name'></input>
                    <div className='user-op'>
                        <Popup
                            trigger={<span><RiUserAddFill /> Add User</span>}
                            modal
                            closeOnDocumentClick
                        >
                            {close => (
                                <div className="popup">
                                    <h3>Add Employee</h3>
                                    <div className='pop-form'>
                                        <input type='' placeholder='Name' required />
                                        <input type='' placeholder='Email' required />
                                        <input type='' placeholder='password' required />
                                        <input type='' placeholder='confirm password' required />
                                        <select>
                                            <option value={""}>Select Role Type</option>
                                            <option value={0}>Admin</option>
                                            <option value={1}>Accountant</option>
                                            <option value={2}>Telecom</option>
                                        </select>


                                    </div>
                                    <div className="actions">
                                        <button className="Admin-header-button-submit" onClick={() => { close(); toast("Insert Successfull") }}>submit</button>
                                        <button className="Admin-header-button-submit" onClick={close}>cancel</button>
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </div>
                </div>
            </div>
            <div className='table-cont'>
                <table className='table-redes'>
                    <tr>
                        <th>Emp ID</th>
                        <th>name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th colSpan={3}>Option</th>
                    </tr>
                    <tbody className={!isRotating ? "Admin-display-refresh" : "Admin-hide-refresh"}>

                        {
                            data.map((item, index) => {
                                return (<tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.roltype ===0?"ADMIN":item.roltype==1?"Telecom":"Accountant"}</td>
                                    <td className='Admin-tele-operation' >
                                        <Popup
                                            trigger={<div className='Admin-telecom-edit'><MdEdit /></div>}
                                            modal
                                            closeOnDocumentClick
                                        >
                                            {close => (
                                                <div className="popup">
                                                    <h3>Edit Telecom</h3>
                                                    <div className='pop-form'>
                                                       <input type='text' placeholder='Name'/>
                                                       <input type='text' placeholder='Email '/>
                                                       <select >
                                                            <option>Admin</option>
                                                            <option>Accountant</option>
                                                            <option>Telecom</option>
                                                       </select>
                                                    </div>
                                                    <div className="actions">
                                                        <button className="Admin-header-button-submit" onClick={() => { close(); toast('edited successfully') }}>Edit</button>
                                                        <button className="Admin-header-button-submit" onClick={close}>Cancel</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                        <Popup
                                            trigger={<div className='Admin-telecom-pass'><IoMdEye /></div>}
                                            modal
                                            closeOnDocumentClick
                                        >
                                            {close => (
                                                <div className="popup">
                                                    <h3>Password</h3>
                                                    <div className='pop-form'>
                                                        {item.email}
                                                        <br />
                                                        {'password'}
                                                    </div>
                                                    <div className="actions">
                                                        {/* <button className="Admin-header-button-submit" onClick={() => { close(); toast('edited successfully') }}>Edit</button> */}
                                                        <button className="Admin-header-button-submit" onClick={close}>Cancel</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                        <Popup
                                            trigger={<div className='Admin-telecom-delete'> <MdDelete /></div>}
                                            modal
                                            closeOnDocumentClick
                                        >
                                            {close => (
                                                <div className="popup">
                                                    <h2>Do you Want to Delete?</h2>
                                                    <div className="actions">
                                                        <button className="admin-header-button" onClick={() => { close(); }}>Yes</button>
                                                        <button className="admin-header-button" onClick={close}>No</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                    </td>
                                </tr>)
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default AddTelecomperson