import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { useEffect } from "react";
import moment from "moment";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({ sainVoiceList }) {
  const classes = useStyles();
  let totalAmount = 0;
  let yesterdayTotalAmount = 0;

  const yesterdayArr = sainVoiceList?.filter((e) => {
    let yesterday = moment().subtract(1, "days").format("DD/MM/YYYY");
    return moment(e.RefDate).format("DD/MM/YYYY") === yesterday;
  });

  yesterdayArr?.map((sainVoice) => {
    return (yesterdayTotalAmount += sainVoice.TotalAmount);
  });

  const todayArr = sainVoiceList?.filter((e) => {
    let today = moment().format("DD/MM/YYYY");
    return moment(e.RefDate).format("DD/MM/YYYY") === today;
  });

  todayArr?.map((sainVoice) => {
    return (totalAmount += sainVoice.TotalAmount);
  });

  let vietNamD = Intl.NumberFormat("vi-VI");

  useEffect(() => {}, [totalAmount]);

  return (
    <React.Fragment>
      <Title>Today Revenues</Title>
      <Typography component="p" variant="h4" className="revenue-container">
        <div className="revenue-num">{vietNamD.format(totalAmount)} đ</div>
        <Typography
          component="p"
          className="revenue-container compare"
          style={{
            color:
              totalAmount - yesterdayTotalAmount > 0
                ? "green"
                : totalAmount - yesterdayTotalAmount < 0
                ? "red"
                : "yellow",
          }}
        >
          {totalAmount - yesterdayTotalAmount > 0 ? (
            <ArrowDropUpOutlinedIcon fontSize="medium" />
          ) : totalAmount - yesterdayTotalAmount < 0 ? (
            <ArrowDropDownOutlinedIcon fontSize="medium" />
          ) : (
            <RemoveOutlinedIcon fontSize="medium" />
          )}
          {totalAmount - yesterdayTotalAmount < 0
            ? vietNamD.format(totalAmount - yesterdayTotalAmount).substring(1)
            : vietNamD.format(totalAmount - yesterdayTotalAmount)}{" "}
          đ
        </Typography>
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        On {moment().format("DD/MM/YYYY")}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
