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
import { cukcukOrderActions, sainVoiceActions } from "redux/actions";
import ControlBoard from "pages/DashBoard/ControlBoard";
import Profit from "pages/DashBoard/Profit";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import SupplierIndex from "pages/Supplier/SupplierIndex";

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
    paddingRight: 24, // keep right padding when drawer closed
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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUserRole = useSelector((state) => state.auth.user.role);
  const cukcukAssessToken = localStorage.getItem("cukcukAccessToken");
  const sainVoiceList = useSelector((state) => state.sainVoice.sainVoice);
  const cukcukOrderList = useSelector((state) => state.cukcukOrder.orders);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  // const sainVoiceList = [
  //   {
  //     RefId: "3a08fc9e-18d2-4c97-a2b4-102d41f352fc",
  //     RefType: 550,
  //     RefNo: "2004000020",
  //     RefDate: "2021-07-30T17:40:55.447",
  //     BranchId: "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
  //     OrderType: 0,
  //     CustomerId: "cd9018f0-5d20-407c-9a6a-f3221275b950",
  //     CustomerName: "Chị Nga",
  //     EmployeeId: "12c271ea-478c-4350-b55d-162d66208838",
  //     EmployeeName: "Dung Nguyễn",
  //     Description:
  //       "chị Nga, 28 Tăng Thiết Giáp, Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội ",
  //     DepositAmount: 0.0,
  //     Amount: 2300000.0,
  //     DeliveryAmount: 0.0,
  //     ServiceRate: 0.0,
  //     ServiceAmount: 0.0,
  //     VATRate: 0.0,
  //     VATAmount: 0.0,
  //     DiscountAmount: 0.0,
  //     PromotionRate: 0.0,
  //     PromotionAmount: 0.0,
  //     PromotionItemsAmount: 0.0,
  //     ReceiveAmount: 0.0,
  //     ReturnAmount: 0.0,
  //     TotalAmount: 10000,
  //     SaleAmount: 0.0,
  //     TotalItemAmount: 0.0,
  //     TotalItemAmountAfterTax: 0.0,
  //     TipAmount: 0.0,
  //     ServiceTaxRate: 0.0,
  //     DeliveryTaxRate: 0.0,
  //     PaymentStatus: 0,
  //     AvailablePoint: 0,
  //     UsedPoint: 0,
  //     AddPoint: 0,
  //   },
  //   {
  //     RefId: "fb30bacc-6996-4834-8bb5-b39554c2d9ed",
  //     RefType: 550,
  //     RefNo: "2004000018",
  //     RefDate: "2021-07-31T17:39:25.417",
  //     BranchId: "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
  //     OrderType: 0,
  //     CustomerId: "cd9018f0-5d20-407c-9a6a-f3221275b950",
  //     CustomerName: "Chị Nga",
  //     EmployeeId: "12c271ea-478c-4350-b55d-162d66208838",
  //     EmployeeName: "Dung Nguyễn",
  //     Description:
  //       "chị Nga, 28 Tăng Thiết Giáp, Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội ",
  //     DepositAmount: 0.0,
  //     Amount: 2300000.0,
  //     DeliveryAmount: 0.0,
  //     ServiceRate: 0.0,
  //     ServiceAmount: 0.0,
  //     VATRate: 0.0,
  //     VATAmount: 0.0,
  //     DiscountAmount: 0.0,
  //     PromotionRate: 0.0,
  //     PromotionAmount: 0.0,
  //     PromotionItemsAmount: 0.0,
  //     ReceiveAmount: 0.0,
  //     ReturnAmount: 0.0,
  //     TotalAmount: 20000,
  //     SaleAmount: 0.0,
  //     TotalItemAmount: 0.0,
  //     TotalItemAmountAfterTax: 0.0,
  //     TipAmount: 0.0,
  //     ServiceTaxRate: 0.0,
  //     DeliveryTaxRate: 0.0,
  //     PaymentStatus: 0,
  //     AvailablePoint: 0,
  //     UsedPoint: 0,
  //     AddPoint: 0,
  //   },
  //   {
  //     RefId: "e877a5e5-470d-48ed-bedb-c333647e209e",
  //     RefType: 550,
  //     RefNo: "2004000017",
  //     RefDate: "2021-07-31T17:37:51.057",
  //     BranchId: "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
  //     OrderType: 0,
  //     CustomerId: "6b4b84d5-4196-4f84-bd85-4f3c638df61d",
  //     CustomerName: "Chị Bảo châu",
  //     EmployeeId: "12c271ea-478c-4350-b55d-162d66208838",
  //     EmployeeName: "Dung Nguyễn",
  //     Description: "",
  //     DepositAmount: 0.0,
  //     Amount: 560000.0,
  //     DeliveryAmount: 50000.0,
  //     ServiceRate: 0.0,
  //     ServiceAmount: 0.0,
  //     VATRate: 0.0,
  //     VATAmount: 0.0,
  //     DiscountAmount: 0.0,
  //     PromotionRate: 0.0,
  //     PromotionAmount: 0.0,
  //     PromotionItemsAmount: 0.0,
  //     ReceiveAmount: 0.0,
  //     ReturnAmount: 0.0,
  //     TotalAmount: 10000,
  //     SaleAmount: 0.0,
  //     TotalItemAmount: 0.0,
  //     TotalItemAmountAfterTax: 0.0,
  //     TipAmount: 0.0,
  //     ServiceTaxRate: 0.0,
  //     DeliveryTaxRate: 0.0,
  //     PaymentStatus: 0,
  //     AvailablePoint: 0,
  //     UsedPoint: 0,
  //     AddPoint: 0,
  //   },
  //   {
  //     RefId: "0ba898a7-a466-4662-9378-7784151573b6",
  //     RefType: 550,
  //     RefNo: "2004000019",
  //     RefDate: "2021-07-30T17:36:50.763",
  //     BranchId: "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
  //     OrderType: 0,
  //     CustomerId: "cd9018f0-5d20-407c-9a6a-f3221275b950",
  //     CustomerName: "Chị Nga",
  //     EmployeeId: "12c271ea-478c-4350-b55d-162d66208838",
  //     EmployeeName: "Dung Nguyễn",
  //     Description:
  //       "chị Nga, 28 Tăng Thiết Giáp, Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội ",
  //     DepositAmount: 0.0,
  //     Amount: 2300000.0,
  //     DeliveryAmount: 0.0,
  //     ServiceRate: 0.0,
  //     ServiceAmount: 0.0,
  //     VATRate: 0.0,
  //     VATAmount: 0.0,
  //     DiscountAmount: 0.0,
  //     PromotionRate: 0.0,
  //     PromotionAmount: 0.0,
  //     PromotionItemsAmount: 0.0,
  //     ReceiveAmount: 0.0,
  //     ReturnAmount: 0.0,
  //     TotalAmount: 10000,
  //     SaleAmount: 0.0,
  //     TotalItemAmount: 0.0,
  //     TotalItemAmountAfterTax: 0.0,
  //     TipAmount: 0.0,
  //     ServiceTaxRate: 0.0,
  //     DeliveryTaxRate: 0.0,
  //     PaymentStatus: 0,
  //     AvailablePoint: 0,
  //     UsedPoint: 0,
  //     AddPoint: 0,
  //   },
  //   {
  //     RefId: "5ca84e6a-1b6d-4952-89b4-62428dabd335",
  //     RefType: 550,
  //     RefNo: "2004000016",
  //     RefDate: "2021-07-30T16:54:34.983",
  //     BranchId: "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
  //     OrderType: 0,
  //     CustomerId: "cd9018f0-5d20-407c-9a6a-f3221275b950",
  //     CustomerName: "Chị Nga",
  //     EmployeeId: "12c271ea-478c-4350-b55d-162d66208838",
  //     EmployeeName: "Dung Nguyễn",
  //     Description:
  //       "chị Nga, 28 Tăng Thiết Giáp, Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội ",
  //     DepositAmount: 0.0,
  //     Amount: 2300000.0,
  //     DeliveryAmount: 0.0,
  //     ServiceRate: 0.0,
  //     ServiceAmount: 0.0,
  //     VATRate: 0.0,
  //     VATAmount: 0.0,
  //     DiscountAmount: 0.0,
  //     PromotionRate: 0.0,
  //     PromotionAmount: 0.0,
  //     PromotionItemsAmount: 0.0,
  //     ReceiveAmount: 0.0,
  //     ReturnAmount: 0.0,
  //     TotalAmount: 10000,
  //     SaleAmount: 0.0,
  //     TotalItemAmount: 0.0,
  //     TotalItemAmountAfterTax: 0.0,
  //     TipAmount: 0.0,
  //     ServiceTaxRate: 0.0,
  //     DeliveryTaxRate: 0.0,
  //     PaymentStatus: 0,
  //     AvailablePoint: 0,
  //     UsedPoint: 0,
  //     AddPoint: 0,
  //   },
  //   {
  //     RefId: "465314c0-ca6f-4782-976a-a8e51bd54297",
  //     RefType: 550,
  //     RefNo: "2004000014",
  //     RefDate: "2021-07-29T16:51:54.63",
  //     BranchId: "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
  //     OrderType: 0,
  //     CustomerId: "cd9018f0-5d20-407c-9a6a-f3221275b950",
  //     CustomerName: "Chị Nga",
  //     EmployeeId: "12c271ea-478c-4350-b55d-162d66208838",
  //     EmployeeName: "Dung Nguyễn",
  //     Description:
  //       "chị Nga, 28 Tăng Thiết Giáp, Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội ",
  //     DepositAmount: 0.0,
  //     Amount: 2300000.0,
  //     DeliveryAmount: 0.0,
  //     ServiceRate: 0.0,
  //     ServiceAmount: 0.0,
  //     VATRate: 0.0,
  //     VATAmount: 0.0,
  //     DiscountAmount: 0.0,
  //     PromotionRate: 0.0,
  //     PromotionAmount: 0.0,
  //     PromotionItemsAmount: 0.0,
  //     ReceiveAmount: 0.0,
  //     ReturnAmount: 0.0,
  //     TotalAmount: 10000,
  //     SaleAmount: 0.0,
  //     TotalItemAmount: 0.0,
  //     TotalItemAmountAfterTax: 0.0,
  //     TipAmount: 0.0,
  //     ServiceTaxRate: 0.0,
  //     DeliveryTaxRate: 0.0,
  //     PaymentStatus: 0,
  //     AvailablePoint: 0,
  //     UsedPoint: 0,
  //     AddPoint: 0,
  //   },
  //   {
  //     RefId: "052ef319-2b51-491c-9b32-7dc746bd8e3c",
  //     RefType: 550,
  //     RefNo: "2004000015",
  //     RefDate: "2021-07-27T16:49:52.383",
  //     BranchId: "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
  //     OrderType: 0,
  //     CustomerId: "cd9018f0-5d20-407c-9a6a-f3221275b950",
  //     CustomerName: "Chị Nga",
  //     EmployeeId: "12c271ea-478c-4350-b55d-162d66208838",
  //     EmployeeName: "Dung Nguyễn",
  //     Description:
  //       "chị Nga, 28 Tăng Thiết Giáp, Phường Cổ Nhuế 2, Quận Bắc Từ Liêm, Hà Nội ",
  //     DepositAmount: 0.0,
  //     Amount: 2300000.0,
  //     DeliveryAmount: 0.0,
  //     ServiceRate: 0.0,
  //     ServiceAmount: 0.0,
  //     VATRate: 0.0,
  //     VATAmount: 0.0,
  //     DiscountAmount: 0.0,
  //     PromotionRate: 0.0,
  //     PromotionAmount: 0.0,
  //     PromotionItemsAmount: 0.0,
  //     ReceiveAmount: 0.0,
  //     ReturnAmount: 0.0,
  //     TotalAmount: 10000,
  //     SaleAmount: 0.0,
  //     TotalItemAmount: 0.0,
  //     TotalItemAmountAfterTax: 0.0,
  //     TipAmount: 0.0,
  //     ServiceTaxRate: 0.0,
  //     DeliveryTaxRate: 0.0,
  //     PaymentStatus: 0,
  //     AvailablePoint: 0,
  //     UsedPoint: 0,
  //     AddPoint: 0,
  //   },
  //   {
  //     RefId: "92ea360f-4bd3-472a-a138-ab4ef5ba5d7f",
  //     RefType: 550,
  //     RefNo: "2004000010",
  //     RefDate: "2021-07-28T16:32:48.977",
  //     BranchId: "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
  //     OrderType: 0,
  //     CustomerId: "cd9018f0-5d20-407c-9a6a-f3221275b950",
  //     CustomerName: "Chị Nga",
  //     EmployeeId: "12c271ea-478c-4350-b55d-162d66208838",
  //     EmployeeName: "Dung Nguyễn",
  //     Description: "Chị Nga, 236 Hoàng Quốc Việt giao hàng trước 12h",
  //     DepositAmount: 0.0,
  //     Amount: 10610000.0,
  //     DeliveryAmount: 0.0,
  //     ServiceRate: 0.0,
  //     ServiceAmount: 0.0,
  //     VATRate: 0.0,
  //     VATAmount: 0.0,
  //     DiscountAmount: 0.0,
  //     PromotionRate: 0.0,
  //     PromotionAmount: 0.0,
  //     PromotionItemsAmount: 0.0,
  //     ReceiveAmount: 0.0,
  //     ReturnAmount: 0.0,
  //     TotalAmount: 10000,
  //     SaleAmount: 0.0,
  //     TotalItemAmount: 0.0,
  //     TotalItemAmountAfterTax: 0.0,
  //     TipAmount: 0.0,
  //     ServiceTaxRate: 0.0,
  //     DeliveryTaxRate: 0.0,
  //     PaymentStatus: 0,
  //     AvailablePoint: 0,
  //     UsedPoint: 0,
  //     AddPoint: 0,
  //   },
  //   {
  //     RefId: "92ea360f-4bd3-472a-a138-ab4ef5ba5d7f",
  //     RefType: 550,
  //     RefNo: "2004000010",
  //     RefDate: "2021-07-26T16:32:48.977",
  //     BranchId: "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
  //     OrderType: 0,
  //     CustomerId: "cd9018f0-5d20-407c-9a6a-f3221275b950",
  //     CustomerName: "Chị Nga",
  //     EmployeeId: "12c271ea-478c-4350-b55d-162d66208838",
  //     EmployeeName: "Dung Nguyễn",
  //     Description: "Chị Nga, 236 Hoàng Quốc Việt giao hàng trước 12h",
  //     DepositAmount: 0.0,
  //     Amount: 10610000.0,
  //     DeliveryAmount: 0.0,
  //     ServiceRate: 0.0,
  //     ServiceAmount: 0.0,
  //     VATRate: 0.0,
  //     VATAmount: 0.0,
  //     DiscountAmount: 0.0,
  //     PromotionRate: 0.0,
  //     PromotionAmount: 0.0,
  //     PromotionItemsAmount: 0.0,
  //     ReceiveAmount: 0.0,
  //     ReturnAmount: 0.0,
  //     TotalAmount: 10000,
  //     SaleAmount: 0.0,
  //     TotalItemAmount: 0.0,
  //     TotalItemAmountAfterTax: 0.0,
  //     TipAmount: 0.0,
  //     ServiceTaxRate: 0.0,
  //     DeliveryTaxRate: 0.0,
  //     PaymentStatus: 0,
  //     AvailablePoint: 0,
  //     UsedPoint: 0,
  //     AddPoint: 0,
  //   },
  //   {
  //     RefId: "59836160-ef5d-4bf4-a180-6036bdcc7db2",
  //     RefType: 550,
  //     RefNo: "2004000012",
  //     RefDate: "2021-06-25T15:11:36.163",
  //     BranchId: "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
  //     OrderType: 0,
  //     CustomerId: "722fadf2-44b0-47d9-b076-e5a1889be73c",
  //     CustomerName: "Anh Bảo 1",
  //     EmployeeId: "12c271ea-478c-4350-b55d-162d66208838",
  //     EmployeeName: "Dung Nguyễn",
  //     Description: "",
  //     DepositAmount: 0.0,
  //     Amount: 85000.0,
  //     DeliveryAmount: 0.0,
  //     ServiceRate: 0.0,
  //     ServiceAmount: 0.0,
  //     VATRate: 0.0,
  //     VATAmount: 0.0,
  //     DiscountAmount: 0.0,
  //     PromotionRate: 0.0,
  //     PromotionAmount: 0.0,
  //     PromotionItemsAmount: 0.0,
  //     ReceiveAmount: 0.0,
  //     ReturnAmount: 0.0,
  //     TotalAmount: 10000,
  //     SaleAmount: 0.0,
  //     TotalItemAmount: 0.0,
  //     TotalItemAmountAfterTax: 0.0,
  //     TipAmount: 0.0,
  //     ServiceTaxRate: 0.0,
  //     DeliveryTaxRate: 0.0,
  //     PaymentStatus: 0,
  //     AvailablePoint: 0,
  //     UsedPoint: 0,
  //     AddPoint: 0,
  //   },
  //   {
  //     RefId: "6cfefcec-df05-4286-ad50-93f35223f7ac",
  //     RefType: 550,
  //     RefNo: "2004000011",
  //     RefDate: "2021-06-25T15:10:48.993",
  //     BranchId: "9b2f084b-97b6-42a9-b20a-2893fd358ae8",
  //     OrderType: 0,
  //     CustomerId: "722fadf2-44b0-47d9-b076-e5a1889be73c",
  //     CustomerName: "Anh Bảo 1",
  //     EmployeeId: "12c271ea-478c-4350-b55d-162d66208838",
  //     EmployeeName: "Dung Nguyễn",
  //     Description: "",
  //     DepositAmount: 0.0,
  //     Amount: 10000.0,
  //     DeliveryAmount: 0.0,
  //     ServiceRate: 0.0,
  //     ServiceAmount: 0.0,
  //     VATRate: 0.0,
  //     VATAmount: 0.0,
  //     DiscountAmount: 0.0,
  //     PromotionRate: 0.0,
  //     PromotionAmount: 0.0,
  //     PromotionItemsAmount: 0.0,
  //     ReceiveAmount: 0.0,
  //     ReturnAmount: 0.0,
  //     TotalAmount: 10000,
  //     SaleAmount: 0.0,
  //     TotalItemAmount: 0.0,
  //     TotalItemAmountAfterTax: 0.0,
  //     TipAmount: 0.0,
  //     ServiceTaxRate: 0.0,
  //     DeliveryTaxRate: 0.0,
  //     PaymentStatus: 0,
  //     AvailablePoint: 0,
  //     UsedPoint: 0,
  //     AddPoint: 0,
  //   },
  // ];

  // const cukcukOrderList = [
  //   {
  //     Id: "cbfeea95-6996-4b86-9f7b-915b3217726f",
  //     Type: 3,
  //     No: "1.2",
  //     BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
  //     Status: 4,
  //     Date: "2021-08-8T11:06:16.837",
  //     ShippingDate: "2020-07-29T11:36:05",
  //     CustomerId: "c93d3f20-45b5-4428-9c4a-ae37d212555c",
  //     CustomerName: "Nguyễn Đức Công",
  //     CustomerTel: "0344322228",
  //     ShippingAddress: "63 Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
  //     DeliveryAmount: 0.0,
  //     DepositAmount: 0.0,
  //     TotalAmount: 5000.0,
  //   },
  //   {
  //     Id: "9acc925e-0ba8-4524-a932-57b75cfa81b6",
  //     Type: 1,
  //     No: "1.1",
  //     BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
  //     Status: 1,
  //     Date: "2021-08-08T09:29:46.067",
  //     DeliveryAmount: 0.0,
  //     DepositAmount: 0.0,
  //     TotalAmount: 5000.0,
  //   },
  //   {
  //     Id: "6f8ac33c-266f-4dc1-a647-8a0c5ebb8070",
  //     Type: 1,
  //     No: "1.2",
  //     BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
  //     Status: 4,
  //     Date: "2021-08-09T16:26:45.673",
  //     DeliveryAmount: 0.0,
  //     DepositAmount: 0.0,
  //     TotalAmount: 105000.0,
  //   },
  //   {
  //     Id: "b2ec3b71-4b45-4beb-a3c3-1ae6340343b0",
  //     Type: 1,
  //     No: "1.1",
  //     BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
  //     Status: 4,
  //     Date: "2021-08-09T15:02:46.767",
  //     CustomerId: "919204d3-64da-4de9-a994-0b5b715b5348",
  //     CustomerName: "Chị Nga",
  //     CustomerTel: "03456782157",
  //     ShippingAddress: "",
  //     DeliveryAmount: 0.0,
  //     DepositAmount: 0.0,
  //     TotalAmount: 45000.0,
  //   },
  // ];

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

  useEffect(() => {
    if (cukcukAssessToken) {
      dispatch(sainVoiceActions.getSainVoices());
      dispatch(cukcukOrderActions.getCukcukOrders());
    }
  }, [dispatch, cukcukAssessToken]);

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
                {/* <ListItemText primary="Dashboard" /> */}
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
                <Chart sainVoiceList={sainVoiceList} />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Revenue
                  sainVoiceList={sainVoiceList}
                  cukcukOrderList={cukcukOrderList}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={secondFixedHeightPaper}>
                <ControlBoard />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={secondFixedHeightPaper}>
                <Profit
                  sainVoiceList={sainVoiceList}
                  cukcukOrderList={cukcukOrderList}
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
