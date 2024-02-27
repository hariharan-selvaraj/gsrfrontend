import React, { useState } from 'react'
import './login.css'
import img from '../../png/gsr.png'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {

    const nav = useNavigate()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");



    const data = [{ name: "vin123@gmail.com", pass: "123", roleType: 1 }, { name: "bala123@gmail.com", pass: "bala", roleType: 0 }];

    const handleLogin = (e) => {
        e.preventDefault();
        if (username == "" || password === "") {
            toast.error('please enter the fields !')
        }
        else {
            console.log(typeof username, password)
            const crt = data.filter((item) => item.name.toLowerCase() === String(username).toLowerCase().trim() && item.pass.toLowerCase() === String(password).trim());
            console.log(crt)
            if (crt === null || crt.length <= 0) {
                toast.error('Invalid gmail or password !')
                setTimeout(() => {
                    nav('/')
                }, 2000)
            }
            else {
                if (Number(crt[0].roleType) == 1) {
                    toast.success('Login Successfull')
                    setTimeout(() => {
                        nav('/telecom')
                    }, 2000)
                }
                else if (Number(crt[0].roleType) == 0) {
                    toast.success('Login Successfull')
                    setTimeout(() => {
                        nav('/admin')
                    }, 2000)
                }
                else {
                    toast.error('Invalid gmail or password !')
                    setTimeout(() => {
                        nav('/')
                    }, 2000)
                }
            }

        }
    }

    return (
        <div className='login-display'>
            <div className='login-logo'>
                <img src={img} alt='logo' width={'70px'} height={'70px'} style={{ borderRadius: "80px", mixBlendMode: "multiply" }} />
            </div>
            <div className='login-inner-display'>
                <div className='login-content'>
                    <div className='login-form-display'>
                        <label className='login-form-name'>Welcome</label>

                        <input type='email' placeholder='Email' value={username} onChange={(e) => setUsername(e.target.value)} required />

                        <input type='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />

                        <button className='login-submit-btn' onClick={(e) => handleLogin(e)}>Login</button>
                    </div>
                </div>
                <div className='login-image'></div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Login