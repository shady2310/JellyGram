import axios from "axios";
import React, { useEffect, useState } from "react";

const PostComment = (id) => {
  //   console.log(id);
  const commentId = id.id;

  //   console.log(commentId.id);

  const [info, setInfo] = useState({
    data: [],
  });

  const [load, setLoad] = useState({
    isLoaded: false,
  });

  const getInfo = async () => {
    const response = await axios.get(
      `http://localhost:5000/comment/getComment/${commentId}`,
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
  };

  useEffect(() => {
    getInfo();
  }, []);

  if (load.isLoaded === false) {
    return null;
  }

  // console.log(info.data.comments);

  const comment = info.data.comments.comment;
  const username = info.data.userInfo.username;
  // console.log(info.data.userInfo);

  return (
    <div>
      <div>
          <p>{username}</p>
          <p>{comment}</p>
      </div>
    </div>
  );
};

export default PostComment;
