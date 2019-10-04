import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { getUserId } from "../../apis/storage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const logged = getUserId();

  return (
    <Route
      {...rest}
      render={props =>
        logged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;