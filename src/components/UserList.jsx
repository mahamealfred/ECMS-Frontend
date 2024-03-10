import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import "../scss/Styles.scss";
import UserTable from './tables/UserTable';
const UserList = () => {
  return (
    <div className="dashboard">
       <Sidebar/> 
       <UserTable/>
    </div>
  )
}

export default UserList