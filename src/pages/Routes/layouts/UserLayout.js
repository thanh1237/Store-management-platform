import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "../../../components/NotFoundPage";
import index from "pages/LoginRegister";

const UserLayout = () => {
  return (
    <>
      <div fluid>
        <Switch>
          <Route exact path="/" component={index} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>
  );
};

export default UserLayout;
