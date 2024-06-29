import React, { useContext } from "react";
import axios from "axios";

//get all categories
const base_url_get_all_users ="http://localhost:8000/api/v1/organization";
//new user
const base_url_add_new_user ="http://localhost:8000/api/v1/organization";

  const  fetchOrganizations= async () => {
    const serverResponse = {
      responseCode: "",
      responseDescription: "",
      communicationStatus: "",
      responseDate: "",
      data: "",
    };
    await axios
      .get(base_url_get_all_users, {
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

 //add user
 const addNewOrganization = async (name,email) => {
  console.log("data to apis",name,email)
  const serverResponse = {
    responseCode: "",
    responseDescription: "",
    communicationStatus: "",
    responseDate: "",
    data: "",
  };
   let data = JSON.stringify({
      "name": name,
      "email":email
     });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: base_url_add_new_user,
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
    fetchOrganizations,
    addNewOrganization
  }