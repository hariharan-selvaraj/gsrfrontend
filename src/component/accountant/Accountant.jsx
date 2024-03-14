import React, { useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import AccountantNav from './accountantNav/AccountantNav'
import AccountantProfile from './accountantProfile/AccountantProfile'
import AccountantMain from './accountatnMain/AccountantMain'
import ViewTransaction from './accountatnMain/ViewTransaction'

const Accountant = () => {
    const sidebar = useRef(null)
    const handleClick = () => {
        sidebar.current.classList.add("open-side")
    }
    return (
        <div className='Admin-main-display' style={{ width: "100%" }}>
            <AccountantNav sidebar={sidebar} />
            <div className='Admin-content'>
                <Routes>
                    <Route path='/' element={<AccountantMain sidebar={sidebar} handleClick={handleClick} />} />
                    <Route path='/profile' element={<AccountantProfile sidebar={sidebar} handleClick={handleClick} />} />
                    <Route path='/project-transaction' element={<ViewTransaction sidebar={sidebar} handleClick={handleClick} />} />

                </Routes>


            </div>
        </div>)
}

export default Accountant



