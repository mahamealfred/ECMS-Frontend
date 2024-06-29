import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import "../scss/Styles.scss";
import QuestionTable from './tables/question/QuestionTable';
const CategoryList = () => {
  return (
    <div className="dashboard">
       <Sidebar/> 
       <QuestionTable />
    </div>
  )
}

export default CategoryList