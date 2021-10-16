import axios from "axios";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const [info, setInfo] = useState({
    data: [],
  });

  const [load, setLoad] = useState({
    isLoaded: false,
  });

  const [img, setImg] = useState({
    img: [],
  });

  const getInfo = async () => {
    const response = await axios.get(
      `http://localhost:5000/user/profile/posts`,
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
    setLoad({
      isLoaded: true,
    });
    setImg({ img: response.data.posts });
  };

  useEffect(() => {
    getInfo();
  }, []);

  if (load.isLoaded === false) {
    return null;
  }

  //   console.log(info.data.postsId.posts);
    // console.log(img.img);
    // console.log(info.data.postInfo.image);

  //   const image = info.data.postInfo.image

  return (
    <div>
      <div className="contenedorImagenesPerfil">
        {img.img.map((image) => {
          return (
            <img
              key={image._id}
              src={image.image}
              alt="foto"
              className="imagenesPerfil"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
