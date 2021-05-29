import React from "react";
import { Switch, Route } from "react-router-dom";
import AlertMsg from "components/AlertMsg";
import NotFoundPage from "components/NotFoundPage";
import index from "pages/LoginRegister/index";

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
