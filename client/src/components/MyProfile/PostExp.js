import React from "react";
import { useHistory } from "react-router";

const PostExp = ({ image }) => {
    const history = useHistory();

    const postId = image._id;

    const imageClick = () => {
      history.push(`/post/${postId}`);
    };

//   console.log(image._id);

  return (
    <div>
      <img
        key={image._id}
        src={image.image}
        alt="foto"
        className="imagenesPerfil"
        onClick={imageClick}
      />
    </div>
  );
};

export default PostExp;
