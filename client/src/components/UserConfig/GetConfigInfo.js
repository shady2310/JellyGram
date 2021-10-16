import React, { useEffect, useState } from "react";
import axios from "axios";

const GetInfo = () => {
  const [info, setInfo] = useState({
    data: [],
  });

  const [load, setLoad] = useState({
    isLoaded: false,
  });

  const getInfo = async () => {
    const response = await axios.get(`http://localhost:5000/user/settings`, {
      headers: {
        token: window.sessionStorage.token,
        // token: window.localStorage.token,
      },
    });
    setInfo({
      data: response.data,
    });
    // console.log(response.data);
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

  console.log(info);

  return (
    <div>
      <div>
        <img src={info.data.userInfo.photo} alt="perfil" className="GetConfigInfoImage" />
      </div>
      <div>
        <label>
          Email
          <input type="text" placeholder={info.data.userInfo.email} />
        </label>
      </div>
      <div>
        <label>
          Nombre
          <input type="text" placeholder={info.data.userInfo.fullname} />
        </label>
      </div>
      <div>
        <label>
          Genero
          <select name="gender">
            <option selected="true" disabled="disabled" value="Hombre">{info.data.userInfo.gender} </option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
          </select>
        </label>
      </div>
      <div></div>
    </div>
  );
};

export default GetInfo;
