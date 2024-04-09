import React from "react";
import avatar from "../assets/logo.jpg";
import { useAuth } from "../context/AuthContext";

function Navbar() {
 const {userInfo}=useAuth()
  return (
    <div className="navbar">
      <h1>Overview</h1>
      <div className="info">
        <h4>{ JSON.parse(userInfo).email }</h4>
        <div className="avatar">
          <img src={avatar} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
