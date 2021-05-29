import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "../../../components/NotFoundPage";
import OrderIndex from "pages/Orders/OrderIndex";
import AppBar from "components/NavBar";

const UserLayout = () => {
  return (
    <>
      <AppBar />
      <div fluid>
        <Switch>
          <Route path="/user/orders" component={OrderIndex} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>
  );
};

export default UserLayout;
