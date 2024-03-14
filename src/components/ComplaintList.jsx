import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import "../scss/Styles.scss";
import ComplaintTable from './tables/complaint/ComplaintTable';
const UserList = () => {
  return (
    <div className="dashboard">
       <Sidebar/> 
       <ComplaintTable/>
    </div>
  )
}

export default UserList