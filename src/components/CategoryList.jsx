import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import "../scss/Styles.scss";
import CategoryTable from './tables/category/CategoryTable';
const CategoryList = () => {
  return (
    <div className="dashboard">
       <Sidebar/> 
       <CategoryTable />
    </div>
  )
}

export default CategoryList