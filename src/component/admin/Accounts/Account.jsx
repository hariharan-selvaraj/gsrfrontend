import React, { useRef, useState } from 'react'
import AdminHeader from '../header/AdminHeader'
import "./account.css"
import { FaPlus } from "react-icons/fa";
import ProjectForm from './ProjectForm';

const Account = ({handleClick}) => {
    const formRef=useRef(null)
    const openForm =()=>{

        formRef.current.classList.add('open-project-form')
        console.log(formRef.current)
    }
    const closeForm =()=>{
        formRef.current.classList.remove('open-project-form')
    }
  return (
    <div className='cont-cont'>
        <div className='wrapper-container '>
        <AdminHeader handleClick={handleClick} title="ACCOUNTS" />
        <div className='create-account-project' >
           <div className='add-project' onClick={openForm}>
            <span><FaPlus/></span>
            <h4>Add Project</h4>
           </div>
           </div>
        </div>
        <ProjectForm formRef={formRef} closeForm={closeForm}/>
    </div>
  )
}

export default Account