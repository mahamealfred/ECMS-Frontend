import React from 'react';
import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { deleteCategory } from '../../../apis/categoriesController';


const TableAction = ({   
  id,
  setOpenSuccess,
  setSuccessMessage,
  fetchCategory}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
 
  };
  
const handleDelete=async()=>{
  try {
    const response=await deleteCategory(id)
    if(response.responseCode===200){
      setSuccessMessage(response.responseDescription)
      fetchCategory()
      setOpenSuccess(true)
    }else{
      setSuccessMessage(response.responseDescription)
      setOpenSuccess(true) 
    }
    
  } catch (error) {
    setSuccessMessage(error)
      setOpenSuccess(true) 
  }
  
}
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="action-dropdown-btn"
        onClick={handleDropdown}
      >
        <HiDotsHorizontal size={18} />
        {showDropdown && (
          <div className="action-dropdown-menu" ref={dropdownRef}>
            <ul className="dropdown-menu-list">
              <li className="dropdown-menu-item">
                <button  className="dropdown-menu-link">
                  View
                </button>
              </li>
              <li className="dropdown-menu-item">
                <button  className="dropdown-menu-link">
                  Edit
                </button>
              </li>
              <li className="dropdown-menu-item">
                <button onClick={handleDelete} className="dropdown-menu-link">
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </button>
    </>
  );
};

export default TableAction;