import axios from "axios";
import React, { useEffect, useState } from "react";

const Explore = () => {
  const [info, setInfo] = useState({
    data: [],
  });

  const [load, setLoad] = useState({
    isLoaded: false,
  });

  const getInfo = async () => {
    const response = await axios.get(`http://localhost:5000/post/explore`, {
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

//   console.log(info.data.posts);

  return (
    <div>
      <div className="container-PostsExplore">
        {info.data.posts.map((image) => {
          return (
            <img
              key={image._id}
              src={image.image}
              alt="foto"
              className="singlePostImage"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Explore;
