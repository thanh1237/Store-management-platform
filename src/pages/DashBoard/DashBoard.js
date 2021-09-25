import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { secondaryListItems } from "./listItems";
import Chart from "./Chart";
import Revenue from "./Revenue";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import LayersIcon from "@material-ui/icons/Layers";
import AccountIndex from "pages/Account/AccountIndex";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle } from "@material-ui/icons";
import { Backdrop, Fade, Menu, MenuItem, Modal } from "@material-ui/core";
import authActions from "redux/actions/auth.actions";
import { useHistory } from "react-router";
import { ProdIndex } from "pages/Product/ProdIndex";
import OrderIndex from "pages/Orders/OrderIndex";
import ChangePassForm from "pages/LoginRegister/component/ChangePassForm";
import OrderList from "pages/OrderList/container/OrderList";
import IngredientsIndex from "pages/Ingredients/IngredientsIndex";
import RestaurantMenuOutlinedIcon from "@material-ui/icons/RestaurantMenuOutlined";
import "./DashBoard.css";
import ControlBoard from "pages/DashBoard/ControlBoard";
import Profit from "pages/DashBoard/Profit";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import SupplierIndex from "pages/Supplier/SupplierIndex";
import {
  cukcukOrderActions,
  productActions,
  sainVoiceActions,
} from "redux/actions";
import moment from "moment";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  secondFixedHeigh: {
    height: 200,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [value, setValue] = useState();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUserRole = useSelector((state) => state.auth.user.role);
  const orderList = useSelector((state) => state.cukcukOrder.orders);
  const cukcukOrderList = useSelector((state) => state.cukcukOrder.orders);
  const cukcukDetailOrders = useSelector(
    (state) => state.cukcukOrder.singleOrder
  );
  const controller = useSelector((state) => state.control.obj);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const productList = useSelector(
    (state) => state?.product?.products?.products
  );
  const role = useSelector((state) => state.auth.user.role);
  let cukcukAccessToken;
  const accessToken = localStorage.getItem("accessToken");

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
    history.push("/");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const secondFixedHeightPaper = clsx(classes.paper, classes.secondFixedHeigh);

  const handleShow = (text) => {
    setShow(text);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleOpen}>Change Password</MenuItem>
      <MenuItem onClick={handleLogout}>LogOut</MenuItem>
    </Menu>
  );

  const todayOrderList = orderList?.filter((order) => {
    if (
      controller.mode === "Date" &&
      moment(order.Date).format("YYYY-MM-DD") === controller.date
    ) {
      return order.Id;
    } else if (
      controller.mode === "Month" &&
      moment(order.Date).format("YYYY-MM") === controller.date
    ) {
      return order.Id;
    } else {
      return false;
    }
  });

  const todayOrderIdList = todayOrderList?.map((order) => order.Id);

  const prevOrderList = orderList?.filter((order) => {
    if (
      controller.mode === "Date" &&
      moment(order.Date).format("YYYY-MM-DD") ===
        moment(controller.date).subtract(1, "days").format("YYYY-MM-DD")
    ) {
      return order.Id;
    } else if (
      controller.mode === "Month" &&
      moment(order.Date).format("YYYY-MM") ===
        moment(controller.date).subtract(1, "months").format("YYYY-MM")
    ) {
      return order.Id;
    } else {
      return null;
    }
  });

  const prevOrderIdList = prevOrderList?.map((order) => order?.Id);

  useEffect(() => {
    if (!accessToken) {
      dispatch(authActions.loginCukcuk());
    } else {
      if (!cukcukAccessToken) {
        dispatch(authActions.loginCukcuk());
        dispatch(sainVoiceActions.getSainVoices());
        dispatch(productActions.getProducts());
        dispatch(cukcukOrderActions.getCukcukOrders());
      } else {
        dispatch(sainVoiceActions.getSainVoices());
        dispatch(productActions.getProducts());
        dispatch(cukcukOrderActions.getCukcukOrders());
      }
    }

    if (todayOrderIdList) {
      dispatch(cukcukOrderActions.getSingleCukcukOrder(todayOrderIdList));
    }
    if (prevOrderIdList) {
      dispatch(cukcukOrderActions.getYesSingleCukcukOrder(prevOrderIdList));
    }
  }, [dispatch, controller]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
        style={{ backgroundColor: "#2EC0FF" }}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          ></Typography>
          {isAuthenticated ? (
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <ChangePassForm
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                  />
                </Fade>
              </Modal>
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {
            <div>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
              </ListItem>
              <ListItem
                style={{ display: currentUserRole === "Admin" ? "none" : null }}
                button
                onClick={() => {
                  handleShow("Orders");
                }}
              >
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Daily Order" />
              </ListItem>
              <ListItem
                style={{ display: currentUserRole !== "Admin" ? "none" : null }}
                button
                onClick={() => {
                  handleShow("Accounts");
                }}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Accounts" />
              </ListItem>
              <ListItem
                style={{ display: currentUserRole !== "Admin" ? "none" : null }}
                button
                onClick={() => {
                  handleShow("Products");
                }}
              >
                <ListItemIcon>
                  <FreeBreakfastIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>
              <ListItem
                style={{ display: currentUserRole !== "Admin" ? "none" : null }}
                button
                onClick={() => {
                  handleShow("Ingredients");
                }}
              >
                <ListItemIcon>
                  <RestaurantMenuOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Ingredients" />
              </ListItem>
              <ListItem
                button
                style={{ display: currentUserRole !== "Admin" ? "none" : null }}
                onClick={() => {
                  handleShow("orderList");
                }}
              >
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Order List" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  handleShow("Suppliers");
                }}
              >
                <ListItemIcon>
                  <ContactMailIcon />
                </ListItemIcon>
                <ListItemText primary="Suppliers" />
              </ListItem>
            </div>
          }
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart sainVoiceList={cukcukOrderList} />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Revenue sainVoiceList={cukcukOrderList} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
              <Paper className={secondFixedHeightPaper}>
                <ControlBoard role={role} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={secondFixedHeightPaper}>
                <Profit
                  cukcukOrderList={cukcukOrderList}
                  productList={productList}
                  cukcukDetailOrders={cukcukDetailOrders}
                  setValue={setValue}
                />
              </Paper>
            </Grid>

            {show === "Accounts" ? (
              <h1 style={{ color: "#2EC0FF" }}>Account Management</h1>
            ) : show === "Products" ? (
              <h1 style={{ color: "#2EC0FF" }}>Product Management</h1>
            ) : show === "Orders" ? (
              <h1 style={{ color: "#2EC0FF" }}>Daily Stock</h1>
            ) : show === "orderList" ? (
              <h1 style={{ color: "#2EC0FF" }}>Stock List</h1>
            ) : show === "Ingredients" ? (
              <h1 style={{ color: "#2EC0FF" }}>Ingredients Management</h1>
            ) : show === "Suppliers" ? (
              <h1 style={{ color: "#2EC0FF" }}>Suppliers Management</h1>
            ) : null}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {show === "Accounts" ? (
                  <AccountIndex />
                ) : show === "Products" ? (
                  <ProdIndex />
                ) : show === "Orders" ? (
                  <OrderIndex />
                ) : show === "orderList" ? (
                  <OrderList />
                ) : show === "Ingredients" ? (
                  <IngredientsIndex />
                ) : show === "Suppliers" ? (
                  <SupplierIndex />
                ) : (
                  "Please select from side menu"
                )}
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
