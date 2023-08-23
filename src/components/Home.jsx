import React, { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddMember from './AddMember';
import { TeamData } from './TeamData';

export default function Home() {
    var userData = localStorage.getItem('userData');
    const {username, role} = userData;
    useEffect(()=>{
        if(username==='' || username=== null) {
            usenavigate("/user-login");
        }
    },[])
    const usenavigate = useNavigate();
    
  return (
    <div>
        <header className="p-3 bg-dark text-white">
            <div className="container-fluid">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        Welcome
                    </a>
                    <div className="text-end">
                        <Link to={'/user-login'}>Logout</Link>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <TeamData />
        </main>
    </div>
  )
}
