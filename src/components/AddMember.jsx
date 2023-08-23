import React, { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddMember = () => {
    const [memberdata, setMemberdata] = useState({
        fullName: '',
        age:'',
        mobile:'',
        email:'',
        designation:'',
        username:'',
        password:'',
    })
    const handle = (e)=> {
        const newData = {...memberdata};
        newData[e.target.id] = e.target.value;
        setMemberdata(newData);
        console.log(newData)
    }
    const submitForm = async(e) => {
        console.log("hello");
        e.preventDefault();
        await axios.post(`http://localhost:3000/user/`,{
            id:memberdata.fullName,
            username: memberdata.fullName,
            name:memberdata.fullName,
            password: memberdata.password,
            designation: memberdata.designation,
            mobile: memberdata.mobile,
            age: memberdata.age,
            email: memberdata.email,
        }).then((res)=>{
           console.log(res.memberdata)
        }).catch((err)=>{
            console.log(err)
        })
       
    }
  return (
    <section>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12 mt-5'>
                    <div className='card med-card mx-auto'>
                        <div className='card-title'>
                            <h3 className='pt-3'>
                                Add Member Details
                            </h3> 
                        </div>
                        <div className='card-body text-start'>
                            <form onSubmit={(e)=> submitForm(e)}>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" onChange={(e)=>handle(e)} value={memberdata.fullName} id='fullName' className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Age</label>
                                    <input type="text" onChange={(e)=>handle(e)} value={memberdata.age} id='age' className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mobile No.</label>
                                    <input type="text" onChange={(e)=>handle(e)} value={memberdata.mobile} id='mobile' className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email Id.</label>
                                    <input type="email" onChange={(e)=>handle(e)} value={memberdata.email} id='email' className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Designation</label>
                                    <input type="text" onChange={(e)=>handle(e)} value={memberdata.designation} id='designation' className="form-control" />
                                </div>  
                                <div className="mb-3">
                                    <label className="form-label">Initial Username</label>
                                    <input type="text" onChange={(e)=>handle(e)} value={memberdata.username} id='username' className="form-control" />
                                </div> 
                                <div className="mb-3">
                                    <label className="form-label">Initial Password</label>
                                    <input type="text" onChange={(e)=>handle(e)} value={memberdata.password} id='password' className="form-control" />
                                </div>          

                                <button type="submit" className="btn btn-primary my-3">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AddMember