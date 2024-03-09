import React, { useRef, useState } from "react";
import "./telemainpage.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { IoMdAddCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import TelecomHeader from "../TeleHeader/TelecomHeader";
import { ADD_MARKET_DATA, GET_TELECOM_MARKET_DATA, UPDATE_MARKET_DATA } from "../../../services/api";
import { useEffect } from "react";
import loader from "../../../Assets/loader.gif"
import axios from 'axios';

const TeleMainPage = ({handleClick}) => {
  // const data = [{ name: "vin", phoneno: "3534342",status:'true',gender:"male",comment:"good",correction:"" ,id:0}, { name: "prasanth", phoneno: "25343432",status:'true',gender:"male",comment:"dont call again",correction:"" ,id:1 }, { name: "g", status:'true',correction:""  ,id:2}]

  // localStorage.setItem('Marketing',JSON.stringify(data))

  const [datas, setDatas] = useState([]);
  const [mistake, setMistake] = useState("");
  const popupRef = useRef(null);
  const [name, setName] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [comment, setComments] = useState("");
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
  const [loading, setLoading] = useState(true)
  const updateRef =useRef(null)
  useEffect(() => {
    setLoading(false)
    try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');
        const getAdminDetails = async () => {
            await axios.get(`${GET_TELECOM_MARKET_DATA}/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            }).then((response) => { setDatas(response.data.data); console.log(response.data.data); setLoading(true) }).catch(err => { toast.error("Backend is not available") });

        }
        getAdminDetails()
    }
    catch (e) {
        console.log(e)
    }
}, [refresh])



  const handleAdd =async (e) => {
    setRefresh(false);
    e.preventDefault();
    if (name === "" || gender === "" || phoneno === "") {
      return toast.error("Please Enter the Fields !");
    }
    const phoneRegex = /^\d{10}$/;
    console.log(phoneRegex.test(phoneno));
    if (!phoneRegex.test(phoneno)) {
      return toast.error("Valid phone number");
    } else {
      console.log("data")
      const token = localStorage.getItem('token');

      const userId = localStorage.getItem('user_id');

      const AddnewItem = {
        name:name,
        phoneno:phoneno,
        gender:gender,
        comments:comment,
        user_id:userId
      };
      console.log(AddnewItem)
      try{
        const response = await axios.post(ADD_MARKET_DATA,AddnewItem,{
          headers: { 'Authorization': `Bearer ${token}` }
        })
        console.log("class " + response)
        if (response.data.success) {
             popupRef.current.close();
            toast("Data added successfully");
            setRefresh(true);
        }
      }
    catch(error){
        toast.error(error.response.data.message)
    }

 
     
    }
  };

  const handleEdit = async (id) => {
      setRefresh(false)
      try{
        const updateItem ={
          market_data_id:id,
          correction:mistake,
        }
        const token = localStorage.getItem('token');
        const response = await axios.patch(UPDATE_MARKET_DATA, updateItem,
            {
                headers: { 'Authorization': `Bearer ${token}` },
            })
            if(response.data.success){
              setRefresh(true);
              toast.success('correction made successfull');
              updateRef.current.click();
            }
      }
      catch(error){
        toast.error(error.response.data.message)
      }


  };

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
    <div className="wrapper-container">
      <TelecomHeader handleClick={handleClick} title="Marketing" />
      {loading?
      <div className="user-info">
        <div className="user-operations">
      <input type="text" placeholder="search by customer name" 
       onChange={(e) => { setKeywords(e.target.value) }}/>
          <div>
            <Popup
              trigger={
                <div className="Admin-telecom-add">
                  {" "}
                  <IoMdAddCircle size={"35px"} />
                </div>
              }
              modal
              closeOnDocumentClick
              ref={popupRef}
            >
              {(close) => (
                <div className="popup">
                  <h3>Add Data</h3>
                  <div className="pop-form1">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="phone no"
                      value={phoneno}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="comments"
                      value={comment}
                      onChange={(e) => setComments(e.target.value)}
                      required
                    />
                    {/* <input
                      type="text"
                      placeholder="Gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    /> */}
                    {/* <input type='' placeholder='role type' required /> */}
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      {" "}
                      <option value={""}>Select gender</option>
                      <option value={"male"}>male</option>
                      <option value={"female"}>female</option>
                      <option value={"other"}>others</option>
                    </select>
                  </div>
                  <div className="actions1">
                    <button
                      className="Admin-header-button-submit"
                      onClick={(e) => {
                        // close();
                        handleAdd(e);
                      }}
                    >
                      submit
                    </button>
                    <button
                      className="Admin-header-button-submit"
                      onClick={close}
                    >
                      cancel
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
        <div className="table-cont">
        <table className="table-container">
          <thead>
            <tr>
              <th>Sno</th>
              <th>name</th>
              <th>phone no</th>
              <th>gender</th>
              <th>comments</th>
              <th>Status</th>

              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {records.length!=0?
              records.map((item, index) => {
                return (
                  <tr key={item.market_data_id}>
                    <td>{item.market_data_id}</td>
                    <td>{item.name}</td>
                    <td>{item.phoneno}</td>
                    <td>{item.gender}</td>
                    <td>{item.comments}</td>
                    <td>
                      <div
                        className={
                          String(item.status) == "true"
                            ? "Admin-market-bg-green"
                            : "Admin-market-bg-red"
                        }
                      >
                        {item.status}
                      </div>
                    </td>

                    <td className="Admin-tele-operation">
                      <Popup
                        trigger={
                          <div className="Admin-telecom-edit">
                            <MdEdit />
                          </div>
                        }
                        modal
                        closeOnDocumentClick
                       
                      >
                        {(close) => (
                          <div className="popup">
                            <h3>Edit Data</h3>
                            <div className="pop-form1">
                              <input
                                type="text"
                                placeholder="Mistake"
                                onChange={(e) => setMistake(e.target.value)}
                                value={mistake}
                                required
                              />
                              {/* <input type='' placeholder='phonenumber' required />
                            <input type='' placeholder='comments' required /> */}
                            </div>
                            <div className="actions1">
                              <button
                                className="Admin-header-button-submit"
                                onClick={() => {
                                  handleEdit(item.market_data_id);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="Admin-header-button-submit"
                                ref={updateRef}
                                onClick={close}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </td>
                  </tr>
                );
              }): (<tr  ><td className="result" colSpan={7}>No Result Found</td></tr>)
            }
          </tbody>
        </table>
        {datas.length > recordsPerPage ? (
                    <div className='pagination'>
                        <ul >
                            <li>
                                <a href="#" className={currentPage == 1 ? "deactive" : "active"} onClick={previousPage} ref={prevRef}>prev</a>
                            </li>
                            <span className='record-num'>{npages==0?0:currentPage}/{npages} </span>
                            <li>
                                <a href="#" className={currentPage == npages ? "deactive" : "active"} onClick={nextPage} ref={nextRef}>next</a>
                            </li>

                        </ul>
                    </div>) : ""}
        
        </div>
    
      </div> :(<div className='loader-cont'><img src={loader}/></div>)}
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
  );
};

export default TeleMainPage;
