import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isAuth: isAuth, component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => {
      if(window.localStorage.token === "") {
        return <Redirect to={{pathname: "/login", state: {from: props.location}}} />
      } else {
          
          return <Component />
      }
  }} />;
};

export default ProtectedRoute;
