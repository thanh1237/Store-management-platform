import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "redux/actions";
import { useEffect } from "react";
import moment from "moment";
import { Button, TextField } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import OrderDialog from "pages/OrderList/component/OrderDialog";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function TableOrder({ stock, setUpdated }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.products.products);
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);
  const stockList = stock?.stocks;
  const author = stock?.author.name;
  const authorId = stock?.author._id;
  const role = stock?.author.role;
  const orderId = stock._id;

  let nearestDate;

  const newestStockList = stockList?.filter((stock) => {
    const datesToBeChecked = stockList?.map((stock) =>
      moment(stock.createdAt).format("YYYY-MM-DD")
    );
    const dateToCheckFor = moment().format("YYYY-MM-DD");
    datesToBeChecked.forEach((day) => {
      let diff = moment(day).diff(moment(dateToCheckFor), "days");
      if (diff < 0) {
        if (nearestDate) {
          if (moment(day).diff(moment(nearestDate), "days") < 0) {
            nearestDate = day;
          }
        } else {
          nearestDate = day;
        }
      }
      if (nearestDate !== date) {
        nearestDate = date;
      }
    });
    return moment(stock.createdAt).format("YYYY-MM-DD") === nearestDate;
  });

  const stockListWithProduct = newestStockList?.map((stock) => {
    let proId = stock.product;
    const returnedArr = productList?.find((pro) => {
      return pro._id === proId;
    });
    return { ...stock, product: returnedArr };
  });

  function createData(name, start, stockIn, stockOut, estimate, real, note) {
    return { name, start, stockIn, stockOut, estimate, real, note };
  }

  const rows = stockListWithProduct?.map((e) => {
    return createData(
      e.product?.name,
      e.start,
      e.stockIn,
      e.stockOut,
      e.estimate,
      e.real,
      e.note
    );
  });

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const inputProps = {
    max: moment().format("YYYY-MM-DD"),
  };

  const handleOpen = () => {
    setUpdated(false);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(productActions.getProducts());
    setDate(nearestDate);
  }, [dispatch, nearestDate, open]);

  return (
    <TableContainer component={Paper}>
      <form className={classes.container} noValidate>
        <TextField
          inputProps={inputProps}
          id="date"
          label="Date"
          type="date"
          value={date}
          defaultValue={nearestDate}
          className={classes.textField}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          style={{
            backgroundColor: rows.length !== 0 ? "#2EC0FF" : "grey",
            color: "white",
          }}
          onClick={() => handleOpen(stock._id)}
          disabled={rows.length === 0}
        >
          <EditOutlinedIcon style={{ color: "white" }} />
        </Button>
        <OrderDialog
          open={open}
          setOpen={setOpen}
          stockListWithProduct={stockListWithProduct}
          nearestDate={nearestDate}
          author={author}
          authorId={authorId}
          role={role}
          orderId={orderId}
          setUpdated={setUpdated}
        />
      </form>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          {date ? (
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="middle">Start</TableCell>
              <TableCell align="middle">In</TableCell>
              <TableCell align="middle">Out</TableCell>
              <TableCell align="middle">Estimate</TableCell>
              <TableCell align="middle">Real</TableCell>
              <TableCell align="middle">Note</TableCell>
            </TableRow>
          ) : null}
        </TableHead>
        <TableBody>
          {!date ? (
            <h1>Please select date</h1>
          ) : (
            rows.map((row, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="middle">{row.start}</TableCell>
                  <TableCell align="middle">{row.stockIn}</TableCell>
                  <TableCell align="middle">{row.stockOut}</TableCell>
                  <TableCell align="middle">{row.estimate}</TableCell>
                  <TableCell align="middle">{row.real}</TableCell>
                  <TableCell align="middle">{row.note}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
