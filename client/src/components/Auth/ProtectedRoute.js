import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isAuth: isAuth, component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => {
      if(window.sessionStorage.token === "" || window.sessionStorage.token === undefined) {
      // if(isAuth === false) {
        return <Redirect to={{pathname: "/login", state: {from: props.location}}} />
      } else {
          
          return <Component />
      }
  }} />;
};

export default ProtectedRoute;
