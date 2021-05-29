import React, { useEffect } from "react";
import "App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Adding Fontawesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
  faPlus,
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faTimesCircle,
  faPauseCircle,
  faCircle,
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import authActions from "redux/actions/auth.actions";
import AlertMsg from "components/AlertMsg";
import PrivateRoute from "pages/Routes/PrivateRoute";
import AdminRoute from "pages/Routes/AdminRoutes";
import PublicLayout from "pages/Routes/layouts/PublicLayout";
import AdminLayout from "pages/Routes/layouts/AdminLayout";
import UserLayout from "pages/Routes/layouts/UserLayout";

library.add(
  fab,
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
  faPlus,
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faTimesCircle,
  faPauseCircle,
  faCircle,
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt
);

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch, isAuthenticated]);
  return (
    <Router>
      <Router>
        {/* <NavBar /> */}
        <AlertMsg />
        <Switch>
          <PrivateRoute path="/user" component={UserLayout} />
          <AdminRoute path="/admin" component={AdminLayout} />
          <Route path="/" component={PublicLayout} />
        </Switch>
      </Router>
    </Router>
  );
}

export default App;
