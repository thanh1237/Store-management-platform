import React, { useEffect, useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import Title from "pages/DashBoard/Title";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useDispatch } from "react-redux";
import { controlActions } from "redux/actions/control.action";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export const ControlBoard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [controlVal, setControlVal] = useState("Date");
  const inputProps = {
    max: moment().format("YYYY-MM-DD"),
  };

  const inputMonthProps = {
    max: moment().format("YYYY-MM"),
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    dispatch(
      controlActions.control({
        date,
        mode: controlVal,
      })
    );
  };

  const handleViewMode = (string) => {
    if (string === "Date") {
      setDate(moment().format("YYYY-MM-DD"));
    } else {
      setDate(moment().format("YYYY-MM"));
    }
    setControlVal(string);
    dispatch(
      controlActions.control({
        date,
        mode: controlVal,
      })
    );
  };

  useEffect(() => {
    dispatch(
      controlActions.control({
        date,
        mode: controlVal,
      })
    );
  }, [dispatch, date, controlVal]);

  return (
    <React.Fragment>
      <Title>Control Board</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => handleViewMode("Date")}
          >
            Date View
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => handleViewMode("Month")}
          >
            Month View
          </Button>
        </Grid>

        <Grid item xs={12} md={12} className="control-date">
          <form className={classes.container}>
            {controlVal === "Date" ? (
              <TextField
                inputProps={inputProps}
                id="date"
                label="Date"
                type="date"
                value={date}
                className={classes.textField}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            ) : controlVal === "Month" ? (
              <TextField
                id="month"
                label="Month"
                type="month"
                inputProps={inputMonthProps}
                value={date}
                onChange={handleDateChange}
              />
            ) : null}
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default ControlBoard;
