import axios from "axios";
window.process = {};


export const login = async (formData) => {
  // try{
    const response = await axios.post(
      `http://localhost:10000/auth/login`,
      formData
    );
    if (response.data?.status === 201) {    
      // Save JWT to localStorage
      console.log("sucess");
      localStorage.setItem("jwt", JSON.stringify(response.data.token));
      return { jwt: response.data.token, msg: ""};
    }
    // Handle other non-2xx errors manually if needed
    if (response.data?.status === 401) {
      return {jwt: null, msg: "Incorrect username or password"};
    }
  // }
  // catch (error) {
  //     throw error;
  //   }
  };

  export const signUp = async (formData) => {
    console.log(formData);
    const response = await axios.post(
      `http://localhost:10000/auth/register`,
      formData
    );
    // console.log(response);
    if (response.status === 201){
      return {msg: "User has been created"};
    }
    throw new Error("Internal Server error");
  }