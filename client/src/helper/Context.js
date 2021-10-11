import { createContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext({});

const response = axios
  .get(`http://localhost:5000/user/home`, {
    headers: {
      token: window.sessionStorage.token,
      // token: window.localStorage.token,
    },
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error.response);
  });

  console.log(response.data);
  

export const DataProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState();

  return <DataContext.Provider>{children}</DataContext.Provider>;
};
