import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";

import MobileNav from "../../components/MobileNav/MobileNav";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import MobilePosts from "../../components/MobilePosts/MobilePosts";
// { authorized }
const HomePage = () => {
  let [info, setInfo] = useState({
    data: [],
  });

  const getInfo = async () => {
    const response = await axios.get(`http://localhost:5000/user/home`, {
      headers: {
        token: window.localStorage.token,
      },
    });
    // console.log(response.data);
    setInfo({
      data: response.data,
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  // if (!authorized) {
  //   return <Redirect to="/" />;
  // };

  console.log(info.data);

  return (
    <div>
      <MobileHeader />

      <div>
        {info.data.map((posts) => {
          return <MobilePosts key={posts._id} data={posts} />;
        })}
      </div>

      <MobileNav />
    </div>
  );
};

export default withRouter(HomePage);
