import React, { useRef, useState } from "react";
import "./telemainpage.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { IoMdAddCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";

const TeleMainPage = () => {
  // const data = [{ name: "vin", phoneno: "3534342",status:'true',gender:"male",comment:"good",correction:"" ,id:0}, { name: "prasanth", phoneno: "25343432",status:'true',gender:"male",comment:"dont call again",correction:"" ,id:1 }, { name: "g", status:'true',correction:""  ,id:2}]

  // localStorage.setItem('Marketing',JSON.stringify(data))

  const [datas, setDatas] = useState(
    JSON.parse(localStorage.getItem("marketing")) || []
  );
  const [mistake, setMistake] = useState("");
  const popupRef = useRef(null);



  const [name, setName] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [comment, setComments] = useState("");
  const [isRotating, setRotating] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (name === "" || gender === "" || phoneno === "") {
      return toast.error("Please Enter the Fields !");
    }
    const phoneRegex = /^\d{10}$/;
    console.log(phoneRegex.test(phoneno));
    if (!phoneRegex.test(phoneno)) {
      return toast.error("Valid phone number");
    } else {
      const id = datas.length ? datas[datas.length - 1].id + 1 : 1;
      const AddnewItem = {
        id,
        name,
        phoneno,
        gender,
        comment,
        status: "true",
        correction: "",
      };
      const current = [...datas, AddnewItem];
      setDatas(current);

      localStorage.setItem("marketing", JSON.stringify(current));
      toast("Insert Successfull");
      setName("");
      setPhoneNo("");
      setComments("");
      setGender("");
      popupRef.current.close();
    }
  };

  const handleEdit = (id) => {
    const editedData = datas.map((item) =>
      item.id === Number(id)
        ? { ...item, status: "false", correction: mistake }
        : item
    );
    setDatas(editedData);
    localStorage.setItem("marketing", JSON.stringify(editedData));
    setMistake("");
  };

  const handleRefresh = () => {
    setRotating(true);
    const data = JSON.parse(localStorage.getItem("marketing"));
    setDatas(data);
    setTimeout(() => {
      setRotating(false);
    }, 1000);
  };

  return (
    <div className="Admin-addTelecom-page">
      <div className="Admin-telecom-details">
        <div className="Admin-telecom-header">
          <label>
            {" "}
            <h3>Marketing Data</h3>
          </label>
          <div
            className={`Admin-flex Admin-Refresh`}
            onClick={() => handleRefresh()}
          >
            <IoMdRefresh
              size={"20px"}
              id="refresh"
              className={`${isRotating ? "rotate-color" : "rotate"}`}
            />
            Refresh
          </div>
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
                  <div className="pop-form">
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
                  <div className="actions">
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
          <tbody
            className={
              !isRotating ? "Admin-display-refresh" : "Admin-hide-refresh"
            }
          >
            {datas &&
              datas.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.phoneno}</td>
                    <td>{item.gender}</td>
                    <td>{item.comment}</td>
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
                            <div className="pop-form">
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
                            <div className="actions">
                              <button
                                className="Admin-header-button-submit"
                                onClick={() => {
                                  close();
                                  toast("edited successfully");
                                  handleEdit(item.id);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="Admin-header-button-submit"
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
              })}
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
  );
};

export default TeleMainPage;
