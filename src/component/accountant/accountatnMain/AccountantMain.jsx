import React, { useRef, useState } from 'react'
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { IoMdAddCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit } from "react-icons/md";
import { GET_PROJECT } from "../../../services/api";
import { useEffect } from "react";
import loader from "../../../Assets/loader.gif"
import axios from 'axios';
import AccountantHeader from '../accountantHeader/AccountantHeader';
import { useAuth } from '../../Routers/AuthContext';
import { useNavigate } from 'react-router-dom';
import './accountmain.css'
const AccountantMain = ({ handleClick }) => {

    const nav= useNavigate()
    const [datas, setDatas] = useState([]);

    const [keywords, setKeywords] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const filteredData = datas.filter(item => item.project_title.includes(keywords))
    const records = filteredData.slice(firstIndex, lastIndex)
    const npages = Math.ceil(filteredData.length / recordsPerPage)
    const nextRef = useRef(null);
    const prevRef = useRef(null);

    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(true)
    const { isAuthenticate,setProjectTransition } = useAuth();

    useEffect(() => {
        setLoading(false)
        try {
            const getAdminDetails = async () => {
                await axios.get(`${GET_PROJECT}`, {
                    headers: { 'Authorization': `Bearer ${isAuthenticate}` },
                }).then((response) => { setDatas(response.data.data); setLoading(true) }).catch(err => { toast.error("Backend is not available") });

            }
            getAdminDetails()
        }
        catch (e) {
            console.log(e)
        }
    }, [refresh])


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

    const handleEdit = () => {
        nav("/accountant/project-transaction")
    }

    return (
        <div className="wrapper-container">
            <AccountantHeader handleClick={handleClick} title="Accounts Details" />
            {loading ?
                <div className="user-info">
                    <div className="user-operations">
                        <input type="text" placeholder="search by project Title"
                            onChange={(e) => { setKeywords(e.target.value) }} />
                    </div>
                    <div className="table-cont">
                        <table className="table-container">
                            <thead>
                                <tr>
                                    <th>Sno</th>
                                    <th>Title</th>
                                    <th>Site location</th>
                                    <th>Details</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.length != 0 ?
                                    records.map((item, index) => {
                                        return (
                                            <tr key={item.project_id}>
                                                <td>{item.project_id}</td>
                                                <td>{item.project_title}</td>
                                                <td>{item.project_site_location}</td>
                                                <td>{item.project_details}</td>


                                                <td className="Admin-tele-operation accoutant-edit-btn" style={{textAlign:"center"}}>
                                                <MdEdit onClick={() => {
                                                        setProjectTransition({
                                                            projectId: item.project_id,
                                                            projectTitle: item.project_title,
                                                            projectLocation:item.project_site_location,
                                                            projectDescription:item.project_details
                                                        });handleEdit()
                                                    }} />

                                                </td>
                                            </tr>
                                        );
                                    }) : (<tr  ><td className="result" colSpan={7}>No Result Found</td></tr>)
                                }
                            </tbody>
                        </table>
                        {datas.length > recordsPerPage ? (
                            <div className='pagination'>
                                <ul >
                                    <li>
                                        <a href="#" className={currentPage == 1 ? "deactive" : "active"} onClick={previousPage} ref={prevRef}>prev</a>
                                    </li>
                                    <span className='record-num'>{npages == 0 ? 0 : currentPage}/{npages} </span>
                                    <li>
                                        <a href="#" className={currentPage == npages ? "deactive" : "active"} onClick={nextPage} ref={nextRef}>next</a>
                                    </li>

                                </ul>
                            </div>) : ""}

                    </div>

                </div> : (<div className='loader-cont'><img src={loader} /></div>)}
        </div>
    )
}

export default AccountantMain