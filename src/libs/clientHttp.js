import axios from "axios"

  export const clientHttp = axios.create (
    {
        baseURL: 'http://localhost:3000', 
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"

        }
      }
  )
 export const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};