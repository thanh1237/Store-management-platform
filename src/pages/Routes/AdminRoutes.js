import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ ...rest }) => {
  const role = useSelector((state) => state.auth.user.role);
  if (role === "Admin") return <Route {...rest} />;
  delete rest.component;
  return <Route {...rest} render={(props) => <Redirect to="/login" />} />;
};

export default AdminRoute;
