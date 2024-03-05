import React from 'react'

const DashboardCard = ({title ,icon,count}) => {
  return (
    <div className='dash-cont'>
    <div className='dash-card'>
        <span>{icon}</span>
        <span>{title}</span>
    </div>
    <div className='count'>
     {count}
    </div>
    </div> )
}

export default DashboardCard