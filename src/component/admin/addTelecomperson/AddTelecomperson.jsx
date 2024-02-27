import React, { useState } from 'react'
import './addTelecomPerson.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoMdAddCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";

const AddTelecomperson = () => {

    const data = [{ name: "vin", email: "vin123@gmail.com", }, { name: "bala",email:"bala123@gmail.com" }]

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


    return (
        <div className='Admin-addTelecom-page'>
            <div className='Admin-telecom-details'>
                <div className='Admin-telecom-header'>
                    <label><h2>Users</h2> </label>
                    <div className='Admin-flex Admin-search'><label className='Admin-label'>Search</label> <input type='text' placeholder='Name'/></div>
                    <div className={`Admin-flex Admin-Refresh`} onClick={()=>handleRefresh()}>
                        <IoMdRefresh size={'20px'} id='refresh' className={`${isRotating ? 'rotate-color' : 'rotate'}`} />
                        Refresh
                    </div>
                    <div>
                        <Popup
                            trigger={<div className='Admin-telecom-add'> <IoMdAddCircle size={'35px'} /></div>}
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
                                        <input type='' placeholder='role type' required />


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
                <table className='table-container'>
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>name</th>
                            <th>Email</th>
                            <th colSpan={2}>Option</th>
                        </tr>
                    </thead>
                    <tbody className={!isRotating  ? "Admin-display-refresh":"Admin-hide-refresh"}>

                        {
                            data.map((item, index) => {
                                return (<tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td className='Admin-tele-operation'>
                                    <Popup
                                        trigger={<div className='Admin-telecom-edit'><MdEdit /></div>}
                                        modal
                                        closeOnDocumentClick
                                    >
                                        {close => (
                                            <div className="popup">
                                                <h3>Edit Telecom</h3>
                                                <div className='pop-form'>
                                                    <input type='' placeholder='password' required />
                                                    <input type='' placeholder='confirm password' required />
                                                </div>
                                                <div className="actions">
                                                    <button className="Admin-header-button-submit" onClick={() => { close(); toast('edited successfully') }}>Edit</button>
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

export default AddTelecomperson