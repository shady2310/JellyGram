import React from "react";
import { useHistory } from "react-router";

const MobileHeader2 = () => {
  let history = useHistory();

  const goToPreviousPath = () => {
    history.goBack();
  };

  return (
    <div className="mobile-header_tittle2">
      <button onClick={goToPreviousPath}>atras</button>
      <h1>
        Jelly<span>Gram</span>
      </h1>
      <button>...</button>
    </div>
  );
};

export default MobileHeader2;
