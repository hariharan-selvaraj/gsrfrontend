import React, { useEffect, useRef, useState } from 'react'
import AdminHeader from '../header/AdminHeader'
import "./account.css"
import { FaPlus } from "react-icons/fa";
import ProjectForm from './ProjectForm';
import axios from 'axios';
import { GET_PROJECT } from '../../../services/api';
import { useAuth } from '../../Routers/AuthContext';
import Project from './Project';
import { ToastContainer } from 'react-toastify';

const Account = ({handleClick}) => {
    const formRef=useRef(null)
    const [isAdded,setIsAdded] =useState(false);
    const {isAuthenticate,setIsAuthenticated} = useAuth();
    const [projects,setProjects]=useState([])
    const openForm =()=>{

        formRef.current.classList.add('open-project-form')
        console.log(formRef.current)
    }
    const closeForm =()=>{
        formRef.current.classList.remove('open-project-form')
    }

    useEffect(()=>{
      const getAllProjects = async()=>{
           await axios.get(GET_PROJECT,{
            headers:
            { Authorization: `Bearer ${isAuthenticate}` }
           }).then((response)=>{
            if(response.data.success) {
               setProjects(response.data.data);
            }
           }).catch((error)=>{
            console.log(error);
           })
      }
      getAllProjects()
    },[isAdded])

    console.log(projects)

  return (
    <div className='cont-cont'>
        <div className='wrapper-container '>
        <AdminHeader handleClick={handleClick} title="ACCOUNTS" />
        <div className='create-account-project' >
           <div className='add-project' onClick={openForm}>
            <span><FaPlus/></span>
            <h4>Add Project</h4>
           </div>
            <div className='all-project-cont'>
             {
               projects && projects.map(project =>{
                return (<Project  id={project.project_id} title={project.project_title} location={project.project_site_location} date={project.createAt}
                  setIsAdded={setIsAdded}
                />)
               })
             }
            </div>
           </div>
        </div>
        <ProjectForm formRef={formRef} closeForm={closeForm} setIsAdded={setIsAdded}/>
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
    </div>
  )
}

export default Account