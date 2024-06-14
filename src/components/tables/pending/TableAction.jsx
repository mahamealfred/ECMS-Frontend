import React from 'react';
import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { deleteCategory } from '../../../apis/categoriesController';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { fetchAllUsers } from '../../../apis/userController';
import { addNewAction } from '../../../apis/actionController';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { fetchAllComplaints } from '../../../apis/complaintController';
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
  const [openView, setOpenView] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openInitiation, setOpenInitiation] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [roles, setRoles] = useState([])
  const [vertical, setVertical] = useState("top")
  const [horizontal, setHorizontal] = useState("right")
  const [complaints, setComplaints] = useState([])
  const handleCloseSnack = () => {
    setSuccessMessage("")
    setOpenSuccess(false)
  }

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);

  };

  const handleOpenView = async (e) => {

    setOpenView(true)
  }
  const handleOpenInitiation = (e) => {
    setOpenInitiation(true)
  }
  const handleClose = () => {
    setOpenView(false)
    setOpenInitiation(false)
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
  //users
  //Fecth users
  const fetchUsers = async () => {
    try {
      const response = await fetchAllUsers();
      if (response.responseCode === 200) {
        setRoles(response.data)
      }

    } catch (error) {
      return error
    }
  }
  useEffect(async () => {
    if (roles.length < 1) {
      await fetchUsers()
    }
  }, []);
  //Fecth complaints

  const fetchComplaints = async () => {
    try {
      const response = await fetchAllComplaints();
      if (response.responseCode === 200) {
        setComplaints(response.data)
      }

    } catch (error) {
      return error
    }
  }
  useEffect(async () => {
    if (complaints.length < 1) {
      await fetchComplaints()
    }
  }, []);

  //initiation
  const [formData, setFormData] = useState({

    role: '',
  });

  const [errors, setErrors] = useState({
    role: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { role } = formData;
    // Validate if all fields are filled
    if (!role) {
      setErrors({
        role: !role,
      });
      return;
    }

    // Submit the form
    try {

      const response = await addNewAction(id, role)
      if (response.responseCode === 201) {
        //  setOpen(false)
        setSuccessMessage(response.responseDescription)
        fetchComplaints()
        setFormData({
          role: '',
        })

        setOpenSuccess(true);

      } else {

        setSuccessMessage(response.responseDescription)
        setOpenSuccess(true)
      }

    } catch (error) {

      setSuccessMessage(error)
    }
  };

  return (
    <>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
        message={successMessage ? successMessage : "Please Try Again with corrte data"}
      />
      {/* Initiation */}
      <Dialog
        open={openInitiation}
        onClose={handleClose}
        fullWidth
        width="lg"

      >
        <Paper style={{ padding: '40px', marginBottom: '20px' }}>
          <Typography variant="h6">Staff Members</Typography>
          <DialogContent>
            <TextField
              fullWidth
              select
              label="Select Staff"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              error={errors.role}
              helperText={errors.role ? 'Role is required' : ''}
              sx={{ marginBottom: '16px', width: '100%' }} // Set width to 100%
            >
              {roles.map((option) => (
                option.role === "Staff" ?
                  <MenuItem key={option.id} value={option.id}>
                    {option.firstName} {option.lastName}
                  </MenuItem>
                  : null
              ))}
            </TextField>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} >Close</Button>
            <Button onClick={handleSubmit} >Asign</Button>
          </DialogActions>
        </Paper>

      </Dialog>

      {/* View */}
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
            <Button onClick={handleClose} >Close</Button>
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
                <button onClick={(e) => handleOpenView(e)} className="dropdown-menu-link">
                  View
                </button>
              </li>
              <li className="dropdown-menu-item">
                {/* <button className="dropdown-menu-link">
                  Notification
                </button> */}
              </li>
              <li className="dropdown-menu-item">
                <button onClick={(e) => handleOpenInitiation(e)} className="dropdown-menu-link">
                  Asign
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