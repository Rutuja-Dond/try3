import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import "../index.css"

export default function AdminLogin() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const usenavigate = useNavigate();
    useEffect(()=>{
        localStorage.clear();
    },[])
    const SignIn = (e) => {
        e.preventDefault();
        if(CheckValid()) {
            checkLoginCreds();
        }
    }
    const CheckValid = ()=> {
        let result = true;
        if(username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username')
        }
        if(password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password')
        }
        return result;
    }
    const checkLoginCreds = async() => {
        await axios.get(`/user/${username}`)
        .then((res)=>{
            console.log(password)
            if(Object.keys(res).length === 0) {
                toast.error("Please Enter Valid Username")
            } else {
                if(res.data.password === password) {
                    toast.success('Successfully loggedin');
                    localStorage.setItem('userData', JSON.stringify({username: username, role: "admin"}));
                    usenavigate('/home');
                } else {
                    toast.error("Enter valid Credentials");
                }
            }
        })
        .catch((err)=>{
            console.log(err);toast.error("Wrong Username & Password")
        })
    }
    
  return (
    <>
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="card shadow">
                        <div className="card-title border-bottom">
                            <h2 className="p-3">Admin Login</h2>
                        </div>
                        <div className="card-body text-start">
                            <form onSubmit={SignIn} autoComplete="off">
                                <div className="mb-4">
                                    <label className="form-label">Username</label>
                                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="username" autoComplete="off"/>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Password</label>
                                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" autoComplete="off"/>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-success">Login</button>
                                </div>

                                <div className='mt-2 d-flex admin__user-login-cont'>
                                    <p className='me-2'>User Login</p>
                                    <Link to={"/user-login"} className="">Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
