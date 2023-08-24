import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import "../index.css";

export default function UserLogin() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [allUsersData, setAllUsersData] = useState([]);

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
        console.log(username);
        console.log(password);

        let spareHolder = [];
        let activeuser;

        await axios.get(`/user/`)
        .then((res)=>{
            // console.log(res.data);
            res.data?.map(each => {
                if(each.team.length !== 0) {
                    each.team.map(innerEach => {
                        if(innerEach.designation === "Mentor") {
                            spareHolder.push(innerEach);
                            if(innerEach.team.length !== 0) {
                                innerEach.team.map(innerSecondEach => {
                                    spareHolder.push(innerSecondEach);
                                })
                            }
                        }else {
                            spareHolder.push(innerEach);
                        }
                    })
                }
            })

            spareHolder.map(each => {
                if(each.username === username && each.password === password) {
                    activeuser = each;
                }
            })

            if(activeuser === undefined) {
                toast.error("Enter valid Credentials");
            }else {
                toast.success('Successfully loggedin');
                localStorage.setItem('userData', JSON.stringify({username: username, role: "user"}));
                usenavigate('/home');
            }

            console.log(spareHolder);
            console.log(activeuser);
            
        })
        .catch((err)=>{
            console.log(err);toast.error("Something Went Wrong")
        })





        // await axios.get(`/user/${username}`)
        // .then((res)=>{
        //     console.log(password)
        //     if(Object.keys(res).length === 0) {
        //         toast.error("Please Enter Valid Username")
        //     } else {
        //         if(res.data.password === password) {
        //             toast.success('Successfully loggedin');
        //             localStorage.setItem('username',username);
        //             usenavigate('/home');
        //         } else {
        //             toast.error("Enter valid Credentials");
        //         }
        //     }
        // })
        // .catch((err)=>{
        //     console.log(err);toast.error("Wrong Username & Password")
        // })
    }

    const getAllUsersData = async () => {
        let spareHolder = [];
        await axios.get(`/user/`)
        .then((res)=>{
            console.log(res.data);
            res.data?.map(each => {
                if(each.team.length !== 0) {
                    each.team.map(innerEach => {
                        if(innerEach.designation === "Mentor") {
                            spareHolder.push(innerEach);
                            if(innerEach.team.length !== 0) {
                                innerEach.team.map(innerSecondEach => {
                                    spareHolder.push(innerSecondEach);
                                })
                            }
                        }else {
                            spareHolder.push(innerEach);
                        }
                    })
                }
            })
        })
        .catch((err)=>{
            console.log(err);toast.error("Something Went Wrong")
        })

        // console.log(spareHolder);
        // setAllUsersData(spareHolder);
    }

    // useEffect(() => {
    //     // getAllUsersData()
    // })
    
  return (
    <>
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="card shadow">
                        <div className="card-title border-bottom">
                            <h2 className="p-3">User Login</h2>
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
                                    <p className='me-2'>Admin Login</p>
                                    <Link to={"/admin-login"} className="">Login</Link>
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
