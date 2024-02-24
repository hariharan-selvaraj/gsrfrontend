import React from 'react'
import './addTelecomPerson.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoMdAddCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddTelecomperson = () => {

    const data = [{ name: "v" }, { name: "g" }]

    return (
        <div className='Admin-addTelecom-page'>
            <div className='Admin-telecom-details'>
                <div className='Admin-telecom-header'>
                    <lable>Telecom person</lable>
                    <div>
                        <Popup
                            trigger={<div className='Admin-telecom-add'> <IoMdAddCircle size={'35px'} /></div>}
                            modal
                            closeOnDocumentClick
                        >
                            {close => (
                                <div className="popup">
                                    <h3>Add Telecom</h3>
                                    <div className='pop-form'>
                                        <input type='' placeholder='Name' required />
                                        <input type='' placeholder='Email' required />
                                        <input type='' placeholder='password' required />
                                        <input type='' placeholder='confirm password' required />
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
                {
                    data.map((item) => {
                        return (
                            <div className='Admin-telecom-person'>
                                <div>{item.name}</div>
                                <Popup
                                    trigger={<div className='Admin-telecom-edit'> Edit</div>}
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
                                                <button className="Admin-header-button-submit" onClick={() => { close(); }}>Edit</button>
                                                <button className="Admin-header-button-submit" onClick={close}>Cancel</button>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                                <div>
                                    <Popup
                                        trigger={<div className='Admin-telecom-delete'> Delete</div>}
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
                                </div>
                            </div>

                        )
                    })
                }
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