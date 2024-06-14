import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import "../scss/Styles.scss";
import DeliveredComplaintTable from './tables/delivered/StaffDeliveredComplaintTable';

const DeliveredComplaintList = () => {
  return (
    <div className="dashboard">
       <Sidebar/> 
       <DeliveredComplaintTable/>
    </div>
  )
}

export default DeliveredComplaintList