import React, { useEffect, useState } from 'react'
import './marketingData.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoMdAddCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEdit, MdDelete } from "react-icons/md";

import AdminHeader from '../header/AdminHeader';
import { BiSolidFileExport } from "react-icons/bi";



const MarketingData = ({ handleClick }) => {

    const [datas, setDatas] = useState(JSON.parse(localStorage.getItem('marketing')) || []);

    const [name, setName] = useState('');
    const [phoneno, setPhoneNo] = useState("");
    const [gender, setGender] = useState("");
    const [comment, setComments] = useState('');
    const [isRotating, setRotating] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handlePencil = (id) => {
        setSelectedItemId(id);
    };

    useEffect(() => {
        const selectedItem = datas.find(item => item.id === Number(selectedItemId));
        if (selectedItem) {
            setName(selectedItem.name);
            setPhoneNo(selectedItem.phoneno);
            setGender(selectedItem.gender);
            setComments(selectedItem.comment);
        }
    }, [selectedItemId]);


    const handleRefresh = () => {
        setRotating(true);

        const data = JSON.parse(localStorage.getItem('marketing'))
        setDatas(data)
        // Perform your refresh logic here

        // Optionally, reset the rotation after some time or when the refresh is complete
        setTimeout(() => {
            setRotating(false);
        }, 1000);
    }

    // const handlePencil = (id) => {
    //     const data = datas.filter((item) => item.id === Number(id))
    //     setName(data[0].name)
    //     setPhoneNo(data[0].phoneno)
    //     setGender(data[0].gender)
    //     setComments(data[0].comment)
    // }

    const changedelete = (id) => {

        let current = datas.filter((item) => ((item.id === id) ? "" : item))
        // datas.filter((item)=>(item.id===id)?(item.check===true? "":raise()):"")
        setDatas(current)
        localStorage.setItem('marketing', JSON.stringify(current))
    }

    const handleEdit = (id) => {
        const editedData = datas.map((item) => item.id === Number(id) ? { ...item, status: 'true', correction: "", phoneno: phoneno, name: name, gender: gender, comment: comment } : item)
        setDatas(editedData)
        localStorage.setItem('marketing', JSON.stringify(editedData))
        setName("")
        setPhoneNo("")
        setGender("")
        setComments("")
    }



    return (
        <div className='wrapper-container'>
            <AdminHeader handleClick={handleClick} title="MARKETING" />
            <div className='user-info'>
            <div className='user-operations'>
                    <input type='text' placeholder='Search By Customer Name'></input>
                    <div className='user-op' >
                  
                    <Popup
                                            trigger={  <span><BiSolidFileExport/> Export Data</span>}
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
                        <th>comments</th>
                        <th>status</th>
                        <th>Correction</th>

                        <th colSpan={2}>Option</th>
                    </tr>
                </thead>
                <tbody className={!isRotating ? "Admin-display-refresh" : "Admin-hide-refresh"}>

                    {
                        datas.map((item, index) => {
                            return (<tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.telecom ? item.telecom : "vin"}</td>
                                <td>{item.comment}</td>
                                <td ><div className={item.status == 'true' ? "Admin-market-bg-green" : "Admin-market-bg-red"}>{item.status}</div></td>
                                <td>{item.correction}</td>

                                <td className='Admin-tele-operation'>
                                    <Popup
                                        trigger={<div className='Admin-telecom-edit'><MdEdit onClick={() => { handlePencil(item.id); handlePencil(item.id) }} /></div>}
                                        modal
                                        closeOnDocumentClick={false}
                                    >
                                        {close => (
                                            <div className="popup">
                                                <h3>Edit Telecom</h3>
                                                <div className='pop-form'>
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
                                                <div className="actions">
                                                    <button className="Admin-header-button-submit" onClick={() => { close(); toast('edited successfully'); handleEdit(item.id) }}>Edit</button>
                                                    <button className="Admin-header-button-submit" onClick={close}>Cancel</button>
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
                                                    <button className="admin-header-button" onClick={() => { close(); changedelete(item.id) }}>Yes</button>
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
    )
}

export default MarketingData