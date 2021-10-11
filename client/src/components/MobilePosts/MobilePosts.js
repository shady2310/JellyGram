import React from "react";
// import { BiImageAlt } from "react-icons/bi";

const MobilePosts = ({data, foto, fotoExpandida}) => {
  // console.log(fotoExpandida);
  
  // let author = data;
  // const data = info.data;
  const authorImage = data.author[0].photo;
  const authorPost = data.author[0].username;
  const image = data.image;
  // console.log(data);
  // console.log(image);
  // const imageClick = () => {
  //   console.log('Click');
  // }

  return (
    <div>
      {/* {foto.expandida === false ? ( */}
        <div className="containerPost">
          {/* <div className="containerPostGrid"> */}
          <div className="containerAuthor">
            {/* <BiImageAlt color="#f4f4f4" size="3em" /> */}
            <img className="authorImage" src={authorImage} alt="authorImage" />
            <p className="authorPost">{authorPost}</p>
          </div>
          {/* <img className="postImage" src={image} alt="post" /> */}
          <img className="postImage" src={image} alt="post" onClick={fotoExpandida}/>
        </div>
      {/* ) : ( */}
        {/* <div></div> */}
      {/* )}
      {foto.expandida === true ? (
      <MobilePostsExp />
      ) : (
      <div></div>
      )} */}
    </div>
  );
};

export default MobilePosts;
