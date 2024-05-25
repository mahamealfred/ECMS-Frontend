import React, {  Component, useEffect, useState } from "react";
import Metrics from "./Metrics";
import Sidebar from "./Sidebar";
import "../scss/Styles.scss";
import { useAuth } from "../context/AuthContext";


// export default class Dashboard extends  Component{
//     render(){
//         return (
// <div className="dashboard">
//       <Sidebar />
//       <Metrics />
//     </div>
//         );
    
//     }
// }


const Dashboard = () => {
    const {auth,userInfo}=useAuth()


    const [token,setToken]=useState("")

    useEffect(() => {
      // Set item in local storage when component mounts
     setToken(auth)
    }, []);

    
  return (
    <>
       {token ? (
        <div className="dashboard">
           <Sidebar userInfo={JSON.parse(userInfo)}/>
          <Metrics />
       </div>
       ) : (
        <p>You need to login</p>
      )}
    </>
 
  )
}

export default Dashboard

