import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "../../../components/NotFoundPage";
import AppBar from "components/NavBar";
import Dashboard from "pages/DashBoard/DashBoard";

const UserLayout = () => {
  return (
    <>
      <div fluid>
        <Switch>
          <Route path="/user/dashBoard" component={Dashboard} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>
  );
};

export default UserLayout;
