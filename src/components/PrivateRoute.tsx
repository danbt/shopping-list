import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const fbAuth = useAuth();
  return (
    <Route
      {...rest}
      render={(props: any) => {
        return fbAuth?.loggedInUser && fbAuth.loggedInUser.email ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
