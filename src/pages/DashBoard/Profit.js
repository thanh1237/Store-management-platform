import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import moment from "moment";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import { useSelector } from "react-redux";
import { CircularProgress, Tooltip } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
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

export const Profit = ({
  cukcukOrderList,
  productList,
  cukcukDetailOrders,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const controller = useSelector((state) => state.control.obj);
  let errors = [];
  const loading = useSelector((state) => state.cukcukOrder.loading);
  const yesterDaySingle = useSelector((state) => state.cukcukOrder.yesterday);

  let totalCost = 0;
  let totalAmountOfOrders = 0;
  let yesterdayCost = 0;
  let yesterdayRevenue = 0;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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

  const yesterdayItems = yesterDaySingle?.map((e) => {
    return e.OrderDetails;
  });

  const yesterdayMerged = [].concat.apply([], yesterdayItems);

  const yesterdayCompareName = yesterdayMerged.map((e) => {
    const obj = productList?.find((product) => product.name === e?.ItemName);
    if (!obj) {
      errors = [...errors, e?.ItemName];
      return { ...e, cost: 0 };
    } else {
      return { ...e, cost: obj?.cost };
    }
  });

  yesterdayCompareName?.forEach((order) => {
    yesterdayCost += order?.cost;
    return yesterdayCost;
  });

  const getCukcukDetailOrders = cukcukDetailOrders?.map((item, idx) => {
    if (cukcukDetailOrders) {
      return { ...item, order: cukcukDetailOrders[idx] };
    }
    return item;
  });

  const getOrder = getCukcukDetailOrders?.map((order) => {
    return order.order;
  });

  const concatArr = getOrder?.flat();

  const test2 = concatArr?.map((e) => e.OrderDetails);

  const test3 = [].concat.apply([], test2);

  const mergedArrays = [].concat.apply([], test3);

  const compareName = mergedArrays?.map((e) => {
    const obj = productList?.find((product) => product.name === e?.ItemName);
    if (!obj) {
      errors = [...errors, e?.ItemName];
      return { ...e, cost: 0 };
    } else {
      return { ...e, cost: obj?.cost };
    }
  });

  compareName?.forEach((order) => {
    totalCost += order?.cost;
    return totalCost;
  });

  const yesterdayProfit = yesterdayRevenue - yesterdayCost;

  const todayProfit = totalAmountOfOrders - totalCost;

  let vietNamD = Intl.NumberFormat("vi-VI");

  const alert = errors.join(", ");

  return loading ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </div>
  ) : (
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

      <Tooltip
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        title={alert}
      >
        <ErrorOutlineOutlinedIcon />
      </Tooltip>
    </React.Fragment>
  );
};

export default Profit;
