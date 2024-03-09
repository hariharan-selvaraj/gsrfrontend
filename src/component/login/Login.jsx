import React, { useRef, useState } from 'react'
import "./login.css"
import Logo from "../../png/gsr.png"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { LOGIN } from '../../services/api'
import { useAuth } from '../Routers/AuthContext'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { FaRegUserCircle } from "react-icons/fa";

const Login = () => {

    const nav = useNavigate()

    const { setIsAuthenticate } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash />)
    const passwordRef = useRef(null)
    const myref1 = useRef(null)
    const myref2 = useRef(null)
    const handleClick = () => {
        myref1.current.classList.add('open')

    }
    const handleClick2 = () => {
        myref2.current.classList.add('open')
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username == "" || password === "") {
            toast.error('please enter the fields !')
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}$/
        if ((emailRegex.test(username)) == false) {
            toast.error("Invalid email Format")
        }


        else {
            try {
                const loginData = { email: username, password: password };
                await axios.post(LOGIN, { ...loginData }).then(res => {
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('user_id', res.data.userID)
                    res.data.roleType == 0 ? nav("/admin") : res.data.roleType == 1 ? nav("/Telecom") : nav("/")
                }).catch(err => {
                    if (err.code === "ERR_NETWORK") {

                        toast.error("Please connected to Internet")
                    }
                    if (err.response.data.message) {
                        toast.error(err.response.data.message)
                    }
                });
                // console.log(data);
                // setIsAuthenticate(true)

            }
            catch (error) {
                console.log("error +", error.response.data.message)
                if (error.response.data.message) {
                    toast.error(error.response.data.message)
                }
                else {
                    console.log(error)
                }
            }

        }
    }

    let renderIcon = ""
    const showPassword = () => {

        if (passwordRef.current.type == "password") {
            renderIcon = <FaEye></FaEye>
            passwordRef.current.type = "text"
            setPasswordIcon(renderIcon)

        }
        else {
            passwordRef.current.type = "password";
            renderIcon = <FaEyeSlash></FaEyeSlash>
            setPasswordIcon(renderIcon)
            console.log(renderIcon)
        }
    }

    return (
        <div className='login'>
            <div className='img-cont'>
                <img src={Logo} />
            </div>
            <div className='wrapper-cont'>
                <h2>Welcome</h2>
                <div className='input'>
                    <input type='text' onClick={handleClick} value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <span className="close" ref={myref1}>Email</span>
                    <span className=' login-ico user-logo' ><FaRegUserCircle /></span>

                </div>
                <div className='input'>
                    <input type='password' ref={passwordRef} onClick={handleClick2} value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                    <span className=' login-ico user-logo' onClick={showPassword}>{passwordIcon}</span>
                    <span className="close" ref={myref2}>Password</span>
                </div>
                <input type='submit' value="Login" onClick={(e) => handleLogin(e)} />
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