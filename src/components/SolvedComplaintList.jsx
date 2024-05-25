import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import "../scss/Styles.scss";
import SolvedComplaintTable from './tables/solved/SolvedComplaint';

const SolvedComplaintList = () => {
  return (
    <div className="dashboard">
       <Sidebar/> 
       <SolvedComplaintTable/>
    </div>
  )
}

export default SolvedComplaintList