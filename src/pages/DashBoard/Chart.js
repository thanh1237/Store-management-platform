import React, { useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { controlActions } from "redux/actions/control.action";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

// const data = [
//   createData("00:00", 0),
//   createData("03:00", 300),
//   createData("06:00", 600),
//   createData("09:00", 800),
//   createData("12:00", 1500),
//   createData("15:00", 2000),
//   createData("18:00", 2400),
//   createData("21:00", 2400),
//   createData("24:00", undefined),
// ];

export default function Chart({ sainVoiceList }) {
  const theme = useTheme();
  let vietNamD = Intl.NumberFormat("vi-VI");
  const control = useSelector((state) => state.control.obj);

  let sortDate = sainVoiceList
    .sort(function (a, b) {
      return a.RefDate < b.RefDate ? -1 : a.RefDate > b.RefDate ? 1 : 0;
    })
    .filter((el) => {
      if (control.mode === "Date") {
        return moment(el.RefDate).format("M") === moment().format("M");
      } else {
        return moment(el.RefDate).format("YYYY") === moment().format("YYYY");
      }
    });

  const reduceDateArr = sortDate.reduce((total, element) => {
    let elementArray = total.map((element) =>
      moment(element.RefDate).format("L")
    );
    if (!elementArray.includes(moment(element.RefDate).format("L"))) {
      return [
        ...total,
        {
          RefDate: element.RefDate,
          TotalAmount: element.TotalAmount,
        },
      ];
    } else {
      const index = total.findIndex(
        (e) =>
          moment(e.RefDate).format("L") === moment(element.RefDate).format("L")
      );
      total[index].TotalAmount += element.TotalAmount;
    }
    return total;
  }, []);

  const reduceMonthArr = sortDate.reduce((total, element) => {
    let elementArray = total.map((element) =>
      moment(element.RefDate).format("MMM")
    );
    if (!elementArray.includes(moment(element.RefDate).format("MMM"))) {
      return [
        ...total,
        {
          RefDate: element.RefDate,
          TotalAmount: element.TotalAmount,
        },
      ];
    } else {
      const index = total.findIndex(
        (e) =>
          moment(e.RefDate).format("MMM") ===
          moment(element.RefDate).format("MMM")
      );
      total[index].TotalAmount += element.TotalAmount;
    }
    return total;
  }, []);

  const dateData = reduceDateArr?.map((sainVoice) => {
    return createData(
      moment(sainVoice.RefDate).format("dd"),
      parseInt(vietNamD.format(sainVoice.TotalAmount))
    );
  });

  const monthData = reduceMonthArr?.map((sainVoice) => {
    return createData(
      moment(sainVoice.RefDate).format("MMM"),
      parseInt(vietNamD.format(sainVoice.TotalAmount))
    );
  });

  return (
    <React.Fragment>
      <Title style={{ color: "#2EAFFF" }}>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={control.mode === "Date" ? dateData : monthData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
          color={"#2EAFFF"}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
