import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [cred, setCred] = useState({ name: "", email: "", password: "", cpassword: "" });
    const onchange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    let navigate = useNavigate();
    const handelsubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = cred;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.jwtToken)
            navigate("/")
        }
        else {
            alert('invalid creds')
        }
        console.log(json);
    }
    return (
        <div className='container'>
            <form onSubmit={handelsubmit}>
                <div className="mb-3">
                    <label htmlFor="user_name" className="form-label">User name</label>
                    <input type="text" onChange={onchange} value={cred.user} name="name" className="form-control" id="user_name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={onchange} className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={onchange} className="form-control" name="password" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="user_confirm_psw" className="form-label">Confirmm password</label>
                    <input type="password" onChange={onchange} className="form-control" name="cpassword" id="user_confirm_psw" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
