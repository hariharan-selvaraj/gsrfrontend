import React from 'react'
import './admindashboard.css'
const Dashboard = () => {
  return (
    <div className='Admin-dashboard-display'>

      <div className='Admin-dashboard-content'>
        <div className='Admin-dashboard-part'>Telecom
          <div>2</div>
        </div>
        <div className='Admin-dashboard-part'>user
          <div>3</div>
        </div>
        <div className='Admin-dashboard-part'>Admin
          <div>3</div>
        </div>
        <div className='Admin-dashboard-part'>Report
          <div>5</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard