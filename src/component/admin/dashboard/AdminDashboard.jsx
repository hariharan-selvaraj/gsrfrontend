import React, { useEffect, useState } from 'react'
import './admindashboard.css'
import AdminHeader from '../header/AdminHeader'
import DashboardCard from './DashboardCard'
import { FaHeadset } from "react-icons/fa6";
import { SiMarketo } from "react-icons/si";
import { GrUserAdmin } from "react-icons/gr";
import { useAuth } from '../../Routers/AuthContext';
import { toast } from 'react-toastify';
import { GET_MARKETING_DATA_ADMIN } from '../../../services/api';
import axios from 'axios';
const Dashboard = ({sideBar,handleClick}) => {
  
  const [marketData,setMarketingData] = useState([])

  useEffect(() => {
    try {
        const token = localStorage.getItem('token');
        const getAdminDetails = async () => {
            await axios.get(`${GET_MARKETING_DATA_ADMIN}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            }).then((response) => { setMarketingData(response.data.data.length) }
            ).catch(err => { toast.error("Backend is not available") });

        }
        getAdminDetails()
    }
    catch (e) {
        console.log(e)
    }
}, [])

  return (
    <div className='wrapper-container'>
    <AdminHeader handleClick={handleClick} title="DashBoard"/>
    <div className='card-container'>
    <DashboardCard title="Telecom" icon={<FaHeadset/>} count={5}/>
    <DashboardCard title=" Marketing Data" icon={<SiMarketo/>} count={marketData}/>
    <DashboardCard title="Admin" icon={<GrUserAdmin/>} count={2}/>
    </div>


    </div>
  )
}

export default Dashboard