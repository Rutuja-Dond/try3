import axios from 'axios'
import React, { useEffect,useState } from 'react'

export const TeamData = () => {
    var userData = JSON.parse(localStorage.getItem(('userData')));
    console.log(userData);
    const {username, role} = userData;
    // console.log(username);

    const [records, setRecords] = useState([]);
    const [activeEditRecord, setActiveEditRecord] = useState({id: '', username: "", name: "", designation:'', password:'',age:'', mobile:'', email:''});
    const [userDetails, setUserDetails] = useState([]);

    const getTeamInfo = async () => {
        await axios.get(`http://localhost:3000/user/${username}`)
        .then((res)=>{
            setRecords(res.data.team);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

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

    const onChangeEditInput = (e)=> {
        const newData = {...activeEditRecord};
        newData[e.target.id] = e.target.value;
        console.log(newData);
        setActiveEditRecord(newData);
        // console.log(newData)
    }

    const submitForm = async(e) => {
        e.preventDefault();
        console.log(memberdata);
        let newUserData = {
            id:memberdata.fullName,
            username: memberdata.fullName,
            name:memberdata.fullName,
            password: memberdata.password,
            designation: memberdata.designation,
            mobile: memberdata.mobile,
            age: memberdata.age,
            email: memberdata.email
        }

        // console.log(records);
        // console.log({team: [...records, newUserData]});

        await axios.patch(`http://localhost:3000/user/${username}`,{team: [...records, newUserData]},
        {headers:{"Content-Type" : "application/json"}}).then((res)=>{
           console.log([...records, newUserData])
           setRecords([...records, newUserData]);
        }).catch((err)=>{
            console.log(err)
        })
    }

    const submitEditForm = async (e) => {
        e.preventDefault();
        // console.log(activeEditRecord);

        let updatedRecords = records.map(each => {
            if(each.id === activeEditRecord.id) {
                return activeEditRecord
            }
            return each;
        });

        // console.log(updatedRecords);
        

        await axios.patch(`http://localhost:3000/user/${username}`,{team: updatedRecords},
        {headers:{"Content-Type" : "application/json"}}).then((res)=>{
           console.log(updatedRecords)
           setRecords(updatedRecords)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        if(role === "admin") {
            getTeamInfo()
        }
    },[])

    // useEffect(() => {
    //     if(activeEditRecord.length !== 0) {
    //         console.log(activeEditRecord.name);
    //     }
    // }, [activeEditRecord])

    const onClickDelete = async (data) => {
        let updatedRecords = records.filter(each => each.id !== data.id);
        setRecords(updatedRecords)

        await axios.patch(`http://localhost:3000/user/${username}`,{team: updatedRecords})
        .then((res)=>{
           console.log("delete success")
        }).catch((err)=>{
            console.log(err)
        })
    }

    const adminView = () => {
        return (
            <div className='p-5'>
            <button className='btn btn-info ms-auto d-block mb-5' data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Member</button>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Member Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record,index)=>(                    
                            <tr key={index}>
                                <th scope="row">{index}</th>
                                <td>{record.name}</td>
                                <td>{record.designation}</td>
                                <td>
                                    <button type='button' onClick={() => setActiveEditRecord(record)} data-bs-toggle="modal" data-bs-target="#exampleModalEdit" className='btn btn-info'>Edit</button> 
                                    <button onClick={() => onClickDelete(record)} type='button' className='btn btn-danger'>Delete</button>
                                    <button type='button' className='btn btn-warning'>History</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        )
    }

    const userView = () => {
        return (
            <div className='p-5'>
                <h1>Hello {username}, Have a Nice Day</h1>
            </div>
        )
    }

  return (
    <div>
        
        {role === "user" ? userView() : adminView() }
       
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={(e)=>submitForm(e)}>
                        <div className="modal-body text-start">
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div className="modal fade" id="exampleModalEdit" tabIndex="-1" aria-labelledby="exampleModalEditLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={(e)=>submitEditForm(e)}>
                        <div className="modal-body text-start">
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input onChange={(e)=>onChangeEditInput(e)} value={activeEditRecord.name} type="text" id='name' className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Age</label>
                                <input type="text" onChange={(e)=>onChangeEditInput(e)} value={activeEditRecord.age} id='age' className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mobile No.</label>
                                <input type="text" onChange={(e)=>onChangeEditInput(e)} value={activeEditRecord.mobile} id='mobile' className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email Id.</label>
                                <input type="email" onChange={(e)=>onChangeEditInput(e)} value={activeEditRecord.email} id='email' className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Designation</label>
                                <input type="text" onChange={(e)=>onChangeEditInput(e)} value={activeEditRecord.designation} id='designation' className="form-control" />
                            </div>  
                            <div className="mb-3">
                                <label className="form-label">Initial Username</label>
                                <input type="text" onChange={(e)=>onChangeEditInput(e)} value={activeEditRecord.username} id='username' className="form-control" />
                            </div> 
                            <div className="mb-3">
                                <label className="form-label">Initial Password</label>
                                <input type="text" onChange={(e)=>onChangeEditInput(e)} value={activeEditRecord.password} id='password' className="form-control" />
                            </div>          
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}