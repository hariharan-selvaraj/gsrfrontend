import React, { useEffect, useRef, useState } from 'react'
import './addTelecomPerson.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEdit, MdDelete } from "react-icons/md";
import { RiUserAddFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { IoMdEye } from "react-icons/io";
import AdminHeader from '../header/AdminHeader';
import axios from 'axios';
import { ADD_USER, DELETE_USER, GET_ALL_USER, GET_USER_PASSWORD, UPDATE_USER } from '../../../services/api';




const AddTelecomperson = ({ handleClick }) => {

    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState("");
    const [isRotating, setRotating] = useState(false);
    const [selectUser, setSelectUserID] = useState("");
    const [newRoleType, setNewRoleType] = useState("");
    const [icons, setIocns] = useState(<FaEyeSlash></FaEyeSlash>)
    const [iconsConfirm, setIconsConfirm] = useState(<FaEyeSlash></FaEyeSlash>)
    const [addUser, setAddUser] = useState({
        firstName: "",
        email: "",
        password: "",
        confirmpassword: "",
        roleType: "",
    });
    const [updateUser, setUpdateUser] = useState({
        user_id: "",
        firstName: "",
        email: "",
        password: "",
        confirmpassword: "",
        roleType: "",
    })

    const addRef = useRef(null)
    const EditRef =useRef(null)
    const Iconref = useRef(null);
    const Iconref2 = useRef(null);



    useEffect(() => {

        try {
            const getData = async () => {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('user_id');
                await axios.get(`${GET_ALL_USER}`,
                    {
                        headers:
                            { Authorization: `Bearer ${token}` }
                        ,
                        data: userId,
                    }).then((res) => { setUsers(res.data.data);console.log(res.data.data) }).catch((error) => { toast.error("Backend is not available") })

            }
            getData()
        }
        catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            }
            else {
                console.log('Error', error.message);
            }
        }

    }, [users])

    const addNewUser = async () => {

        try {

            if (handleValidation(addUser)) {

                const { data } = await axios.post(ADD_USER, { ...addUser })
                console.log("class " + data)
                if (data.success) {

                    addRef.current.close();
                    toast("User added successfully")
                }
            }
        }
        catch (error) {
            if (error.response.data.message) {
                toast.error(error.response.data.message)

            }
        }

    }

    const handleValidation = (user) => {
        const { password, confirmpassword, firstName, email, roleType } = user;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const trimName = firstName.trim();

        if (password == "" || confirmpassword == "" || trimName == "" || email == "") {
            toast.error("Enter All Fields")
            return false
        }
        if (trimName.length < 5) {
            toast.error("Name must be at least 5 characters");
            return false;
        }

        if (password !== confirmpassword) {
            toast.error("Password and Confirm Password should be the same")
            return false;
        }
        if ((emailRegex.test(email)) == false) {
            toast.error("Invalid email Format")
            return false;
        }
        if (roleType == "") {
            toast.error("please select a role type")
            return false
        }
        if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters")
            return false
        }
        return true;
    }
    const getPassword = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${GET_USER_PASSWORD}/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            setPassword(data.data[0].password)
        }
        catch (err) {
            toast.error(err.response.data.message)
        }
    }

    const handleRoleTypeChange = (event) => {
        const newRoleType = parseInt(event.target.value);
        setNewRoleType(newRoleType)
        setUpdateUser({ ...updateUser, [event.target.name]: event.target.value })
    }
    const handleEdit = (id) => {
        setSelectUserID(id)

    }
    useEffect(() => {
        const selectedItem = users.find(item => item.user_id === selectUser);
        if (selectedItem) {
            setUpdateUser({
                user_id: selectedItem.user_id,
                firstName: selectedItem.firstname,
                email: selectedItem.email,
                password: selectedItem.password,
                confirmpassword: selectedItem.password,
                roleType: selectedItem.roleType,
            }
            )
        }

    }, [selectUser])

    const update = async (id) => {


        try {
            if (handleValidation(updateUser)) {
                const token = localStorage.getItem('token');
                console.log(token)
                const response = await axios.put(UPDATE_USER, updateUser,
                    {
                        headers: { 'Authorization': `Bearer ${token}` },

                    })

                if (response.data.success) {
                  
                  console.log(EditRef.current)
                  if (EditRef.current) {
                    EditRef.current.close();
                  }
                    toast('edited successfully');
                 
                    
                  
                }
            }
        }
        catch (err) {
            toast.error(err.response.data.message)
            
        }
    }

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`${DELETE_USER}/${id}`)
            const response = await axios.patch(`${DELETE_USER}/${id}`, null,
                {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
            console.log(response.data)
            if (response.data.success) {
                toast('deleted successfully');
            }
        }
        catch (err) {
            toast.error(err.response.data.message)
        }

    }
    let renderIcon = "";
    const showPassword = () => {
        
        if (Iconref.current.type == "password") {
            renderIcon = <FaEye></FaEye>
            Iconref.current.type = "text"
            setIocns(renderIcon)

        }
        else {
            Iconref.current.type = "password";
            renderIcon = <FaEyeSlash></FaEyeSlash>
            setIocns(renderIcon)
            console.log(renderIcon)
        }
    }

   const showConfirmPassword = ()=>{
    
    if (Iconref2.current.type == "password") {
        renderIcon = <FaEye />
        Iconref2.current.type = "text"
        setIconsConfirm(renderIcon)

    }
    else {
        Iconref2.current.type = "password";
        renderIcon = <FaEyeSlash></FaEyeSlash>
        setIconsConfirm(renderIcon)
        console.log(renderIcon)
    }
   }


    return (<div >

        <div className='wrapper-container'>
            <AdminHeader handleClick={handleClick} title="USERS" />
            <div className='user-info'>
                <div className='user-operations'>
                    <input type='text' placeholder='Search By Name'></input>
                    <div className='user-op'>
                        <Popup
                            trigger={<span><RiUserAddFill /> Add User</span>}
                            modal
                            closeOnDocumentClick={false}
                            ref={addRef}
                        >
                            {close => (
                                <div className="popup">
                                    <h3>Add Employee</h3>
                                    <div className='pop-form1'>
                                        <input
                                            type='text'
                                            placeholder='Name' required
                                            name='firstName'
                                            onChange={(e) => setAddUser({ ...addUser, [e.target.name]: e.target.value })} />
                                        <input type='email' placeholder='Email' required
                                            name='email'
                                            onChange={(e) => setAddUser({ ...addUser, [e.target.name]: e.target.value })} />
                                        <div className='input-cont-logo'>
                                            <input type='password' placeholder='password' required
                                                name='password'
                                                ref={Iconref}
                                                onChange={(e) => setAddUser({ ...addUser, [e.target.name]: e.target.value })} />
                                               <span className='user-logo' onClick={showPassword}>{icons}</span>
                                        </div>
                                        <div className='input-cont-logo'>
                                        <input type='password' placeholder='confirm password' required
                                               ref={Iconref2}
                                            name='confirmpassword'
                                            onChange={(e) => setAddUser({ ...addUser, [e.target.name]: e.target.value })} />
                                                <span className='user-logo' onClick={showConfirmPassword}>{iconsConfirm}</span>
                                        </div>
                                        <select name='roleType' onChange={(e) => setAddUser({ ...addUser, [e.target.name]: e.target.value })}>
                                            <option value={""}>Select Role Type</option>
                                            <option value={0}>Admin</option>
                                            <option value={2}>Accountant</option>
                                            <option value={1}>Telecom</option>
                                        </select>


                                    </div>
                                    <div className="actions1">
                                        <button className="Admin-header-button-submit" onClick={() => { addNewUser() }}>submit</button>
                                        <button className="Admin-header-button-submit" onClick={ ()=> {close();setIocns(<FaEyeSlash></FaEyeSlash>);setIconsConfirm(<FaEyeSlash></FaEyeSlash>)}}>cancel</button>
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </div>
                </div>
            </div>
            <div className='table-cont'>
                <table className='table-redes'>
                    <thead>
                        <tr>
                            <th>Emp ID</th>
                            <th>name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody className={!isRotating ? "Admin-display-refresh" : "Admin-hide-refresh"}>

                        {
                            users && users.map((item, index) => {
                                return (<tr key={index}>
                                    <td>{item.user_id}</td>
                                    <td>{item.firstname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.roleType === 0 ? "ADMIN" : item.roleType == 1 ? "Telecom" : "Accountant"}</td>
                                    <td className='Admin-tele-operation' >
                                        <Popup
                                            trigger={<div className='Admin-telecom-edit'><MdEdit onClick={() => { handleEdit(item.user_id); handleEdit(item.user_id) }} /></div>}
                                            modal
                                            closeOnDocumentClick={false}
                                            ref={EditRef}
                                        >
                                            {close => (
                                                <div className="popup">
                                                    <h3>Edit Telecom</h3>
                                                    <div className='pop-form1'>
                                                        <input type='text'
                                                            placeholder='Name'
                                                            value={updateUser.firstName}
                                                            name='firstName'
                                                            onChange={(e) => setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })}
                                                        />
                                                        <input type='email'
                                                            placeholder='Email '
                                                            value={updateUser.email}
                                                            name='email'
                                                            onChange={(e) => setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })}
                                                        />
                                                      
                                                        <input type='password'
                                                            placeholder='Password'
                                                        
                                                            value={updateUser.password}
                                                            name='password'
                                                            onChange={(e) => setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })}
                                                            
                                                        />
                                                        
                                                        <input type='password'
                                                            placeholder='Confirm Password'
                                                     
                                                            value={updateUser.confirmpassword}
                                                            name='confirmpassword'
                                                            onChange={(e) => setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })}
                                                        />
                                                        

                                                        <select
                                                            value={newRoleType ? newRoleType : item.roleType}
                                                            name="roleType"
                                                            onChange={(e) => { handleRoleTypeChange(e) }}>/
                                                            <option value={2}>Accountant</option>
                                                            <option value={1}>Telecom</option>
                                                        </select>
                                                    </div>
                                                    <div className="actions1">
                                                        <button className="Admin-header-button-submit" onClick={() => { update(item.user_id) }}>UPDATE</button>
                                                        <button className="Admin-header-button-submit" onClick={close}>CANCEL</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                        <Popup
                                            trigger={<div className='Admin-telecom-pass' ><IoMdEye onClick={() => { getPassword(item.user_id) }} /></div>}
                                            modal
                                            closeOnDocumentClick
                                        >
                                            {close => (
                                                <div className="popup">
                                                    <h3>Password</h3>
                                                    <div className='pop-form1'>
                                                        <br />
                                                        {password}
                                                    </div>
                                                    <div className="actions1">
                                                        {/* <button className="Admin-header-button-submit" onClick={() => { close(); toast('edited successfully') }}>Edit</button> */}
                                                        <button className="Admin-header-button-submit" onClick={close}>CLOSE</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                        <Popup
                                            trigger={<div className='Admin-telecom-delete'> <MdDelete /></div>}
                                            modal
                                            closeOnDocumentClick
                                    
                                        >
                                            {close => (
                                                <div className="popup">
                                                    <h2>Do you Want to Delete?</h2>
                                                    <div className="actions">
                                                        <button className="admin-header-button" onClick={() => { deleteUser(item.user_id); close() }}>Yes</button>
                                                        <button className="admin-header-button" onClick={close}>No</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                    </td>
                                </tr>)
                            })
                        }

                    </tbody>
                </table>
            </div>
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
            theme="dark"

        />
    </div>
    )
}

export default AddTelecomperson