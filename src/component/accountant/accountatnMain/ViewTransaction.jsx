import React, { useEffect, useRef, useState } from 'react'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { GrTransaction } from "react-icons/gr";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { useAuth } from '../../Routers/AuthContext';
import axios from 'axios';
import { CREATE_PROJECT_TRANSACTION, GET_ACCOUNTANT_TRANSACTION, GET_CREDITED_AMOUNT, GET_DEBITED_AMOUNT } from '../../../services/api';
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

    const getDate = (date) => {
        const utcTimeDate = new Date(date);
        const istTime = utcTimeDate.toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata'
        });
        return istTime;

    }

    const handleSubmit = async () => {
        const balance = creditedAmout - debitedAmount
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

            else if(balance - transactions.project_quote){
                toast.error("Invalid or InSuffient Transaction")
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

    const [creditedAmout, setCreditedAmount] = useState(0)
    const [debitedAmount, setDebitedAmount] = useState(0)

    useEffect(() => {
        const getCreditedAmount = async () => {
           await axios.get(`${GET_CREDITED_AMOUNT}/${projectTransition.projectId}`, {
              headers:
                 { Authorization: `Bearer ${isAuthenticate}` }
           }).then((response) => {
              setCreditedAmount(response.data.data[0].credit);
           }).catch((error) => {
              console.error(error)
           });
        }
        getCreditedAmount()
     }, [refresh])

     useEffect(() => {
        const getDebitedAmount = async () => {
           await axios.get(`${GET_DEBITED_AMOUNT}/${projectTransition.projectId}`, {
              headers:
                 { Authorization: `Bearer ${isAuthenticate}` }
           }).then((response) => {
              setDebitedAmount(response.data.data[0].debit);
           }).catch((error) => {
              console.error(error)
           });
        }
        getDebitedAmount()
  
     }, [refresh])
  

    const formattedNumber = (number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(number);

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
                            <h3>Add Transaction  </h3>
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
            <div className='project-info'>
                <div>
                    Project Title : <span>{projectTransition.projectTitle}</span>
                </div>
                <div>
                    Project Id : <span>{projectTransition.projectId}</span>
                </div>

                <div>
                    Project Site Location : <span>{projectTransition.projectLocation}</span>
                </div>

                <div>
                    Project Details :  <span>{projectTransition.projectDescription}</span>
                </div>
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
                                datas.length > 0 ? datas.map((transaction) => {
                                    return (
                                        <tr key={transaction.project_transaction_id}>
                                            <td style={{ textAlign: "center" }}>{transaction.project_transaction_id}</td>
                                            <td className='trans-date'>{getDate(transaction.createAt)}</td>
                                            <td style={{ maxWidth: "200px" }}><span className='trans-details'>{
                                                transaction.transaction_details
                                            }</span></td>
                                            <td>{transaction.transaction_type === "cr" ? "Credit" : "Debit"}</td>
                                            <td><span className={transaction.transaction_type == "cr" ? "trans-amount-cr" : "trans-amount-db"}> {transaction.transaction_type == "cr" ? `${formattedNumber(transaction.project_quote)} ` : `${formattedNumber(transaction.project_quote)}`}</span></td>
                                            <td><span className={transaction.approve_status == 1 ? "trans-pending" : transaction.approve_status == 2 ? "trans-approve" : "trans-decline"}>{transaction.approve_status == 1 ? "Pending" : transaction.approve_status == 2 ? "Approved" : "Declined"}</span></td>
                                        </tr>
                                    )
                                }) : (<td style={{ textAlign: "center" }} colSpan={6}> No Transaction History</td>)
                            }
                        </tbody>
                        : (<div className='loader-cont'><img src={loader} /></div>)}
                </table>

            </div>
            <div className='Total_trans'>
                <div>
                    <span>Credited Rs : {formattedNumber(creditedAmout)}</span>
                    <span>Debited Rs : {formattedNumber(debitedAmount)}</span>
                </div>
                <div>
                    Balance Rs : {formattedNumber(creditedAmout - debitedAmount)}
                </div>
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
