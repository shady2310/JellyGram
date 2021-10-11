import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";

import MobileNav from "../../components/MobileNav/MobileNav";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import MobilePosts from "../../components/MobilePosts/MobilePosts";
import MobilePostsExp from "../../components/MobilePostExp/MobilePostExp";
// { authorized }
const HomePage = () => {
  const [info, setInfo] = useState({
    data: [],
  });
  // console.log(info);

  const [foto, setFoto] = useState({
    expandida: false,
  });

  const fotoExpandida = () => {
    setFoto({ expandida: true });
  };
  const NoFotoExpandida = () => {
    setFoto({ expandida: false });
  };

  const getInfo = async () => {
    const response = await axios.get(`http://localhost:5000/user/home`, {
      headers: {
        token: window.sessionStorage.token,
        // token: window.localStorage.token,
      },
    });
    setInfo({
      data: response.data,
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  if (info.data.success === false) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      {foto.expandida === false ? (
        <div>
          <MobileHeader />

          <div>
            {info.data.map((posts) => {
              return (
                <MobilePosts
                  key={posts._id}
                  data={posts}
                  foto={foto}
                  fotoExpandida={fotoExpandida}
                />
              );
            })}
          </div>

          <MobileNav />
        </div>
      ) : (
        <div></div>
      )}

      {foto.expandida === true ? <MobilePostsExp NoFotoExpandida={NoFotoExpandida} /> : <div></div>}
    </div>
  );
};

export default withRouter(HomePage);
