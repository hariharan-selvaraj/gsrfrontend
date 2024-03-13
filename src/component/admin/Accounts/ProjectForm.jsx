import Lottie from 'lottie-react';
import React, { useState } from 'react'
import animationData from "../../../Assets/account.json"
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { ADD_PROJECT } from '../../../services/api';
import { useAuth } from '../../Routers/AuthContext';

const ProjectForm = ({formRef,closeForm,setIsAdded}) => {
  const {isAuthenticate,setIsAuthenticated} = useAuth();

    const [projectDetails,setProjectDetails] =useState({
        project_title:"",
        project_site_location:"",
        project_details:""
    })

    const handleSubmit = async() =>{
        if(handleValidationProject())
        {
         projectDetails.user_id=localStorage.getItem("user_id");
            await axios.post(ADD_PROJECT,projectDetails,{
              headers:
              { Authorization: `Bearer ${isAuthenticate}` }
            }).then((response)=>{
                  if(response.data.success) {
                    closeForm();
                    setProjectDetails({project_title:"",project_site_location:"",project_details:""})
                    setIsAdded(true)
                  }

            }).catch((error)=>{
              console.log(error)
            })
        }
    }

    const handleValidationProject = () =>{
     const {project_title,project_site_location,project_details}=projectDetails;
     if(project_title===""|| project_site_location==""|| project_details=="")
     {
        toast.error("Enter All the Fields")
        return false
     }
     const title_regex = /^[a-zA-Z ]+$/
     if(title_regex.test(project_title) == false)
     {
        toast.error("please enter a  valid title")
        return false
     }
     return true
    }
  return (
    <div className='project-form-cont' ref={formRef}>
      
        <div className='close-btn-cont'><RxCrossCircled onClick={closeForm}/></div>
        <div className='form-box'>
            <div className='form-wrapper'>
              <div className='form-cont-form'>
                <h3>Project details</h3>
                 <input type='text' 
                 placeholder='Project title'
                 value={projectDetails.project_title}
                 name='project_title'
                 onChange={(e) => setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value })}
                 />
                 <input type='text'
                  placeholder='Project Site Location'
                  name='project_site_location'
                  value={projectDetails.project_site_location}
                  onChange={(e) => setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value })}
                  />
                 <input type='text' 
                 placeholder='Project Details'
                 name='project_details'
                 value={projectDetails.project_details}
                 onChange={(e) => setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value })}
                 />
               
                 <div className='button-div' onClick={handleSubmit}>
                    Create Project
                 </div>
               
              </div>
              <div className=''>
                <Lottie animationData={animationData}/>
              </div>
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

    </div>
   
  )
}

export default ProjectForm