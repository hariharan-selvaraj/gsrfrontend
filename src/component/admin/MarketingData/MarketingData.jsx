import React, { useEffect, useState, useRef } from 'react'
import './marketingData.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoMdAddCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEdit, MdDelete } from "react-icons/md";
import AdminHeader from '../header/AdminHeader';
import { BiSolidFileExport } from "react-icons/bi";
import { DELETE_MARKETING_DATA_ADMIN, GET_MARKETING_DATA_ADMIN, UPDATE_MARKETING_DATA_ADMIN } from '../../../services/api';
import axios from 'axios';
import loader from "../../../Assets/loader.gif"


const MarketingData = ({ handleClick }) => {

    const [datas, setDatas] = useState([]);
    const [name, setName] = useState('');
    const [phoneno, setPhoneNo] = useState("");
    const [gender, setGender] = useState("");
    const [comment, setComments] = useState('');
    const [isRotating, setRotating] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [keywords, setKeywords] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const filteredData = datas.filter(item => item.name.includes(keywords))
    const records = filteredData.slice(firstIndex, lastIndex)
    const npages = Math.ceil(filteredData.length / recordsPerPage)
    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const updatePopupBox = useRef(null);
    const [refresh, setRefresh] = useState(true);
    const deleteRef = useRef(null);
    const [loading, setLoading] = useState(true)
    // const [updateAdmin, setUpdateAdmin] = useState({
    //     name: "",
    //     phoneno:"",
    //     comments:comment,
    //     gender: gender,

    // })






    const handlePencil = (id) => {
        setSelectedItemId(id);
    };


    useEffect(() => {
        setLoading(false)
        try {
            const token = localStorage.getItem('token');
            const getAdminDetails = async () => {
                await axios.get(`${GET_MARKETING_DATA_ADMIN}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                }).then((response) => { setDatas(response.data.data); console.log(response.data.data); setLoading(true) }).catch(err => { toast.error("Backend is not available") });

            }
            getAdminDetails()
        }
        catch (e) {
            console.log(e)
        }
    }, [refresh])



    useEffect(() => {
        const selectedItem = datas.find(item => item.market_data_id== selectedItemId);
        if (selectedItem) {
            setName(selectedItem.name);
            setPhoneNo(selectedItem.phoneno);
            setGender(selectedItem.gender);
            setComments(selectedItem.comments);
        }
    }, [selectedItemId]);



    const deleteUser = async (id) => {
        setRefresh(false)
        try {

            const token = localStorage.getItem('token');
            const response = await axios.patch(`${DELETE_MARKETING_DATA_ADMIN}/${id}`, null,
                {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
            console.log(deleteRef.current)
            console.log(response.data.success)

            if (response.data.success) {
                toast('deleted successfully');
                setRefresh(true);
                deleteRef.current.click()

            }
        }
        catch (err) {
            toast.error(err.response.data.message)
        }

    }

    const handleEdit = async (id) => {
        console.log(id)
        setRefresh(false)
        try {
            const token = localStorage.getItem('token');

            const updateAdmin = {
                name: name,
                phoneno: phoneno,
                comments: comment,
                gender: gender,
                market_data_id: id,
                status: "true",
            }
            
            console.log(updateAdmin)
            const response = await axios.patch(UPDATE_MARKETING_DATA_ADMIN, updateAdmin,
                {
                    headers: { 'Authorization': `Bearer ${token}` },

                })
            if (response.data.success) {
                toast("updated successfully")
                setRefresh(true)
                updatePopupBox.current.click()
            }
        }
        catch (err) {
            toast.error(err)
        }


    }
    const previousPage = () => {
        if (currentPage != 1) {
            setCurrentPage(currentPage - 1)
        }


    }
    const nextPage = () => {

        if (currentPage != npages && npages != 0) {
            setCurrentPage(currentPage + 1)
        }

    }



    return (
        <div className='wrapper-container'>
            <AdminHeader handleClick={handleClick} title="MARKETING" />
            <div className='user-info'>
                <div className='user-operations'>
                    <input type='text' placeholder='Search By Customer Name'
                        onChange={(e) => { setKeywords(e.target.value) }}
                    />
                    <div className='user-op' >

                        <Popup
                            trigger={<span><BiSolidFileExport /> Export Data</span>}
                            modal
                            closeOnDocumentClick
                        >
                            {close => (
                                <div className="popup">
                                    <h2>Do you Want to Download?</h2>
                                    <div className="actions">
                                        <button className="admin-header-button" onClick={() => { close(); }}>Yes</button>
                                        <button className="admin-header-button" onClick={close}>No</button>
                                    </div>
                                </div>
                            )}
                        </Popup>

                    </div>
                </div>
            </div>
            <div className='table-cont'>
                <table className='table-container'>
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>customer name</th>
                            <th>telecom name</th>
                            <th >comments</th>
                            <th>status</th>
                            <th>Correction</th>

                            <th colSpan={2}>Option</th>
                        </tr>
                    </thead>
                    <tbody className={!isRotating ? "Admin-display-refresh" : "Admin-hide-refresh"}>

                        {
                            records.length != 0 ? (records.map((item, index) => {
                                return (<tr key={item.id}>
                                    <td>{item.market_data_id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.telecom ? item.telecom : "vin"}</td>
                                    <td className='comments-mark'>{item.comments}</td>
                                    <td ><div className={item.status == 'true' ? "Admin-market-bg-green" : "Admin-market-bg-red"}>{item.status}</div></td>
                                    <td>{item.correction}</td>

                                    <td className='Admin-tele-operation'>
                                        <Popup
                                            trigger={<div className='Admin-telecom-edit'><MdEdit onClick={() => { handlePencil(item.market_data_id); handlePencil(item.market_data_id) }} /></div>}
                                            modal
                                            closeOnDocumentClick={false}
                                        >
                                            {close => (
                                                <div className="popup">
                                                    <h3>Edit Telecom</h3>
                                                    <div className='pop-form1'>
                                                        <input type='text' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} required />
                                                        <input type='text' placeholder='phone no' value={phoneno} onChange={(e) => setPhoneNo(e.target.value)} required />
                                                        <input type='text' placeholder='comments' value={comment} onChange={(e) => setComments(e.target.value)} required />
                                                        {/* <input type='text' placeholder='gender' value={gender} onChange={(e) => setGender(e.target.value)} required /> */}
                                                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                                            <option value={""}>select Gender</option>

                                                            <option value={"male"}>male</option>
                                                            <option value={"female"}>female</option>
                                                            <option value={"other"}>others</option>
                                                        </select>
                                                    </div>
                                                    <div className="actions1">
                                                        <button className="Admin-header-button-submit" onClick={() => { handleEdit(item.market_data_id) }}>Edit</button>
                                                        <button className="Admin-header-button-submit" ref={updatePopupBox} onClick={close}>Cancel</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                        <Popup
                                            trigger={<div className='Admin-telecom-delete'> <MdDelete /></div>}
                                            modal
                                            closeOnDocumentClick={false}

                                        >
                                            {close => (
                                                <div className="popup">
                                                    <h2>Do you Want to Delete?</h2>
                                                    <div className="actions">
                                                        <button className="admin-header-button" onClick={() => { deleteUser(item.market_data_id) }} >Yes</button>
                                                        <button className="admin-header-button" ref={deleteRef} onClick={close}>No</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                    </td>
                                </tr>)
                            })) : (<td className="result" colSpan={7}>No Result Found</td>)
                        }

                    </tbody>
                </table>
                {datas.length > recordsPerPage ? (
                    <div className='pagination'>
                        <ul >
                            <li>
                                <a href="#" className={currentPage == 1 ? "deactive" : "active"} onClick={previousPage} ref={prevRef}>prev</a>
                            </li>
                            <span className='record-num'>{currentPage}/{npages} </span>
                            <li>
                                <a href="#" className={currentPage == npages ? "deactive" : "active"} onClick={nextPage} ref={nextRef}>next</a>
                            </li>

                        </ul>
                    </div>) : ""}
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

export default MarketingData