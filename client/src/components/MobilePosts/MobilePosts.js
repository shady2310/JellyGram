import React from "react";
import { BiImageAlt } from "react-icons/bi";

const MobilePosts = (info) => {
  // let author = data;
  const data = info.data;
  // const authorImage = data.author[0].photo;
  const authorPost = data.author[0].username;
  const image = data.image;
  // console.log(data);
  // console.log(image);

  return (
    <div>
      <div className="containerPost">
        {/* <div className="containerPostGrid"> */}
          <div className="containerAuthor">
            <BiImageAlt color="#f4f4f4" size="3em" />
            {/* <img className="postImage" src={authorImage} alt="" /> */}
            <p className="authorPost">{authorPost}</p>
          </div>
          <img className="postImage" src={image} alt="" />
        {/* </div> */}
      </div>
    </div>
  );
};

export default MobilePosts;
