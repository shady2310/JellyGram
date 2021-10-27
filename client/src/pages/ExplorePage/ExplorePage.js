import React, { useState } from "react";

import SearchUser from "../../components/SearchUser/SearchUser";
import MobileNav from "../../components/MobileNav/MobileNav";
import Explore from "../../components/Explore/Explore";
import axios from "axios";

const ExplorePage = () => {
  const [explore, setExplore] = useState({
    render: false,
  });

  const [values, setValues] = useState({
    username: "",
  });

  const username = values.username;

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
    // TODO: dejarme de crear componentes raros
    getInfo();
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

  const getInfo = async () => {
    const response = await axios.post(
      `http://localhost:5000/user/searchUser`,
      {
        username,
      },
      {
        headers: {
          token: window.sessionStorage.token,
          // token: window.localStorage.token,
        },
      }
    );
    setInfo({
      data: response.data,
    });
    // console.log(response.data);
  };

  // useEffect(() => {
  //   getInfo();
  // }, []);

  // if (load.isLoaded === false) {
  //   return null;
  // }

  // console.log(info.data.users);

  return (
    <div>
      <div className="container-busquedaExplorePage">
        <input
          type="text"
          placeholder="Buscar"
          onClick={click}
          name="username"
          onChange={handleChange}
          className="inputBusquedaUsuario"
        />
        {explore.render === true ? (
          <button onClick={click2}>Cancelar</button>
        ) : null}
      </div>
      {explore.render === true ? <SearchUser data={info.data.users} /> : null}
      <Explore />
      <MobileNav />
    </div>
  );
};

export default ExplorePage;
