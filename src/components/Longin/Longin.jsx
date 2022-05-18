import { useState } from "react";
import './Login.css'
import { loginloading, } from "../Redux/Login/Loginaction";
import { loginsuccess } from "../Redux/Login/Loginaction";
import { loginfailure } from "../Redux/Login/Loginaction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Login=()=>{
const [logindata,setLoginData]=useState({});
const dispatch=useDispatch();
const navigate=useNavigate();

const handlechange=(e)=>{
   const {id,value}=e.target;
   setLoginData({...logindata,[id]:value})
}

const senddata=(e)=>{
  e.preventDefault();
  dispatch(loginloading())
  fetch("https://kudachi.herokuapp.com/login",{
      method:"POST",
      body:JSON.stringify(logindata),
      headers:{"content-type":"application/json"}
  }).then(Response=>Response.json()).then((data)=>{dispatch(loginsuccess(data));if(data.token)navigate("/"); else{alert(data.message)}}).catch(dispatch(loginfailure()))
}

  return(
      <div>
     <div className="form_container">
         <div className='signup-img-div'>
                <img width="100%" height="100%" src="https://cdn.dribbble.com/users/919822/screenshots/6634407/untitled-1_4x.jpg?compress=1&resize=1200x900&vertical=top" />
           </div>
         <form onSubmit={senddata} className="form_containe">
             <label  id='lab'>Enter Your Registered Email Id</label><br/>
             <input className='signinp' type='text' id="email" onChange={handlechange} required/><br/><br/>
             <label id='lab'>Enter Your Registered Password </label><br/>
             <input className='signinp' type='text' id="password" onChange={handlechange} required/><br/><br/>
             <input id='subbtn'  type='submit'/>
             
         </form>
     </div>

      </div>
  )
}