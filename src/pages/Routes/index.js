import React from "react";
import { Route, Switch } from "react-router-dom";
import PublicLayout from "pages/Routes/layouts/PublicLayout";

const Routes = (props) => {
  return (
    <Switch>
      <Route path="/" component={PublicLayout} />
    </Switch>
  );
};
export default Routes;
