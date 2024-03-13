import React from 'react'
import CountUp from 'react-countup';
const DashboardCard = ({title ,icon,count}) => {
  return (
    <div className='dash-cont'>
    <div className='dash-card'>
        <span>{icon}</span>
        <span>{title}</span>
    </div>
    <div className='count'>
    <CountUp end={count} duration={2}/>
    </div>
    </div> )
}

export default DashboardCard