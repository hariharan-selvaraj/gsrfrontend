import React from 'react'
import { FaBars } from 'react-icons/fa6';
const AccountantHeader = ({handleClick,title}) => {
  return (
    <div className='admin-title'>
        <span onClick={handleClick}><FaBars/></span>
      {title}</div>
  )
}

export default AccountantHeader

