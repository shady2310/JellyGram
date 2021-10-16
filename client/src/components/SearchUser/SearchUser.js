import React from "react";



const SearchUser = (info) => {
  // const [load, setLoad] = useState({
  //   isLoaded: false,
  // });

  if (info.data === undefined) {
    return null;
  }

  // setLoad({
  //   isLoaded: true,
  // });

  // if (load.isLoaded === false) {
  //   return null;
  // }

  // console.log(datos.data);

  // console.log(info);

  return (
    <div className="containerSearchUser">
      {info.data.map((user) => {
        return (
          <div className="SearchUserInfo">
            <p className="">{user.username}</p>
            <img
              key={user._id}
              src={user.photo}
              alt="foto"
              className="authorImage"
            />
          </div>
        );
      })}
    </div>
  );
};

export default SearchUser;
