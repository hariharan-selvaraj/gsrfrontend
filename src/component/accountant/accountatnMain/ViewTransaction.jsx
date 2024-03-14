import React, { useEffect, useRef, useState } from 'react'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { GrTransaction } from "react-icons/gr";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { useAuth } from '../../Routers/AuthContext';
const ViewTransaction = () => {
    const nav = useNavigate()
    const [transactions,setTransactions]=useState({
        transaction_type:"",
        project_quote:""
    })
    const { isAuthenticate, projectTransition } = useAuth();
    useEffect(
        ()=>{
            if(projectTransition.projectId==""){
                nav('/accountant')
            }
        }
    )

    const closeRef =useRef()

    const handleSubmit = ()=>{

        

        console.log("submited")
        closeRef.current.close();
    }

  return (
        <div className='view-project'>
            <div className='viewpage-project-header'>
                <span><IoArrowBackCircleOutline onClick={() => { nav("/accountant") }} /></span>
                <h2>{projectTransition.projectTitle}</h2>
                

                <Popup
                            trigger={<span className='trans'><GrTransaction />Transaction</span>}
                            modal
                            closeOnDocumentClick={false}
                            ref={closeRef}
                        >
                            {close => (
                                <div className="popup">
                                    <h3>Add Employee</h3>
                                    <div className='pop-form1'>
                                        <input type='text' placeholder='project_quote' required
                                            name='project_quote'
                                            onChange={(e) => setTransactions({ ...transactions, [e.target.name]: e.target.value })} />
                                        <select name='transation_type' onChange={(e) => setTransactions({ ...transactions, [e.target.name]: e.target.value })}>
                                            <option value={""}>Select transaction type</option>
                                            <option value={"cr"}>credit</option>
                                            <option value={"dr"}>debit</option>
                                        </select>


                                    </div>
                                    <div className="actions1">
                                        <button className="Admin-header-button-submit" onClick={() => { handleSubmit() }}>submit</button>
                                        <button className="Admin-header-button-submit" onClick={() => { close(); }} >cancel</button>
                                    </div>
                                </div>
                            )}
                        </Popup>

            </div>
        </div>)
}

export default ViewTransaction
