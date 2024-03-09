// import React from 'react'
// import './profile.css'
// import { MdEdit } from 'react-icons/md'
// import Popup from 'reactjs-popup'
// import 'reactjs-popup/dist/index.css';

// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { GET_USER, UPDATE_ADMIN_DETAIL, UPDATE_ADMIN_PASSWORD } from '../../../services/api';
// const Profile = ({handleClick}) => {
// const [admin, setAdmin] = useState([]);
// const [selectAdmin, setSelectAdmin] = useState("");

// const adminPopupBox = useRef(null)
// const [refresh, setRefresh] = useState(true);

// const [loading, setLoading] = useState(true)

// const [updateAdmin, setUpdateAdmin] = useState({
//     firstName: "",
//     lastName: "",
//     phoneno: "",
//     gender: "",
//     address: "",
//     city: "",
//     state: "",
// })


// useEffect(() => {
//     setLoading(false)
//     try {
//         const token = localStorage.getItem('token');
//         const userId = localStorage.getItem('user_id');
//         const getAdminDetails = async () => {
//             await axios.get(`${GET_USER}/${userId}`, {
//                 headers: { 'Authorization': `Bearer ${token}` },
//             }).then((response) => { setAdmin(response.data.data); console.log(response.data.data); setLoading(true) }).catch(err => { toast.error("Backend is not available") });

//         }
//         getAdminDetails()
//     }
//     catch (e) {
//         console.log(e)
//     }
// }, [refresh])

// const handleEdit = (id) => {
//     setSelectAdmin(id)
// }

// useEffect(() => {
//     console.log(selectAdmin)
//     const selectedItem = admin.user_id === selectAdmin ? admin : "";
//     if (selectedItem) {
//         setUpdateAdmin({
//             firstName: selectedItem.firstname,
//             lastName: selectedItem.lastname,
//             phoneno: selectedItem.phoneno,
//             gender: selectedItem.gender,
//             address: selectedItem.address,
//             city: selectedItem.city,
//             state: selectedItem.state
//         }
//         )
//     }
// }, [selectAdmin])
// console.log(updateAdmin)


// const updateAdminDetail = async () => {
//     setRefresh(false)
//     try {
//         const token = localStorage.getItem('token');
//         updateAdmin.user_id = localStorage.getItem('user_id');
//         const response = await axios.put(UPDATE_ADMIN_DETAIL, updateAdmin,
//             {
//                 headers: { 'Authorization': `Bearer ${token}` },

//             })
//         if (response.data.success) {
//             toast("updated successfully")
//             setRefresh(true)
//             adminPopupBox.current.close()
//         }
//     }
//     catch (err) {
//         toast.error(err)
//     }

// }



// return (
//     <div>
//         <div className='wrapper-container '>
//             <AdminHeader handleClick={handleClick} title="PROFILE" />
//             {loading ?
//                 (<section className='admin-info'>

//                     <div className='admin-det'>
//                         <h3>Admin Details
//                             <Popup
//                                 trigger={<span><FaEdit onClick={() => { handleEdit(admin.user_id); }} /></span>}
//                                 modal
//                                 ref={adminPopupBox}
//                                 closeOnDocumentClick={false} >
//                                 {close => (
//                                     <div className="popup">
//                                         <h3>Update Admin Details</h3>
//                                         <div className='pop-form1'>
//                                             <input placeholder='First name'
//                                                 value={updateAdmin.firstName}
//                                                 name='firstName'
//                                                 onChange={(e) => setUpdateAdmin({ ...updateAdmin, [e.target.name]: e.target.value })}
//                                             />
//                                             <input placeholder='Last name'
//                                                 value={updateAdmin.lastName}
//                                                 name='lastName'
//                                                 onChange={(e) => setUpdateAdmin({ ...updateAdmin, [e.target.name]: e.target.value })}
//                                             />
//                                             <input placeholder='Phone Number'
//                                                 value={updateAdmin.phoneno}
//                                                 name='phoneno'
//                                                 onChange={(e) => setUpdateAdmin({ ...updateAdmin, [e.target.name]: e.target.value })}
//                                             />
//                                             <select value={updateAdmin.gender} name='gender'
//                                                 onChange={(e) => setUpdateAdmin({ ...updateAdmin, [e.target.name]: e.target.value })}>
//                                                 <option value="">Select gender</option>
//                                                 <option value="Male">Male</option>
//                                                 <option value="Female">Female</option>
//                                             </select>
//                                             <input placeholder='Address'
//                                                 value={updateAdmin.address}
//                                                 name='address'
//                                                 onChange={(e) => setUpdateAdmin({ ...updateAdmin, [e.target.name]: e.target.value })}
//                                             />
//                                             <input placeholder='City'
//                                                 value={updateAdmin.city}
//                                                 name='city'
//                                                 onChange={(e) => setUpdateAdmin({ ...updateAdmin, [e.target.name]: e.target.value })}
//                                             />
//                                             <input placeholder='State'
//                                                 value={updateAdmin.state}
//                                                 name='state'
//                                                 onChange={(e) => setUpdateAdmin({ ...updateAdmin, [e.target.name]: e.target.value })}
//                                             />
//                                         </div>
//                                         <div className="actions1">
//                                             <button className="Admin-header-button-submit" onClick={updateAdminDetail}>UPDATE</button>
//                                             <button className="Admin-header-button-submit" onClick={close}>cancel</button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </Popup>

//                         </h3>
//                         <div className='admin-input'>
//                             <label>First Name:</label>
//                             <h4>{admin.firstname ? admin.firstname : "..."}</h4>

//                         </div>

//                         <div className='admin-input'>
//                             <label>Last Name:</label>
//                             <h4>{admin.lastname ? admin.lastname : "..."}</h4>
//                         </div>

//                         <div className='admin-input'>
//                             <label>Phone Number:</label>
//                             <h4>{admin.phoneno ? admin.phoneno : "..."}</h4>
//                         </div>

//                         <div className='admin-input'>
//                             <label>Gender:</label>
//                             <h4>{admin.gender ? admin.gender : "..."}</h4>
//                         </div>

//                         <div className='admin-input'>
//                             <label>Address:</label>
//                             <h4>{admin.address ? admin.address : "..."}</h4>
//                         </div>

//                         <div className='admin-input'>
//                             <label>City:</label>
//                             <h4>{admin.city ? admin.city : "..."}</h4>
//                         </div>

//                         <div className='admin-input'>
//                             <label>State:</label>
//                             <h4>{admin.state ? admin.state : "..."}</h4>
//                         </div>

//                     </div>
//                     <div className='admin-prof'>
//                         <h3>Admin Info</h3>
//                         <div className='admin-input'>
//                             <label>Admin Id:</label>
//                             <h4>{admin.user_id ? admin.user_id : "..."}</h4>
//                         </div>
//                         <div className='admin-input'>
//                             <label>Email :</label>
//                             <h4>{admin.email ? admin.email : "..."}</h4>
//                         </div>
                       
//                     </div>
//                 </section>) : (<div className='loader-cont'><img src={loader} /></div>)}

//         </div>
//         <ToastContainer
//             position="top-right"
//             autoClose={1000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="dark" />
//     </div>
// )
// }

// export default Profile




