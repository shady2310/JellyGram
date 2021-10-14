import React, { useEffect, useState } from "react";

import SearchUser from "../../components/SearchUser/SearchUser";
import MobileNav from "../../components/MobileNav/MobileNav";
import Explore from "../../components/Explore/Explore";
import axios from "axios";

const ExplorePage = () => {
  const [explore, setExplore] = useState({
    render: false,
  });

  const [values, setValues] = useState({});

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
    // TODO: dejarme de crear componentes raros
  };

  const click = () => {
    setExplore({ render: true });
  };

  const click2 = () => {
    setExplore({ render: false });
  };


  const [info, setInfo] = useState({
    data: [],
  });

  const [load, setLoad] = useState({
    isLoaded: false,
  });



  const getInfo = async () => {
    const response = await axios.get(`http://localhost:5000/user/searchUser`, {
      headers: {
        token: window.sessionStorage.token,
        // token: window.localStorage.token,
      },values
    });
    setInfo({
      data: response.data,
    });
    console.log(response.data);
    // setLoad({
    //   isLoaded: true,
    // });
  };

  useEffect(() => {
    getInfo();
  }, []);

//   if (load.isLoaded === false) {
//     return null;
//   }
  

//   console.log(values);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Buscar"
          onClick={click}
          name="username"
          onChange={handleChange}
        />
        {explore.render === true ? (
          <button onClick={click2}>Cancelar</button>
        ) : null}
      </div>
      {/* {explore.render === true ? <SearchUser data={values} /> : null} */}
      <Explore />
      <MobileNav />
    </div>
  );
};

export default ExplorePage;
