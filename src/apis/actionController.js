import React, { useContext } from "react";
import axios from "axios";

//get all categories

//new category
const base_url_add_new_action ="http://localhost:8000/api/v1/action";

  
  //add 
  const addNewAction = async (complaintId,userId) => {
    const serverResponse = {
      responseCode: "",
      responseDescription: "",
      communicationStatus: "",
      responseDate: "",
      data: "",
    };
    let data = JSON.stringify({
        "userId": userId,
        "complaintId":complaintId
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: base_url_add_new_action,
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
    addNewAction,
    
  }