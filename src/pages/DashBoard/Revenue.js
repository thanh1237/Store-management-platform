import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { useEffect } from "react";
import moment from "moment";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
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

export default function Revenue({ sainVoiceList }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const controller = useSelector((state) => state.control.obj);

  let totalAmount = 0;
  let monthTotalAmount = 0;
  let yesterdayTotalAmount = 0;
  let lastMonthTotalAmount = 0;
  let totalAmountOfOrders = 0;

  const yesterdayArr = sainVoiceList?.filter((e) => {
    let yesterday = moment(controller.date)
      .subtract(1, "days")
      .format("DD/MM/YYYY");
    return moment(e.Date).format("DD/MM/YYYY") === yesterday;
  });

  const lastMonthArr = sainVoiceList?.filter((e) => {
    let lastMonth = moment(controller.date)
      .subtract(1, "months")
      .format("MM/YYYY");
    return moment(e.Date).format("MM/YYYY") === lastMonth;
  });

  yesterdayArr?.map((sainVoice) => {
    return (yesterdayTotalAmount += sainVoice.TotalAmount);
  });

  lastMonthArr?.map((sainVoice) => {
    return (lastMonthTotalAmount += sainVoice.TotalAmount);
  });

  const todayArr = sainVoiceList?.filter((e) => {
    let today = moment(controller.date).format("DD/MM/YYYY");
    return moment(e.Date).format("DD/MM/YYYY") === today;
  });

  const thisMonthArr = sainVoiceList?.filter((e) => {
    let thisMonth = moment(controller.date).format("MM/YYYY");
    return moment(e.Date).format("MM/YYYY") === thisMonth;
  });

  todayArr?.map((sainVoice) => {
    return (totalAmount += sainVoice.TotalAmount);
  });

  thisMonthArr?.map((sainVoice) => {
    return (monthTotalAmount += sainVoice.TotalAmount);
  });

  let vietNamD = Intl.NumberFormat("vi-VI");

  useEffect(() => {}, [dispatch, totalAmount, totalAmountOfOrders]);

  return (
    <React.Fragment>
      <Title>Revenues By {controller ? controller.mode : null}</Title>
      <Typography component="p" variant="h3" className="revenue-container">
        <div className="revenue-num">
          {controller.mode === "Date"
            ? `${vietNamD.format(totalAmount)} đ`
            : `${vietNamD.format(monthTotalAmount)} đ`}
        </div>
        <div className="revenue-num-container">
          {controller.mode === "Date" ? (
            <Typography
              component="p"
              className="revenue-container compare"
              style={{
                color:
                  totalAmount - yesterdayTotalAmount > 0
                    ? "green"
                    : totalAmount - yesterdayTotalAmount < 0
                    ? "red"
                    : "#F3C501",
              }}
            >
              {totalAmount - yesterdayTotalAmount > 0 ? (
                <ArrowDropUpOutlinedIcon fontSize="medium" />
              ) : totalAmount - yesterdayTotalAmount < 0 ? (
                <ArrowDropDownOutlinedIcon fontSize="medium" />
              ) : null}
              {totalAmount - yesterdayTotalAmount < 0
                ? vietNamD
                    .format(totalAmount - yesterdayTotalAmount)
                    .substring(1)
                : vietNamD.format(totalAmount - yesterdayTotalAmount)}{" "}
              đ
            </Typography>
          ) : (
            <Typography
              component="p"
              className="revenue-container compare"
              style={{
                color:
                  monthTotalAmount - lastMonthTotalAmount > 0
                    ? "green"
                    : monthTotalAmount - lastMonthTotalAmount < 0
                    ? "red"
                    : "#F3C501",
              }}
            >
              {monthTotalAmount - lastMonthTotalAmount > 0 ? (
                <ArrowDropUpOutlinedIcon fontSize="medium" />
              ) : monthTotalAmount - lastMonthTotalAmount < 0 ? (
                <ArrowDropDownOutlinedIcon fontSize="medium" />
              ) : null}
              {monthTotalAmount - lastMonthTotalAmount < 0
                ? vietNamD
                    .format(monthTotalAmount - lastMonthTotalAmount)
                    .substring(1)
                : vietNamD.format(monthTotalAmount - lastMonthTotalAmount)}{" "}
              đ
            </Typography>
          )}
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
