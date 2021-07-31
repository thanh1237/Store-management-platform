import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { orderActions, productActions, stockActions } from "redux/actions";
import { useEffect } from "react";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import moment from "moment";
import { toast } from "react-toastify";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    "& .super-app-theme--cell": {
      color: "rgba(224, 183, 60, 0.55)",
      fontWeight: "600",
    },
    "& .super-app.negative": {
      color: "rgb(20,168,0)",
      fontWeight: "600",
    },
    "& .super-app.zero": {
      color: "rgba(224, 183, 60, 0.55)",
      fontWeight: "600",
    },
    "& .super-app.positive": {
      color: "#d47483",
      fontWeight: "600",
    },
  },
});

export default function Order() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentUserId = useSelector((state) => state.auth.user._id);
  const listStock = useSelector((state) => state?.stock?.stocks?.stocks);
  const listOrder = useSelector((state) => state?.order?.orders?.orders);

  let nearestDate;
  let rows = [];

  const stockByUser = listStock?.filter((stock) => {
    return stock.author === currentUserId;
  });

  const datesToBeChecked = stockByUser?.map((stock) =>
    moment(stock.createdAt).format("YYYY-MM-DD")
  );
  const newestStockList = stockByUser?.filter((stock) => {
    let createdDate = moment(stock.createdAt).format("YYYY-MM-DD");
    const dateToCheckFor = moment().format("YYYY-MM-DD");
    datesToBeChecked.forEach((date) => {
      let diff = moment(date).diff(moment(dateToCheckFor), "days");
      let diff2 = moment(createdDate).diff(moment(dateToCheckFor), "days");
      if (diff === 0) {
        return (nearestDate = moment().format("YYYY-MM-DD"));
      } else if (diff < 0 && diff === diff2 && !nearestDate) {
        nearestDate = date;
      }
    });
    return createdDate === nearestDate;
  });

  const bottle = newestStockList?.filter(
    (e) =>
      e.product?.type === "Alcohol" ||
      e.product?.type === "Beer" ||
      e.product?.type === "Ingredient"
  );

  const reduceList = bottle?.reduce((total, product) => {
    let tableArray = total.map((pro) => pro.product.name);
    if (!tableArray.includes(product.product.name)) {
      return [...total, product];
    }
    return total;
  }, []);

  const getEstimate = (params) => {
    const estimate =
      Number(params.getValue(params.id, "start")) +
      Number(params.getValue(params.id, "stockIn")) -
      Number(params.getValue(params.id, "stockOut"));
    return estimate;
  };

  const getOrderNeeded = (params) => {
    let orderNeeded =
      Number(params.getValue(params.id, "real")) -
      Number(params.getValue(params.id, "quantity")) +
      Number(params.getValue(params.id, "orderQuantity"));
    if (orderNeeded > 0) {
      orderNeeded = `+${orderNeeded}`;
    }
    return orderNeeded;
  };

  const updateRows = (value, id, field) => {
    const item = rows?.find((item) => item.id === id);
    item[field] = value;
  };

  const columns = [
    {
      field: "name",
      headerName: "Product Name",
      width: 200,
    },
    {
      field: "start",
      headerName: "Start",
      width: 130,
    },
    {
      field: "stockIn",
      headerName: "In",
      width: 110,
      editable: nearestDate !== moment().format("YYYY-MM-DD"),
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
    {
      field: "stockOut",
      headerName: "Out",
      width: 110,
      editable: nearestDate !== moment().format("YYYY-MM-DD"),
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
    {
      field: "estimate",
      headerName: "Estimate",
      width: 130,
      valueGetter: getEstimate,
    },
    {
      field: "real",
      headerName: "Real Stock",
      width: 140,
      editable: nearestDate !== moment().format("YYYY-MM-DD"),
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
    {
      field: "orderNeeded",
      headerName: "Order Needed",
      width: 158,
      valueGetter: getOrderNeeded,
      cellClassName: (params) =>
        clsx("super-app", {
          negative: params.value > 0,
          positive: params.value <= 0,
        }),
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
    {
      field: "orderQuantity",
      headerName: "Order",
      width: 120,
      editable: nearestDate !== moment().format("YYYY-MM-DD"),
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
    {
      field: "note",
      headerName: "Note",
      width: 300,
      editable: nearestDate !== moment().format("YYYY-MM-DD"),
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
  ];

  if (reduceList && nearestDate !== moment().format("YYYY-MM-DD")) {
    rows = reduceList?.map((row, idx) => {
      return {
        id: `${idx + 1}`,
        name: row.product?.name,
        start: row?.real,
        stockIn: 0,
        stockOut: 0,
        estimate: 0,
        real: 0,
        note: "",
        quantity: row.product?.quantity,
        orderNeeded: 0,
        orderQuantity: 0,
      };
    });
  } else if (reduceList && nearestDate === moment().format("YYYY-MM-DD")) {
    rows = reduceList?.map((row, idx) => {
      return {
        id: `${idx + 1}`,
        name: row.product?.name,
        start: row?.start,
        stockIn: row?.stockIn,
        stockOut: row?.stockOut,
        estimate: row?.estimate,
        real: row?.real,
        note: row?.note,
        quantity: row.product?.quantity,
        orderNeeded: row.orderNeeded,
        orderQuantity: row.orderQuantity,
      };
    });
  }

  const handleClickButton = () => {
    const orderIdArr = listOrder?.find((e) => e.author._id === currentUserId);
    const productIdArr = bottle?.map((e) => e.product?._id);
    const final = rows?.map((row, idx) => {
      return {
        ...row,
        order: orderIdArr._id,
        author: currentUserId,
        product: productIdArr[idx],
      };
    });
    try {
      dispatch(stockActions.createStock(final));
      toast.success("Daily stock have been sent to Admin successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(productActions.getProducts());
    dispatch(stockActions.getStocks());
    dispatch(orderActions.getOrders());
  }, [dispatch]);

  return rows.length === 0 ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </div>
  ) : (
    <div style={{ height: "100%", width: "100%" }} className={classes.root}>
      <h2>
        Stock of {moment().format("DD-MM-YYYY")}
        <span>
          {nearestDate === moment().format("YYYY-MM-DD")
            ? ` (Read Only)`
            : ` (Not Submitted yet)`}
        </span>
      </h2>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        checkboxSelection={false}
      />
      <div className="button-container">
        <Button
          className="order-button"
          variant="contained"
          color="primary"
          style={{
            backgroundColor:
              nearestDate !== moment().format("YYYY-MM-DD") ? "#2EC0FF" : null,
          }}
          onClick={handleClickButton}
          disabled={
            nearestDate !== moment().format("YYYY-MM-DD") ? false : true
          }
        >
          Submit Order
        </Button>
      </div>
      <h5
        style={{
          display:
            nearestDate !== moment().format("YYYY-MM-DD") ? "none" : null,
        }}
      >
        Today stock has been created. Please come back tomorrow
      </h5>
    </div>
  );
}
