import axios from "axios";

const base_url_login="http://localhost:8000/api/v1/auth";

const loginAuth= async (email,password) => {
    const serverResponse = {
      responseCode: "",
      responseDescription: "",
      communicationStatus: "",
      responseDate: "",
      data: "",
    };
  
    let data =JSON.stringify({
      email: email,
      password: password,
      
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url:base_url_login ,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    }
    await axios
      .request(config)
      .then((response) => {
        if (response.data.responseCode === 200) {
          serverResponse.responseDescription = response.data.responseDescription;
          serverResponse.responseCode = response.data.responseCode;
          serverResponse.data = response.data;
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

  export{
loginAuth
  }