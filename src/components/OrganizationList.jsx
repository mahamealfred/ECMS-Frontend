import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import "../scss/Styles.scss";
import OrganizationTable from './tables/organization/OrganizationTable';
const CategoryList = () => {
  return (
    <div className="dashboard">
       <Sidebar/> 
       <OrganizationTable />
    </div>
  )
}

export default CategoryList