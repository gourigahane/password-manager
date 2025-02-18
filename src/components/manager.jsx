import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { IoIosCopy } from "react-icons/io";
import { HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiFunctionAddLine } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [passarray, setpassarray] = useState([]);
  const [form, setForm] = useState({ site: "", username: "", password: "" });

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpassarray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  const savePassword = () => {
    if(form.site.length >3 && form.username.length >3 && form.password.length >3){

        setpassarray([...passarray, {...form, id: uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passarray, {...form, id: uuidv4()}]))
        console.log([...passarray, form])
        setForm({ site: "", username: "", password: "" })
        toast('Password saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}
else{
    toast('Error: Password not saved!');
}

}

const deletepassword = (id) => {
  console.log("Deleting password with id ", id)
  let c = window.confirm("Do you really want to delete this password?");
  if(c){
      setpassarray(passarray.filter(item=>item.id!==id))
      localStorage.setItem("passwords", JSON.stringify(passarray.filter(item=>item.id!==id))) 
      toast('Password Deleted!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
  }
      
}
const editpassword = (id) => {
         
  console.log("Editing password with id ", id)
  setForm(passarray.filter(i=>i.id===id)[0]) 
  setpassarray(passarray.filter(item=>item.id!==id)) 

}
    

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icon/eye.png")) {
      ref.current.src = "icon/eyecross.png";

      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icon/eye.png";
    }
  };
  return (
    <>
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
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
      <div className="sm:px-6  min-h-[100vh] md:px-20 lg:px-8 mx-auto max-w-4xl py-8 px-40">
      <div className="p-3 min-h-[88.2vh] ">
        <h1 className="text-4xl sm:text-4xl md:text-4xl text-white text font-bold text-center">
          Passkeeper
        </h1>
        <p className="text-white sm:text-lg md:text-lg text-lg text-center">
          Your own Password Manager
        </p>

        <div className=" text-white sm:w-full md:w-full sm:gap-8 md:gap-8 flex gap-8 flex-col p-4">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            name="site"
            className="rounded-full w-full px-4 py-1 border border-purple-800 text-slate-900"
            type="text"
            id="site"
          />
          <div className="flex w-full sm:w-full sm:gap-8 md:w-full flex-col sm:flex-row md:flex-row justify-between md:gap-8 gap-8">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              name="username"
              className="rounded-full w-full px-4 py-1 border border-purple-800 text-slate-900"
              type="text"
              id="username"
            />
            <div className="relative  sm:w-full md:w-full w-full">
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter password"
                name="password"
                className="rounded-full w-full px-4 py-1 border border-purple-800 text-slate-900"
                type="password"
                id="password"
              />
              <span
                className="absolute right-[3px] cursor-pointer top-[3px]"
                onClick={showPassword}
              >
                <img
                  className="p-1"
                  width={26}
                  ref={ref}
                  src="icon/eyecross.png" // Set the initial src value
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className=" flex items-center bg-purple-500 hover:bg-purple-600 text-black sm:w-fit md:w-fit w-fit justify-center font-bold py-2 px-4 rounded"
            type="submit"
          >
            <RiFunctionAddLine />
            Add Password
          </button>
        </div>
        <div className="passwords w-full sm:w-full">
          <h1 className="font-bold text-2xl sm:text-2xl md:text-2xl text-white py-4">Your passwords</h1>
          {passarray.length === 0 && <div>No password show</div>}
          {passarray.length !== 0 && 
            <table className="border-separate md:w-fit  w-full border-spacing-2 border border-slate-400 table-auto text-white rounded-md mb-10 overflow-hidden">
              <thead className="bg-purple-200 text-black">
                <tr>
                  <th className="py-2 border border-slate-300">Site</th>
                  <th className="py-2 border border-slate-300">Username</th>
                  <th className="py-2 border border-slate-300">Password</th>
                  <th className="py-2 border border-slate-300">Manage</th>
                </tr>
              </thead>
              <tbody className="bg-purple-100">
                {passarray.map((item, index) => (
                  <tr key={index}>
                    <td className=" py-2 border text-black border-slate-300 text-center">
                      {" "}
                      <div className="flex items-center justify-center ">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <div
                          className="lordiconcopy w-6 h-5 pl-1 pt-1 cursor-pointer"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <IoIosCopy />
                        </div>
                      </div>
                    </td>
                    <td className=" py-2 border text-black border-slate-300 text-center">
                      <div className="flex items-center justify-center ">
                        {item.username}
                        <div
                          className="lordiconcopy w-6 h-5 pl-1 pt-1 cursor-pointer"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <IoIosCopy />
                        </div>
                      </div>
                    </td>
                    <td className=" py-2 border text-black border-slate-300 text-center">
                      <div className="flex items-center justify-center ">
                        {item.password}
                        <div
                          className="lordiconcopy w-6 h-5 pl-1 pt-1 cursor-pointer"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <IoIosCopy />
                        </div>
                      </div>
                    </td>
                    <td className=" py-2 border text-black border-slate-300 text-center">
                      <div className="flex items-center justify-center ">
                        <div  onClick={()=>{
                          editpassword(item.id)
                        }}
                        className="lordiconcopy w-6 h-5 pl-1 pt-1 cursor-pointer">
                          <HiPencilSquare />
                          </div>
                          <div  onClick={()=>{
                            deletepassword(item.id)
                          }} className="lordiconcopy w-6 h-5 pl-1 pt-1 cursor-pointer">
                          <RiDeleteBin5Fill />
                          </div>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>
      </div>
    </>
  );
};

export default Manager;
