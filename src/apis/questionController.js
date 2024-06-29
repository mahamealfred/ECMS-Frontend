import React, { useContext } from "react";
import axios from "axios";

//get all categories
const base_url_get_all_questions ="http://localhost:8000/api/v1/question";
const base_url_add_new_question="http://localhost:8000/api/v1/question";


  const     fetchAllQuestions= async () => {
    const serverResponse = {
      responseCode: "",
      responseDescription: "",
      communicationStatus: "",
      responseDate: "",
      data: "",
    };
    await axios
      .get(base_url_get_all_questions, {
        headers: { }
      })
      .then((response) => {
        if (response.data.responseCode === 200) {
          serverResponse.responseDescription = response.data.responseDescription;
          serverResponse.responseCode = response.data.responseCode;
          serverResponse.data = response.data.data;
        } else {
          serverResponse.responseDescription = response.data.responseDescription;
          serverResponse.responseCode = response.data.responseCode
        }
      })
      .catch((err) => {
       
        if (err.response.status == 400) {
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        }
        else if(err.response.status == 401){
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        }
        else{
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        } 
      });
  
    return serverResponse;
  };

  const addNewQuestion= async (name,answers) => {
  
    const serverResponse = {
      responseCode: "",
      responseDescription: "",
      communicationStatus: "",
      responseDate: "",
      data: "",
    };
     let data = JSON.stringify({
        "name": name,
        "answers":answers
       });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: base_url_add_new_question,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    }
    await axios
      .request(config)
      .then((response) => {
        if (response.data.responseCode === 201) {
          serverResponse.responseDescription = response.data.responseDescription;
          serverResponse.responseCode = response.data.responseCode;
          serverResponse.data = response.data.data;
        } else {
          serverResponse.responseDescription = response.data.responseDescription;
          serverResponse.responseCode = response.data.responseCode
        }
      })
      .catch((err) => {
        console.log("error ,:",err)
       
        if (err.response.status == 400) {
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        }
        else if(err.response.status == 401){
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        }
        else{
          serverResponse.responseDescription = err.response.data.error;
          serverResponse.responseCode = err.response.data.responseCode;
        } 
      });
  
    return serverResponse;
  };
  
  
  export {
    fetchAllQuestions,
    addNewQuestion
  }