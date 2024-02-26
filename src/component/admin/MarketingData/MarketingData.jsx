import React, { useState } from 'react'
import './marketingData.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { IoMdAddCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEdit, MdDelete } from "react-icons/md";

const MarketingData = () => {

    const [datas, setDatas] = useState(JSON.parse(localStorage.getItem('marketing')) || []);

    const [name,setName]=useState('');
    const [phoneno,setPhoneNo] =useState("");
    const [gender,setGender]=useState("");
    const [comment,setComments]=useState('');

    const handlePencil = (id) =>{
        const data = datas.filter((item)=>item.id === Number(id))
        console.log(data[0])
        setName(data[0].name)
        setPhoneNo(data[0].phoneno)
        setGender(data[0].gender)
        setComments(data[0].comment)
    }

    const changedelete=(id)=>{

        let current=datas.filter((item)=>((item.id===id) ? "" :item))
        // datas.filter((item)=>(item.id===id)?(item.check===true? "":raise()):"")
        setDatas(current)
        localStorage.setItem('todo_list',JSON.stringify(current))
      }

    const handleEdit = (id) => {
        const editedData = datas.map((item) => item.id === Number(id) ? { ...item, status: 'true', correction: "", phoneno:phoneno, name: name, gender: gender } : item)
        setDatas(editedData)
        localStorage.setItem('marketing', JSON.stringify(editedData))
        setName("")
        setPhoneNo("")
        setGender("")
        setComments("")
    }

    return (
        <div className='Admin-addTelecom-page'>
            <div className='Admin-telecom-details'>
                <div className='Admin-telecom-header'>
                    <lable>Market user data</lable>

                </div>
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
                    <tbody>

                        {
                            datas.map((item, index) => {
                                return (<tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.telecom ? item.telecom : "vin"}</td>
                                    <td>{item.comment}</td>
                                    <td className={item.status === 'true' ? "Admin-market-bg-green" : "Admin-market-bg-red"}><div></div>{item.status}</td>
                                    <td>{item.correction}</td>

                                    <td className='Admin-tele-operation'>
                                        <Popup
                                            trigger={<td className='Admin-telecom-edit'><MdEdit  onClick={()=>handlePencil(item.id)}/></td>}
                                            modal
                                            closeOnDocumentClick={false}
                                        >
                                            {close => (
                                                <div className="popup">
                                                    <h3>Edit Telecom</h3>
                                                    <div className='pop-form'>
                                                        <input type='text' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} required />
                                                        <input type='text' placeholder='phone no' value={phoneno} onChange={(e)=>setPhoneNo(e.target.value)} required />
                                                        <input type='text' placeholder='comments' value={comment} onChange={(e)=>setComments(e.target.value)} required />
                                                        <input type='text' placeholder='gender' value={gender} onChange={(e)=>setGender(e.target.value)} required />

                                                    </div>
                                                    <div className="actions">
                                                        <button className="Admin-header-button-submit" onClick={() => { close(); toast('edited successfully'); handleEdit(item.id) }}>Edit</button>
                                                        <button className="Admin-header-button-submit" onClick={close}>Cancel</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                        <Popup
                                            trigger={<td className='Admin-telecom-delete'> <MdDelete  /></td>}
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

export default MarketingData