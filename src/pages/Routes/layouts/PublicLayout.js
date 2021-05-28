import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import AlertMsg from "components/AlertMsg";
import NotFoundPage from "components/NotFoundPage";
import index from "pages/LoginRegister/index";
import { useDispatch, useSelector } from "react-redux";
import authActions from "redux/actions/auth.actions";
import PrivateRoute from "pages/Routes/PrivateRoute";
import Account from "pages/Account/container/Account";
import AdminRoute from "pages/Routes/AdminRoutes";

const PublicLayout = () => {
  return (
    <>
      <div>
        <AlertMsg />
        <Switch>
          <Route path="/" component={index} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>
  );
};

export default PublicLayout;
