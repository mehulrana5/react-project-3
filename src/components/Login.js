import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [cred,setCred]=useState({email:"",password:""});
    const changestate=(e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
    }
    let navigate=useNavigate();
    const handelsubmit=async(e)=>{
        e.preventDefault()
        const response=await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:cred.email,password:cred.password}),
          });
          const json=await response.json();
          if(json.success){
            localStorage.setItem('token',json.jwtToken)
            navigate("/")
          }
          else{
            alert('invalid creds')
          }
          console.log(json);
    }
    return (
        <div>
            <form onSubmit={handelsubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={changestate} value={cred.email} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={changestate} value={cred.password} name="password" type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Login
 