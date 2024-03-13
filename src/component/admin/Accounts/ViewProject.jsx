import React, { useEffect } from 'react'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Routers/AuthContext';
const ViewProject = () => {
const nav=useNavigate() 
const { isAuthenticate, projectTransition} = useAuth();
useEffect(()=>{
    if(projectTransition.projectId==="")
    {
        nav("/admin/accounts")
    }
},[])
  return (
    <div>
    <div className='wrapper-container'>
     <div className='viewpage-project-header'>
        <span><IoArrowBackCircleOutline onClick={()=>{nav("/admin/accounts")}}/></span>
        <h2>{projectTransition.projectTitle}</h2>
        
        <span><MdEditSquare/></span>
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
     {0?(<div className='trans-table-cont'>
          <table className='trans-table'>
             <thead>
                <tr>
                    <th>Account Name</th>
                    <th>Transaction Details</th>
                    <th>Transaction Type</th>
                    <th>Amount</th>
                    <th>STATUS</th>
                    <th>Action</th>
                </tr>
             </thead>
             <tbody>
                <tr>
                    <td>SRINIVASAN K</td>
                    <td>Initial Amount</td>
                    <td>Credit</td>
                    <td>₹500000 +</td>
                    <td><span className='trans-status-pending'>Pending</span></td>
                    <td>Approve</td>
                </tr>
         
             </tbody>
          </table>
     </div>):(<div style={{textAlign:"center"}}> No Transaction History</div>)}
    </div>
    </div>
  )
}

export default ViewProject