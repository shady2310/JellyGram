import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";

const MobilePostExp = () => {
  const [info, setInfo] = useState({
    data: [],
  });
  const [load, setLoad] = useState({
    isLoaded: false,
  });

  const { id } = useParams();

  const getInfo = async () => {
    const response = await axios.get(`http://localhost:5000/post/post/${id}`, {
      headers: {
        token: window.sessionStorage.token,
      },
    });
    // console.log(response.data.singlePost);
    setInfo({
      data: response.data,
    });
    setLoad({
      isLoaded: true,
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  //   console.log(info.data);
  //   console.log(data);

  if (info.data.success === false) {
    return <Redirect to="/login" />;
  }

  console.log(load.isLoaded);

  if (load.isLoaded === false) {
    return null;
  }

  const data = info.data.singlePost;
  const image = data.image;

  return (
    <div>
      <div>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default MobilePostExp;
