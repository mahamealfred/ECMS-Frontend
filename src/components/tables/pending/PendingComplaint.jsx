import  React, { useEffect, useState } from "react";
import AreaTableAction from "./TableAction";
import "../Table.scss";
import Navbar from "../../Navbar";
import { addNewCategory, fetchAllCategories } from "../../../apis/categoriesController";
import Buttons from "../../Home/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { fetchAllComplaints } from "../../../apis/complaintController";





const TABLE_HEADS = [
  "Date",
  "Time",
  "Category",
  "Location Name",
  "Status",
  "Total",
  "Action",
];



const ComplaintTable = () => {
  const [complaintData, setComplaintData] = useState([])
  const [name,setName]=useState("")
  const [open, setOpen] = useState(false);
 
  const [errorMessage,setErrorMessage]=useState(null)
  const [openView,setOpenView]=useState(false)
  const [openSuccess,setOpenSuccess]=useState(false)
  const [successMessage,setSuccessMessage]=useState("")
  const [vertical,setVertical]=useState("top")
  const [horizontal,setHorizontal]=useState("right")
  const handleCloseSnack=()=>{
    setSuccessMessage("")
    setOpenSuccess(false)
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };
 

  const handleClose = () => {
    setName("")
    setOpen(false);
  };

  //add new Category
  const handleNewCategory=async()=>{
   
if(!name){
  setSuccessMessage("Category Name is Required")
  setOpenSuccess(true)
}else{
  try {

    const response=await addNewCategory(name)
    if(response.responseCode===201){
    //  setOpen(false)
      setSuccessMessage(response.responseDescription)
      fetchCategory()
      setName("")
     setOpenSuccess(true)
      
    }else{
      setSuccessMessage(response.responseDescription)
    }
    
  } catch (error) {
    console.log("error:",error)
    setSuccessMessage(error)
  }
}

  }

  //Fecth Category
  const fetchCategory = async () => {
    try {
      const response = await fetchAllComplaints();
      if (response.responseCode === 200) {
        setComplaintData(response.data)
      }
       
    } catch (error) {
      return error
    }
  }
  useEffect(async () => {
    if (complaintData.length < 1) {
      await fetchCategory()
        }
  }, []);

  
  const handleExportPDF = () => {
    window.print();
  };

  const handleExportExcel = () => {
    const table = document.getElementById("complaint-table");
    const html = table.outerHTML;
    const url = 'data:application/vnd.ms-excel;base64,' + btoa(html);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'complaints.xls';
    a.click();
  };
  return (
    <React.Fragment>
    
    <Snackbar
  anchorOrigin={{ vertical, horizontal }}
  open={openSuccess}
  autoHideDuration={5000}
  onClose={handleCloseSnack}
  message={successMessage?successMessage:"Please Try Again with corrte data"}
/>
      <Dialog
        open={open}
        onClose={handleClose}
        
      >
        <DialogTitle>Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add new category you will need Category Name
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            id="name"
            name="name"
            label="Category Name"
            type="text"
            size="small"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} >Cancel</Button>
          <Button onClick={handleNewCategory} type="submit">Add</Button>
        </DialogActions>
      </Dialog>
 <div className="metrics">
      <Navbar />
      <section className="content-area-table">
        
      <div className="data-table-info">
        <h4 className="data-table-title">List of Pending Complaints</h4>
        <div className="export-buttons">
            <button onClick={handleExportPDF}>Export as PDF</button>
            <button onClick={handleExportExcel}>Export as Excel</button>
          </div>
      </div>
      <div className="data-table-diagram">
        <table id="complaint-table">
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                th==="Action"?
                <th className="hide-on-print" key={index}>{th}</th>:
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {complaintData &&
    complaintData
      .filter((dataItem) => dataItem.status.toLowerCase() === 'pending')
      .map((dataItem) => {
              
              return (
                <tr key={dataItem.id}>
            
                  <td>{dataItem.date}</td>
                  <td>{dataItem.time}</td>
                  <td>{dataItem?.Category?.name}</td>
                  <td>{dataItem?.Location?.name}</td>
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${dataItem.status}`}
                      ></span>
                      <span className="dt-status-text">{dataItem.status}</span>
                    </div>
                  </td>
                  <td>{dataItem.totalParcentage} %</td>
                  <td className="dt-cell-action hide-on-print">
                    <AreaTableAction 
                    // state={{
                    //   id:dataItem.id
                    // }}
                     id={dataItem?.id}
                      date={dataItem?.date}
                      time={dataItem?.time}
                      category={dataItem?.Category?.name}
                      locationName={dataItem?.Location?.name}
                      firstName={dataItem?.User?.firstName}
                      lastName={dataItem?.User?.lastName}
                      address={dataItem?.Location?.address?.address}
                      city={dataItem?.Location?.address?.city}
                      country={dataItem?.Location?.address?.country}
                      description={dataItem?.description}
                      additionalDetails={dataItem?.additionalDetails}
                      total={dataItem?.totalParcentage}
                      //  setOpenView={setOpenView} 
                      //  openView={openView} 
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

export default ComplaintTable;