import React, { useContext } from "react";
import axios from "axios";

//get all categories
const base_url_get_all_questions ="http://localhost:8000/api/v1/question";


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
        serverResponse.responseDescription =
          " ACCESS PROCESSING ERROR -" + err;
  
        if (!err.response) {
        } else if (err.response.status === 400) {
        } else if (err.response.status === 401) {
        } else {
        }
        //errRef.current.focus();
      });
  
    return serverResponse;
  };


  
  
  export {
    fetchAllQuestions
  }