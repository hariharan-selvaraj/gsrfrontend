import axios from 'axios';
import React from 'react'
import { MdDelete } from "react-icons/md";
import { DELETE_PROJECT } from '../../../services/api';
import { useAuth } from '../../Routers/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Project = ({ id, title,desc, location, date ,setIsAdded}) => {
    const { isAuthenticate, setProjectTransition } = useAuth();
    const nav=useNavigate()
    const getDate = () => {
        const utcTimeDate = new Date(date);
        const istTime = utcTimeDate.toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata'
        });
        return istTime;

    }
    const deleteProject = async () => {
        console.log(id)
        await axios.patch(`${DELETE_PROJECT}/${id}`,null,{
            headers:
                { Authorization: `Bearer ${isAuthenticate}` }
        }).then((response)=>{
            if(response.data.success) {
                console.log("Deleted successfully")
                toast('Deleted successfully')
                setIsAdded(true)
            }
        })
    }
    const handleOpenProject = () => {
        setProjectTransition({
            projectId:id,
            projectTitle:title,
            projectLocation:location,
            projectDescription:desc,
        })
        nav("/admin/project-transaction")
    }
    return (
        <div className='project-card' key={id} onClick={handleOpenProject}>
            <div className='project-title'>
                <h2>{title}</h2>
                <h3>{location}</h3>
            </div>
            <div className='date-con'>
                {getDate()}
            </div>
            <div className='delete-project' onClick={deleteProject}><MdDelete /></div>
        </div>
    )
}

export default Project