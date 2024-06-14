import  React, { useEffect, useState } from "react";
import AreaTableAction from "./TableAction";
import "./Table.scss";

import Buttons from "../Home/Button";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { addNewUser, fetchAllUsers } from "../../apis/userController";
import Navbar from "../../components/Navbar";
import Container from '@mui/material/Container';

const roles = [ 'Admin','Staff'];

const TABLE_HEADS = [
  "Fist Name",
  "Last Name",
  "Email",
  "Role",
  "Action",
];


const CategoryTable = () => {
  const [categoryData, setCategoryData] = useState([])
  const [name,setName]=useState("")
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMessage]=useState("")
  const [errorMessage,setErrorMessage]=useState(null)

  const [openSuccess,setOpenSuccess]=useState(false)
  const [vertical,setVertical]=useState("top")
  const [horizontal,setHorizontal]=useState("right")
  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseSnack=()=>{
    setSuccessMessage("")
    setOpenSuccess(false)
  }

  const handleClose = () => {
    setName("")
    setOpen(false);
  };

  

  //Fecth users
  const fetchUsers = async () => {
    try {
      const response = await fetchAllUsers();
      if (response.responseCode === 200) {
        setCategoryData(response.data)
      }
       
    } catch (error) {
      return error
    }
  }
  useEffect(async () => {
    if (categoryData.length < 1) {
      await fetchUsers()
        }
  }, []);
  //add new user
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
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

  const handleSubmit = async(event) => {
    event.preventDefault();
    const { firstName, lastName, email, role } = formData;
    // Validate if all fields are filled
    if (!firstName || !lastName || !email || !role) {
      setErrors({
        firstName: !firstName,
        lastName: !lastName,
        email: !email,
        role: !role,
      });
      return;
    }
    // Submit the form
    try {

      const response=await addNewUser(formData)
      if(response.responseCode===201){
      //  setOpen(false)
        setSuccessMessage(response.responseDescription)
        fetchUsers()
        setFormData({
          firstName: '',
    lastName: '',
    email: '',
    role: '',
        })
       setOpenSuccess(true)
        
      }else{
     
        setSuccessMessage(response.responseDescription)
        setOpenSuccess(true)
      }
      
    } catch (error) {
      
      setSuccessMessage(error)
    }
  };

  return (
    <React.Fragment>
    
    <Snackbar
  anchorOrigin={{ vertical, horizontal }}
  open={openSuccess}
  autoHideDuration={5000}
  onClose={handleCloseSnack}
  message={successMessage?successMessage:"Please Try Again with correct data"}
/>
      <Dialog
        open={open}
        onClose={handleClose}
        
      >
        <DialogTitle>User</DialogTitle>
        <DialogContent>
          <DialogContentText>
    
          </DialogContentText>
          <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          error={errors.firstName}
          helperText={errors.firstName ? 'First name is required' : ''}
          sx={{ marginBottom: '16px' }} // Adding padding between fields
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          error={errors.lastName}
          helperText={errors.lastName ? 'Last name is required' : ''}
          sx={{ marginBottom: '16px' }} // Adding padding between fields
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          helperText={errors.email ? 'Email is required' : ''}
          sx={{ marginBottom: '16px' }} // Adding padding between fields
        />
        <TextField
          fullWidth
          select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          error={errors.role}
          helperText={errors.role ? 'Role is required' : ''}
          sx={{ marginBottom: '16px' }} // Adding padding between fields
        >
          {roles.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        {/* <Button type="submit" variant="contained" color="primary">
          Submit
        </Button> */}
      </form>
    </Container>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} >Cancel</Button>
          <Button onClick={handleSubmit} type="submit">Add New</Button>
        </DialogActions>
      </Dialog>
 <div className="metrics">
      <Navbar />
      <section className="content-area-table">
        <div className="data-table-info">
          <h4 className="data-table-title">Users List</h4>
        </div>
        <div className="data-table-info">
        <Buttons onClick={handleClickOpen} blue text="New User"/>
        </div>
        <div className="data-table-diagram">
          <table>
            <thead>
              <tr>
                {TABLE_HEADS?.map((th, index) => (
                  <th key={index}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categoryData?.map((dataItem) => {
                return (
                  dataItem.role==="User"?null:
                  <tr key={dataItem.id}>
                    <td>{dataItem.firstName}</td>
                    <td>{dataItem.lastName}</td>
                    <td>{dataItem?.email}</td>
                    <td>{dataItem.role}</td>
                    <td className="dt-cell-action">
                      <AreaTableAction  
                      id={dataItem.id} 
                      setOpenSuccess={setOpenSuccess}
                      setSuccessMessage={setSuccessMessage}
                      // fetchCategory={fetchUsers}
                       />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

    </div>
    </React.Fragment>
   

  );
};

export default CategoryTable;