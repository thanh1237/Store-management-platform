import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { useEffect } from "react";
import moment from "moment";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import { cukcukOrderActions, productActions } from "redux/actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Profit({ cukcukOrderList }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const controller = useSelector((state) => state.control.obj);
  const productList = useSelector((state) => state.product.products.products);
  const cukcukDetailOrders = useSelector(
    (state) => state.cukcukOrder.singleOrder
  );
  const yesterDaySingle = useSelector((state) => state.cukcukOrder.yesterday);

  let totalCost = 0;
  let totalAmountOfOrders = 0;
  let yesterdayCost = 0;
  let yesterdayRevenue = 0;
  // const cukcukDetailOrders = [
  //   {
  //     Id: "cbfeea95-6996-4b86-9f7b-915b3217726f",
  //     Type: 3,
  //     No: "1.2",
  //     BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
  //     Status: 4,
  //     Date: "2020-07-29T11:06:16.837",
  //     ShippingDate: "2020-07-29T11:36:05",
  //     CustomerId: "c93d3f20-45b5-4428-9c4a-ae37d212555c",
  //     CustomerName: "Nguyễn Đức Công",
  //     CustomerTel: "0344322228",
  //     EmployeeName: "",
  //     ShippingAddress: "63 Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
  //     DeliveryAmount: 0.0,
  //     DepositAmount: 0.0,
  //     TotalAmount: 72000.0,
  //     OrderDetails: [
  //       {
  //         Id: "18f4179b-2f7f-4fae-8e23-1e9793dd06a3",
  //         ItemName: "333",
  //         UnitId: "47817d1f-c393-4a4c-af57-0d7fe3f29c5f",
  //         UnitName: "Cốc",
  //         Quantity: 1.0,
  //         Status: 1,
  //         Price: 2000.0,
  //         Amount: 2000.0,
  //       },
  //       {
  //         Id: "5d23d98c-8cb2-4cd3-a048-47c41a649219",
  //         ItemName: "333",
  //         AdditionId: "0e78cbd9-4e6c-455f-910e-ab0dc5759dfa",
  //         UnitName: "",
  //         Quantity: 1.0,
  //         Status: 1,
  //         Price: 3000.0,
  //         Amount: 3000.0,
  //       },
  //     ],
  //   },
  //   {
  //     Id: "cbfeea95-6996-4b86-9f7b-915b3217726a",
  //     Type: 3,
  //     No: "1.2",
  //     BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
  //     Status: 4,
  //     Date: "2020-07-29T11:06:16.837",
  //     ShippingDate: "2020-07-29T11:36:05",
  //     CustomerId: "c93d3f20-45b5-4428-9c4a-ae37d212555c",
  //     CustomerName: "Nguyễn Đức Công",
  //     CustomerTel: "0344322228",
  //     EmployeeName: "",
  //     ShippingAddress: "63 Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
  //     DeliveryAmount: 0.0,
  //     DepositAmount: 0.0,
  //     TotalAmount: 72000.0,
  //     OrderDetails: [
  //       {
  //         Id: "18f4179b-2f7f-4fae-8e23-1e9793dd06a3",
  //         ItemName: "Tiger",
  //         UnitId: "47817d1f-c393-4a4c-af57-0d7fe3f29c5f",
  //         UnitName: "Cốc",
  //         Quantity: 1.0,
  //         Status: 1,
  //         Price: 2000.0,
  //         Amount: 2000.0,
  //       },
  //       {
  //         Id: "5d23d98c-8cb2-4cd3-a048-47c41a649219",
  //         ItemName: "Tiger",
  //         AdditionId: "0e78cbd9-4e6c-455f-910e-ab0dc5759dfa",
  //         UnitName: "",
  //         Quantity: 1.0,
  //         Status: 1,
  //         Price: 3000.0,
  //         Amount: 3000.0,
  //       },
  //     ],
  //   },
  //   {
  //     Id: "cbfeea95-6996-4b86-9f7b-915b3217726v",
  //     Type: 3,
  //     No: "1.2",
  //     BranchId: "994c6fe5-da83-441b-a0e8-57a6fed98fb2",
  //     Status: 4,
  //     Date: "2020-08-09T11:06:16.837",
  //     ShippingDate: "2020-07-29T11:36:05",
  //     CustomerId: "c93d3f20-45b5-4428-9c4a-ae37d212555c",
  //     CustomerName: "Nguyễn Đức Công",
  //     CustomerTel: "0344322228",
  //     EmployeeName: "",
  //     ShippingAddress: "63 Trần Quốc Vượng, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
  //     DeliveryAmount: 0.0,
  //     DepositAmount: 0.0,
  //     TotalAmount: 624000.0,
  //     OrderDetails: [
  //       {
  //         Id: "18f4179b-2f7f-4fae-8e23-1e9793dd06a3",
  //         ItemName: "Gin",
  //         UnitId: "47817d1f-c393-4a4c-af57-0d7fe3f29c5f",
  //         UnitName: "Cốc",
  //         Quantity: 1.0,
  //         Status: 1,
  //         Price: 2000.0,
  //         Amount: 2000.0,
  //       },
  //       {
  //         Id: "5d23d98c-8cb2-4cd3-a048-47c41a649219",
  //         ItemName: "333",
  //         AdditionId: "0e78cbd9-4e6c-455f-910e-ab0dc5759dfa",
  //         UnitName: "",
  //         Quantity: 1.0,
  //         Status: 1,
  //         Price: 3000.0,
  //         Amount: 3000.0,
  //       },
  //     ],
  //   },
  // ];

  const items = cukcukDetailOrders?.map((e) => {
    return e.OrderDetails;
  });

  const merged = [].concat.apply([], items);

  const compareName = merged.map((e) => {
    const obj = productList?.find((product) => product.name === e?.ItemName);
    return { ...e, cost: obj?.cost };
  });

  compareName?.forEach((order) => {
    totalCost += order?.cost;
    return totalCost;
  });

  const cukcukOrderArr = cukcukOrderList?.filter((e) => {
    if (controller.mode === "Date") {
      let today = moment(controller.date).format("DD/MM/YYYY");
      return moment(e.Date).format("DD/MM/YYYY") === today;
    } else {
      let thisMonth = moment(controller.date).format("MM/YYYY");
      return moment(e.Date).format("MM/YYYY") === thisMonth;
    }
  });

  cukcukOrderArr?.sort(function (a, b) {
    return a.Date < b.Date ? -1 : a.Date > b.Date ? 1 : 0;
  });

  const cukcukOrderIds = cukcukOrderArr?.map((el) => {
    return el.Id;
  });

  cukcukOrderArr?.forEach((order) => {
    totalAmountOfOrders += order.TotalAmount;
    return totalAmountOfOrders;
  });

  const yesterdayArr = cukcukOrderList?.filter((e) => {
    if (controller.mode === "Date") {
      let yesterday = moment(controller.date)
        .subtract(1, "days")
        .format("DD/MM/YYYY");
      return moment(e.Date).format("DD/MM/YYYY") === yesterday;
    } else {
      let yesterday = moment(controller.date)
        .subtract(1, "months")
        .format("MM/YYYY");
      return moment(e.Date).format("MM/YYYY") === yesterday;
    }
  });

  yesterdayArr.forEach((order) => {
    yesterdayRevenue += order.TotalAmount;
    return yesterdayRevenue;
  });

  const yesterDayIds = yesterdayArr?.map((e) => {
    return e.Id;
  });

  const yesterdayItems = yesterDaySingle?.map((e) => {
    return e.OrderDetails;
  });

  const yesterdayMerged = [].concat.apply([], yesterdayItems);

  const yesterdayCompareName = yesterdayMerged.map((e) => {
    const obj = productList?.find((product) => product.name === e?.ItemName);
    return { ...e, cost: obj?.cost };
  });

  yesterdayCompareName?.forEach((order) => {
    yesterdayCost += order?.cost;
    return yesterdayCost;
  });

  const yesterdayProfit = yesterdayRevenue - yesterdayCost;

  const todayProfit = totalAmountOfOrders - totalCost;

  let vietNamD = Intl.NumberFormat("vi-VI");
  useEffect(() => {
    dispatch(cukcukOrderActions.getSingleCukcukOrder(cukcukOrderIds));
    dispatch(productActions.getProducts());
    dispatch(cukcukOrderActions.getYesSingleCukcukOrder(yesterDayIds));
  }, [dispatch, yesterdayCost, totalAmountOfOrders]);

  return (
    <React.Fragment>
      <Title>Profit By {controller ? controller.mode : null}</Title>
      <Typography component="p" variant="h3" className="revenue-container">
        <div className="revenue-num">{vietNamD.format(todayProfit)} đ</div>
        <div className="revenue-num-container">
          <Typography
            component="p"
            className="revenue-container compare"
            style={{
              color:
                todayProfit - yesterdayProfit > 0
                  ? "green"
                  : todayProfit - yesterdayProfit < 0
                  ? "red"
                  : "#F3C501",
            }}
          >
            {todayProfit - yesterdayProfit > 0 ? (
              <ArrowDropUpOutlinedIcon fontSize="medium" />
            ) : todayProfit - yesterdayProfit < 0 ? (
              <ArrowDropDownOutlinedIcon fontSize="medium" />
            ) : null}
            {todayProfit - yesterdayProfit < 0
              ? vietNamD.format(todayProfit - yesterdayProfit).substring(1)
              : vietNamD.format(todayProfit - yesterdayProfit)}{" "}
            đ
          </Typography>
        </div>
      </Typography>
      <Typography
        color="textSecondary"
        className={classes.depositContext}
        component="p"
      >
        On {controller.date}
      </Typography>
    </React.Fragment>
  );
}
