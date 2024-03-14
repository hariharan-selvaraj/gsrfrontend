import React, { useEffect, useRef, useState } from 'react'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { GrTransaction } from "react-icons/gr";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { useAuth } from '../../Routers/AuthContext';
import axios from 'axios';
import { CREATE_PROJECT_TRANSACTION, GET_ACCOUNTANT_TRANSACTION } from '../../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import loader from "../../../Assets/loader.gif"

const ViewTransaction = () => {
    const nav = useNavigate()
    const [transactions, setTransactions] = useState({
        transaction_type: "",
        transaction_details: "",
        project_quote: ""
    })

    const [datas, setDatas] = useState([])

    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(true)


    const { isAuthenticate, projectTransition } = useAuth();
    useEffect(
        () => {
            if (projectTransition.projectId == "") {
                nav('/accountant')
            }
        }
        , [])

    useEffect(() => {
        const data = {
            user_id: localStorage.getItem('user_id'),
            project_id: projectTransition.projectId
        }
        const getDetails = async () => {
            setLoading(false)

            await axios.get(`${GET_ACCOUNTANT_TRANSACTION}/${data.user_id}&${data.project_id}`,
                {
                    headers: { Authorization: `Bearer ${isAuthenticate}` },
                })
                .then((response) => {
                    setDatas(response.data.data);
                    // setRefresh(true);
                    setLoading(true);

                }
                ).catch((error) => {
                    console.log(error)
                })
        }
        getDetails()
    }, [refresh])

    const closeRef = useRef()

    const handleSubmit = async () => {
        setRefresh(false)
        try {
            transactions.project_id = projectTransition.projectId;
            transactions.user_id = localStorage.getItem('user_id');
            if (transactions.project_quote == "" || transactions.transaction_details == "" || transactions.transaction_type == "") {
                toast.error("Please Enter the Transaction Details")
            }

            else if (!isNaN(transactions.project_quote) == false) {
                toast.error("Please enter the Valid amount")
            }

            else {
                const response = await axios.post(CREATE_PROJECT_TRANSACTION, transactions, {
                    headers: {
                        Authorization: `Bearer ${isAuthenticate}`
                    }
                })
                if (response.data.success) {
                    toast.success(`Transaction added successfully!`);
                    closeRef.current.close();
                    setRefresh(true);

                }
            }
        } catch (error) {
            console.log(error)
        }

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
                                <input type='text' placeholder='Transaction_details' required
                                    name='transaction_details'
                                    onChange={(e) => setTransactions({ ...transactions, [e.target.name]: e.target.value })} />
                                <select name='transaction_type' onChange={(e) => setTransactions({ ...transactions, [e.target.name]: e.target.value })}>
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
            <div className='viewpage-trans'>TRANSACTION</div>
            <div className='trans-table-cont'>
                <table className='trans-table'>
                    <thead>
                        <tr>
                            <th>Transaction Id</th>
                            <th>Transaction Date</th>
                            <th>Transaction Details</th>
                            <th>Transaction Type</th>
                            <th>Amount</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    {loading ?
                        <tbody>
                            {
                                datas.length > 0 ? datas.map((item) => {
                                    return (
                                        <tr key={item.project_transaction_id}>
                                            <td>{item.project_transaction_id}</td>
                                            <td>{item.createAt}</td>
                                            <td>{item.transaction_details}</td>
                                            <td>{item.transaction_type}</td>
                                            <td>{item.project_quote}</td>
                                            <td><span className='trans-status-pending'>{item.approve_status}</span></td>
                                        </tr>
                                    )
                                }) : (<td style={{ textAlign: "center" }} colSpan={6}> No Transaction History</td>)
                            }
                        </tbody>
                        : (<div className='loader-cont'><img src={loader} /></div>)}
                </table>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
        </div>)
}

export default ViewTransaction
