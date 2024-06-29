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
import { Button, Typography } from "@mui/material";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { addNewOrganization, fetchOrganizations } from "../../../apis/organizationController";
import { addNewQuestion, fetchAllQuestions } from "../../../apis/questionController";



const TABLE_HEADS = [
  "Question",
  "Answers",
  "Date",
  "Action",
];


const CategoryTable = () => {
  const [categoryData, setCategoryData] = useState([])
  const [organizationData,setOrganizationData]=useState([])
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [open, setOpen] = useState(false);
  const [successMessage,setSuccessMessage]=useState("")
  const [errorMessage,setErrorMessage]=useState(null)

  const [openSuccess,setOpenSuccess]=useState(false)
  const [vertical,setVertical]=useState("top")
  const [horizontal,setHorizontal]=useState("right")
  
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['']);
  
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (index, event) => {
    const newAnswers = answers.slice();
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, '']);
  };

  const handleRemoveAnswer = (index) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseSnack=()=>{
    setSuccessMessage("")
    setOpenSuccess(false)
  }

  const handleClose = () => {
    setEmail("")
    setName("")
    setOpen(false);
  };

  //add new Question
  const handleNewQuestion=async()=>{
  
if(!question){
  setSuccessMessage("Question is Required")
  setOpenSuccess(true)
}else if(!answers){
  setSuccessMessage("Answers are Required")
  setOpenSuccess(true)
}
else{
  try {

    const response=await addNewQuestion(question,answers)
    if(response.responseCode===201){
    //  setOpen(false)
      setSuccessMessage(response.responseDescription)
      fetchOrganization()
      setName("")
      setEmail("")
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
  const fetchOrganization = async () => {
    try {
      const response = await fetchAllQuestions();
      if (response.responseCode === 200) {
        setOrganizationData(response.data)
      }
       
    } catch (error) {
      return error
    }
  }
  useEffect(async () => {
    if (organizationData.length < 1) {
      await fetchOrganization()
        }
  }, []);
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
        fullWidth
      >
        <DialogTitle>Question and Answers</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add new Question you will need Question  and Answers
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            value={question} 
            onChange={handleQuestionChange}
            id="question"
            name="question"
            label="Question"
            type="text"
            size="small"
            fullWidth
            variant="standard"
          />
           {answers.map((answer, index) => (
          <div key={index}>
           <Typography>
           Answer {index + 1}:
           <TextField
            autoFocus
            required
            margin="dense"
            value={answer}
            onChange={(event) => handleAnswerChange(index, event)}
            id="email"
            name="email"
            label="Answer"
            type="text"
            size="small"
            fullWidth
            variant="standard"
          />
            <Button color="primary" onClick={handleAddAnswer}>
            Add Answer
            </Button>
           <Button  onClick={() => handleRemoveAnswer(index)}>
                Remove
              </Button>
           </Typography>
          </div>
           ))}
          
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} >Cancel</Button>
          <Button onClick={handleNewQuestion} type="submit">Add</Button>
        </DialogActions>
      </Dialog>
 <div className="metrics">
      <Navbar />
      <section className="content-area-table">
        <div className="data-table-info">
          <h4 className="data-table-title">List of Question and Answers</h4>
        </div>
        <div className="data-table-info">
        <Buttons onClick={handleClickOpen} blue text="New Q&A"/>
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
              {organizationData?.map((dataItem) => {
                return (
                  <tr key={dataItem.id}>
                    <td>{dataItem.name}</td>
                    <td>{dataItem?.answers?.join(", ")}</td>
                    <td>{dataItem.createdAt}</td>
                    <td className="dt-cell-action">
                      <AreaTableAction  
                      id={dataItem.id} 
                      setOpenSuccess={setOpenSuccess}
                      setSuccessMessage={setSuccessMessage}
                      fetchCategory={fetchOrganization}
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