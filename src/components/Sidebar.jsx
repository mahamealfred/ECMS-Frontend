import React from "react";
import { IoStatsChartSharp } from "react-icons/io5";
import { HiMusicNote } from "react-icons/hi";
import { FiUsers, FiSettings } from "react-icons/fi";
import { SiDatacamp, Si1001Tracklists } from "react-icons/si";
import Logo from "../assets/logo.png";
import Player from "./Player";
import Button from "./Home/Button";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const {logout,userInfo}=useAuth()
  const navigate=useNavigate()
  const handleLogout=()=>{
    logout()
    navigate("/")
  }

  return (
    <div className="sidebar">
      <div className="upper__container">
        <div className="brand">
          <img src={Logo} alt="EMS" />
        </div>
        <div className="links">
          <ul>
            {
              JSON.parse(userInfo)?.role ==="Admin"?(

                <>
                 <li className="active">
              <IoStatsChartSharp />
            
              <Link to="/dashboard">Overview</Link>
            </li>
            <li>
              <SiDatacamp />
              <Link to="/dashboard/complaint-categories">Category</Link>
            </li>
            <li>
              <SiDatacamp />
              <Link to="/dashboard/organizations">Organization</Link>
            </li>
            <li>
              <SiDatacamp />
              <Link to="/dashboard/questions">Questions</Link>
            </li>
            <li>
            <SiDatacamp />
           
              <Link to="/dashboard/complaints">Complaints</Link>
            </li>
            <li>
            <SiDatacamp />
              
              <Link to="/dashboard/pending-complaints">Pending Complaints</Link>
            </li>
            <li>
            <SiDatacamp />
              
              <Link to="/dashboard/delivered-complaints">Delivered Complaints</Link>
            </li>
            <li>
            <SiDatacamp />
              <Link to="/dashboard/solved-complaints">Resolved Complaints</Link>
            </li>
            <li>
              <FiUsers />
          
              <Link to="/dashboard/users">Users</Link>
            </li>
                </>
              ):JSON.parse(userInfo)?.role ==="Staff"?(
                <>
                  <li className="active">
              <IoStatsChartSharp />
             
              <Link to="/dashboard">Overview</Link>
            </li>
      
            <li>
            <SiDatacamp />
              {/* <a href="/dashboard/new-delivered-complaints">New Complaints</a> */}
              <Link to="/dashboard/new-delivered-complaints">New Complaints</Link>
            </li>
            <li>
            <SiDatacamp />
            
              <Link to="/dashboard/staff-canceled-complaints">Canceled Complaints</Link>
            </li>
            <li>
            <SiDatacamp />
         
              <Link to="/dashboard/staff-solved-complaints">Resolved Complaints</Link>
            </li>
                </>
              ):JSON.parse(userInfo)?.role ==="Analyst"?(
                <>
                  <li className="active">
              <IoStatsChartSharp />
              <a href="/dashboard">Overview</a>
            </li>
      
            <li>
            <SiDatacamp />
              <a href="/dashboard/pending-complaints">Pending Complaints</a>
            </li>
                </>
              ):"Please Login"
            }
          
            <li>
              <FiSettings />
              <a>
              <Button blue text="Logout"  onClick={handleLogout}/>
              </a>
            
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="lower__container">
        <div className="music__container">
          <Player />
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;
