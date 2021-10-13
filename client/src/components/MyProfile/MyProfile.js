import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";

const MyProfile = () => {
  const [info, setInfo] = useState({
    data: [],
  });

  const [load, setLoad] = useState({
    isLoaded: false,
  });

  const getInfo = async () => {
    const response = await axios.get(`http://localhost:5000/user/myProfile`, {
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

  if (info.data.success === false) {
    return <Redirect to="/login" />;
  }

//   console.log(info.data.myProfile);

  const username = info.data.myProfile.username;
  const image = info.data.myProfile.photo;
  const cantidadSiguiendo = info.data.myProfile.following.length;
  const cantidadSeguidores = info.data.myProfile.followers.length;

  // TODO: poner constantes en un estado

  return (
    <div>
      <div>
        <img src={image} alt="Foto" />
      </div>
      <div>
        <p>
          Seguidores: <span>{cantidadSeguidores}</span>
        </p>
        <p>{username}</p>
        <p>
          Siguiendo: <span>{cantidadSiguiendo}</span>
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
