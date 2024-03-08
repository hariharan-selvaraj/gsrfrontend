import React from 'react'
import AdminHeader from '../header/AdminHeader'
import "./adminprofile.css"
import { FaEdit } from "react-icons/fa";
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { GET_USER, UPDATE_ADMIN_PASSWORD } from '../../../services/api';
import Popup from 'reactjs-popup';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa"
import loader from "../../../Assets/loader.gif"


const AdminProfile = ({ handleClick }) => {
  const [admin, setAdmin] = useState([]);
  const passwordPopupBox = useRef(null)
  const passwordRef=useRef(null)
  const confirmpasswordRef=useRef(null)
  const [passwordIcon, setPasswordIcon] = useState(<FaEyeSlash></FaEyeSlash>)
  const [confirmpasswordIcon, setConfirmPasswordIcon] = useState(<FaEyeSlash></FaEyeSlash>)
  const [loading,setLoading]=useState(true)
  const [adminpassword, setAdminPassword] = useState({
    password: "",
    confirmpassword: "",
  })

  useEffect(() => {
    setLoading(false)
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
      const getAdminDetails = async () => {
       await axios.get(`${GET_USER}/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }).then((response) =>{setAdmin(response.data.data);console.log(response.data.data);setLoading(true)}).catch(err =>{toast.error("Backend is not available")});
      
      }
      getAdminDetails()
    }
    catch (e) {
      console.log(e)
    }
  }, [])


  const handleUpdatePassword = async() => {

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
      if (handleValidatePassword()) {
        adminpassword.user_id = userId;
        const respone = await axios.patch(`${UPDATE_ADMIN_PASSWORD}`,adminpassword,{
          headers: { 'Authorization': `Bearer ${token}` },
        })
        if(respone.data.success)
        {
          toast("Password Updated Successfully")
          passwordPopupBox.current.close();
        }
        
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  const handleValidatePassword = () => {

    const { password, confirmpassword } = adminpassword;

    if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters")
      return false
    }
    if (password != confirmpassword) {
      toast.error("Password and Confirm Password should be the same")
      return false;
    }
    return true;

  }
 let renderIcon=""
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

const showConfirmPassword = ()=>{

if (confirmpasswordRef.current.type == "password") {
    renderIcon = <FaEye />
    confirmpasswordRef.current.type = "text"
    setConfirmPasswordIcon(renderIcon)

}
else {
   confirmpasswordRef.current.type = "password";
    renderIcon = <FaEyeSlash></FaEyeSlash>
    setConfirmPasswordIcon(renderIcon)
    console.log(renderIcon)
}
}



  return (
    <div>
      <div className='wrapper-container '>
        <AdminHeader handleClick={handleClick} title="PROFILE" />
{loading?
        (<section className='admin-info'>

          <div className='admin-det'>
            <h3>Admin Details
              <Popup
                trigger={<span><FaEdit /></span>}
                modal
                closeOnDocumentClick={false} />

            </h3>
            <div className='admin-input'>
              <label>First Name:</label>
              <h4>{admin.firstname ? admin.firstname : "..."}</h4>

            </div>

            <div className='admin-input'>
              <label>Last Name:</label>
              <h4>{admin.lastname ? admin.lastname : "..."}</h4>
            </div>

            <div className='admin-input'>
              <label>Email:</label>
              <h4>{admin.email ? admin.email : "..."}</h4>
            </div>

            <div className='admin-input'>
              <label>Phone Number:</label>
              <h4>{admin.phoneno ? admin.phoneno : "..."}</h4>
            </div>

            <div className='admin-input'>
              <label>Gender:</label>
              <h4>{admin.gender ? admin.gender : "..."}</h4>
            </div>

            <div className='admin-input'>
              <label>Address:</label>
              <h4>{admin.address ? admin.address : "..."}</h4>
            </div>

            <div className='admin-input'>
              <label>City:</label>
              <h4>{admin.city ? admin.city : "..."}</h4>
            </div>

            <div className='admin-input'>
              <label>State:</label>
              <h4>{admin.state ? admin.state : "..."}</h4>
            </div>

          </div>
          <div className='admin-prof'>
            <h3>Admin Info</h3>
            <div className='admin-input'>
              <label>Admin Id:</label>
              <h4>{admin.user_id ? admin.user_id : "..."}</h4>
            </div>
            <div className='admin-input'>
              <label>Email :</label>
              <h4>{admin.email ? admin.email : "..."}</h4>
            </div>
            <div className='btn-cont'>
              <Popup
                trigger={<button > Change password</button>}
                modal
                closeOnDocumentClick={false}
                ref={passwordPopupBox}
              >

                {close => (
                  <div className="popup">
                    <h3>Change Password</h3>
                    <div className='pop-form1'>

                      <div className='input-cont-logo'>
                        <input type="password"
                          placeholder='New password'
                          name='password'
                          onChange={(e) => setAdminPassword({ ...adminpassword, [e.target.name]: e.target.value })}
                          ref={passwordRef}
                        />
                        <span className='user-logo' onClick={showPassword}>{passwordIcon}</span>
                      </div>

                      <div className='input-cont-logo'>
                        <input type="password"
                          placeholder='Confirm password'
                          name='confirmpassword'
                          onChange={(e) => setAdminPassword({ ...adminpassword, [e.target.name]: e.target.value })}
                          ref={confirmpasswordRef}
                        />
                                <span className='user-logo' onClick={showConfirmPassword}>{confirmpasswordIcon}</span>
                                        
                      </div>



                    </div>
                    <div className="actions1">
                      <button className="Admin-header-button-submit" onClick={() => { handleUpdatePassword() }}>UPDATE</button>
                      <button className="Admin-header-button-submit" onClick={() => { close();setPasswordIcon(<FaEyeSlash></FaEyeSlash>);setConfirmPasswordIcon(<FaEyeSlash></FaEyeSlash>) }}>cancel</button>
                    </div>
                  </div>
                )}
              </Popup>


            </div>
          </div>
        </section>):(<div className='loader-cont'><img src={loader}/></div>)}

      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
    </div>
  )
}

export default AdminProfile