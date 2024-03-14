import React, { useEffect, useState } from 'react'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Routers/AuthContext';
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { GET_ADMIN_TRANSACTION, GET_CREDITED_AMOUNT, GET_DEBITED_AMOUNT, UPDATE_TRANSACTION_STATUS } from '../../../services/api';

const ViewProject = () => {
   const nav = useNavigate()
   const { isAuthenticate, projectTransition } = useAuth();
   const [transaction, setTransaction] = useState([])
   const [refresh, setRefresh] = useState(false)
   const [creditedAmout, setCreditedAmount] = useState(0)
   const [debitedAmount, setDebitedAmount] = useState(0)
   useEffect(() => {
      if (projectTransition.projectId === "") {
         nav("/admin/accounts")
      }
   }, [])

   useEffect(() => {
      const getTransactionDetails = async () => {
         await axios.get(`${GET_ADMIN_TRANSACTION}/${projectTransition.projectId}`, {
            headers:
               { Authorization: `Bearer ${isAuthenticate}` }

         }).then((res) => {
            if (res.data.success) {
               setTransaction(res.data.data)
            }
         }).catch((err) => { console.log(err) });
      }
      getTransactionDetails()
   }, [refresh])

   console.log(transaction)

   const getDate = (date) => {
      const utcTimeDate = new Date(date);
      const istTime = utcTimeDate.toLocaleString('en-US', {
         timeZone: 'Asia/Kolkata'
      });
      return istTime;

   }
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

   console.log(debitedAmount)

   const handleApprove = async (status, id) => {
      setRefresh(false)
      const updatedStatus = {
         approve_status: status,
         project_transaction_id: id,
      }
      await axios.patch(UPDATE_TRANSACTION_STATUS, updatedStatus, {
         headers:
            { Authorization: `Bearer ${isAuthenticate}` }
      }).then((response) => {
         if (response.data.success) {
            setRefresh(true)
         }
      }
      ).catch((error) => {
         console.log(error)
      });
   }

   const formattedNumber = (number) => {
      return new Intl.NumberFormat('en-IN', {
         style: 'currency',
         currency: 'INR'
      }).format(number);

   }
   return (
      <div>
         <div className='wrapper-container'>
            <div className='viewpage-project-header'>
               <span><IoArrowBackCircleOutline onClick={() => { nav("/admin/accounts") }} /></span>
               <h2>{projectTransition.projectTitle}</h2>

               <span><MdEditSquare /></span>
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
            {transaction.length != 0 ? (<div className='trans-table-cont'>
               <table className='trans-table'>
                  <thead>
                     <tr>
                        <th>Accountant Name</th>
                        <th>Transaction Date</th>
                        <th>Transaction Id</th>
                        <th>Transaction Details</th>
                        <th>Transaction Type</th>
                        <th>Amount</th>
                        <th>STATUS</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {transaction.map(transaction => {
                        return (<tr>
                           <td>{transaction.firstname}</td>
                           <td className='trans-date'>{getDate(transaction.createAt)}</td>
                           <td style={{ textAlign: "center" }}>{transaction.project_transaction_id}</td>

                           <td style={{ maxWidth: "200px" }}><span className='trans-details'>{
                              transaction.transaction_details
                           }</span></td>
                           <td>{transaction.transaction_type === "cr" ? "Credit" : "Debit"}</td>

                           <td><span className={transaction.transaction_type == "cr" ? "trans-amount-cr" : "trans-amount-db"}> {transaction.transaction_type == "cr" ? `${formattedNumber(transaction.project_quote)} ` : `${formattedNumber(transaction.project_quote)}`}</span></td>


                           <td><span className={transaction.approve_status == 1 ? "trans-pending" : transaction.approve_status == 2 ? "trans-approve" : "trans-decline"}>{transaction.approve_status == 1 ? "Pending" : transaction.approve_status == 2 ? "Approved" : "Declined"}</span></td>
                           <td className='trans-actions'>
                              <span className={transaction.approve_status == 1 ? "approve-btn" : "disable-approve-btn"}
                                 onClick={() => { handleApprove(2, transaction.project_transaction_id) }}><TiTick /></span>
                              <span className={transaction.approve_status == 1 ? "decline-btn" : "disable-decline-btn"}
                                 onClick={() => { handleApprove(0, transaction.project_transaction_id) }}><IoClose /></span></td>
                        </tr>)
                     })}

                  </tbody>
               </table>

            </div>) : (<div style={{ textAlign: "center" }}> No Transaction History</div>)}
            <div className='Total_trans'>
               <div>
                  <span>Credited Rs : {formattedNumber(creditedAmout)}</span>
                  <span>Debited Rs : {formattedNumber(debitedAmount)}</span>
               </div>
               <div>
                  Balance Rs : {formattedNumber(creditedAmout-debitedAmount)}
               </div>
            </div>
         </div>
      </div>
   )
}

export default ViewProject