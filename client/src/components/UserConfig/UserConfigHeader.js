import React from "react";
import { useHistory } from "react-router";

const UserConfigHeader = () => {
  let history = useHistory();

  const goToPreviousPath = () => {
    history.goBack();
  };

  return (
    <div>
      <button onClick={goToPreviousPath}>atras</button>
      <div></div>
    </div>
  );
};

export default UserConfigHeader;
