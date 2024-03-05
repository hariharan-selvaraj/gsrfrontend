import React from 'react'
import './admindashboard.css'
import AdminHeader from '../header/AdminHeader'
import DashboardCard from './DashboardCard'
import { FaHeadset } from "react-icons/fa6";
import { SiMarketo } from "react-icons/si";
import { GrUserAdmin } from "react-icons/gr";
const Dashboard = ({sideBar,handleClick}) => {
  return (
    <div className='wrapper-container'>
    <AdminHeader handleClick={handleClick} title="DashBoard"/>
    <div className='card-container'>
    <DashboardCard title="Telecom" icon={<FaHeadset/>} count={5}/>
    <DashboardCard title="Marketing Data" icon={<SiMarketo/>} count={6}/>
    <DashboardCard title="Admin" icon={<GrUserAdmin/>} count={2}/>
    </div>


    </div>
  )
}

export default Dashboard