import React from 'react'
import './telecomHeader.css'
import { FaBars } from 'react-icons/fa6';

const TelecomHeader = ({handleClick,title}) => {

    

    return (
        <div className='admin-title'>
        <span onClick={handleClick}><FaBars/></span>
      {title}</div>
    )
}

export default TelecomHeader