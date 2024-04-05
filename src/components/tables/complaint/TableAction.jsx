import React from 'react';
import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { deleteCategory } from '../../../apis/categoriesController';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper,Typography } from '@mui/material';


const TableAction = ({   
  id, 
  // setOpenView,openView, 
  additionalDetails,
  date,
  time,
  category,
  locationName,
  firstName,
  lastName,
  address,
 city,
 country,
description,
total
 

}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [openView,setOpenView]=useState(false);

  const handleDropdown = () => {

    setShowDropdown(!showDropdown);
 
  };
 
  const handleOpenView= async(e)=>{
    
    setOpenView(true)
  }
  const handleClose=()=>{
    setOpenView(false)
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
   
     <Dialog
        open={openView}
        onClose={handleClose}
        
      >
         <Paper style={{ padding: '40px', marginBottom: '20px' }}>
         <Typography variant="h6">View Complaint with ID: {id} </Typography>
       <DialogContent>
               <div className="response-details">
             {/* <p><strong>ID:</strong> {id}</p> */}
             <p><strong>Date:</strong> {date}</p>
             <p><strong>Time:</strong> {time}</p>
             <div className="response-description">
             <p><strong>Category:</strong> {category}</p>
             </div>
             <div className="response-description">
             <p><strong>Location:</strong> {locationName}, {address} {city}, {country}</p>
              </div>
              <div className="response-description">
              <p><strong>Sender:</strong> {firstName} {lastName}</p>
              </div>
             
              <div className="response-description">
              <p><strong>Percentage:</strong> {total} %</p>
              </div>
          
           </div>
           <div className="response-description">
             <p><strong>Additional Details:</strong></p>
             <p>{additionalDetails}</p>
           </div>
           <div className="response-description">
             <p><strong>Description:</strong></p>
             <p>{description}</p>
           </div>
              
         
       </DialogContent>
       <DialogActions>
         <Button  onClick={handleClose} >Close</Button>
       </DialogActions>
         </Paper>
       
      </Dialog>
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
                <button onClick={(e)=>handleOpenView(e)} className="dropdown-menu-link">
                  View
                </button>
              </li>
              <li className="dropdown-menu-item">
                <button  className="dropdown-menu-link">
                  Edit
                </button>
              </li>
              <li className="dropdown-menu-item">
                <button  className="dropdown-menu-link">
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