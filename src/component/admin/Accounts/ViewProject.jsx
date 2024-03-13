import React from 'react'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Routers/AuthContext';
const ViewProject = () => {
const nav=useNavigate() 
const { isAuthenticate, projectTransition} = useAuth();
  return (
    <div className='view-project'>
     <div className='viewpage-project-header'>
        <span><IoArrowBackCircleOutline onClick={()=>{nav("/admin/accounts")}}/></span>
        <h2>{projectTransition.projectTitle}</h2>
        <span><MdEditSquare/></span>
     </div>
    </div>
  )
}

export default ViewProject