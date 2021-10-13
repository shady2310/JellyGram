import axios from "axios";
import React, { useEffect, useState } from "react";
import MobileNav from "../../components/MobileNav/MobileNav";
import MyProfile from "../../components/MyProfile/MyProfile";
import Posts from "../../components/MyProfile/Posts";

const ProfilePage = () => {
  const [info, setInfo] = useState({
    data: [],
  });

  const [load, setLoad] = useState({
    isLoaded: false,
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
  };

  useEffect(() => {
    getInfo();
  }, []);

  if (load.isLoaded === false) {
    return null;
  }

//   console.log(info.data.postsId.posts);

  return (
    <div>
      <MyProfile />
      <Posts />
      <MobileNav />
    </div>
  );
};

export default ProfilePage;
