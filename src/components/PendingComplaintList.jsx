import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import "../scss/Styles.scss";
import PendingComplaintTable from './tables/pending/PendingComplaint';

const PendingComplaintList = () => {
  return (
    <div className="dashboard">
       <Sidebar/> 
       <PendingComplaintTable/>
    </div>
  )
}

export default PendingComplaintList