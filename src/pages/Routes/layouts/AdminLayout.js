import Dashboard from "pages/DashBoard/DashBoard";
import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "../../../components/NotFoundPage";

const AdminLayout = () => {
  return (
    <>
      <div>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>
  );
};

export default AdminLayout;
