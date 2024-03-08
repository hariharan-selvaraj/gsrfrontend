import React, { useRef, useState } from 'react'
import "./login.css"
import Logo from"../../png/gsr.png"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {LOGIN} from '../../services/api'
import {useAuth} from '../Routers/AuthContext'

const Login = () => {

    const nav = useNavigate()

    const {setIsAuthenticate}=useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const myref1 =useRef(null)
    const myref2 =useRef(null)
    const handleClick = () =>{
        myref1.current.classList.add('open')
       
    }
    const handleClick2 = () =>{
        myref2.current.classList.add('open')
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username == "" || password === "") {
            toast.error('please enter the fields !')
        }
        else {
            try{
            const loginData={ email: username, password:password };
            const {data} = await axios.post(LOGIN,{...loginData})
            // console.log(data);
            // setIsAuthenticate(true)
            localStorage.setItem('token',data.token)
            localStorage.setItem('user_id',data.userID)

            data.roleType==0?nav("/admin"):data.roleType==1?nav("/Telecom"):nav("/")
            }
            catch(error) {
                console.log("error +" ,error.response.data.message)
                if(error.response.data.message)
                {
                    toast.error(error.response.data.message)
                }
            }

        }
    }

  return (
    <div className='login'>
        <div className='img-cont'>
         <img src={Logo}/>            
        </div>
        <div className='wrapper-cont'>
            <h2>Welcome</h2>
            <div className='input'>
            <input type='text'  onClick={handleClick} value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <span  className="close" ref={myref1}>Email</span>
            </div>
            <div className='input'>
            <input type='password'  onClick={handleClick2} value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
            <span  className="close" ref={myref2}>Password</span>
            </div>
            <input type='submit' value="Login" onClick={(e)=>handleLogin(e)}  />
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