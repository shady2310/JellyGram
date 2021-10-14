import axios from "axios";
import React, { useEffect, useState } from "react";

const SearchUser = (datos) => {
  const [info, setInfo] = useState({
    data: [],
  });

  const [load, setLoad] = useState({
    isLoaded: false,
  });



  const getInfo = async () => {
    const response = await axios.post(`http://localhost:5000/user/searchUser`, {
      headers: {
        token: window.sessionStorage.token,
        // token: window.localStorage.token,
      },
    });
    setInfo({
      data: response.data,
    });
    console.log(response.data);
    setLoad({
      isLoaded: true,
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  if (load.isLoaded === false) {
    return null;
  }

  
  

  return (
    <div>
      <div>hola</div>
    </div>
  );
};

export default SearchUser;
