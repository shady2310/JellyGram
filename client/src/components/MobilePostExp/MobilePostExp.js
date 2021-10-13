import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";
import PostComment from "../PostComment/PostComment";

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

  // console.log(data);

  if (info.data.success === false) {
    return <Redirect to="/login" />;
  }

  // console.log(load.isLoaded);

  if (load.isLoaded === false) {
    return null;
  }

  // console.log(info.data.singlePost);

  const data = info.data.singlePost;
  const image = data.image;

  return (
    <div>
      <div className="container-singlePost">
        <img src={image} alt="post" className="singlePostImage" />
      </div>
      <div>
        {info.data.singlePost.comments.map((comment) => {
          return <PostComment key={comment} id={comment} />;
        })}
      </div>
    </div>
  );
};

export default MobilePostExp;
