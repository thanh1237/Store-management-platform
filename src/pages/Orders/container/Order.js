import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import { productActions, stockActions, orderActions } from "redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import moment from "moment";
import { useRef } from "react";
import { useMemo } from "react";
import { useState } from "react";

export default function ValueGetterGrid() {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.auth.user._id);
  const listStock = useSelector((state) => state.stock.stocks.stocks);
  const listOrder = useSelector((state) => state.order.orders.orders);
  const newestStockList = listStock?.filter((stock) => {
    let createdDate = stock.createdDate;
    if (moment(createdDate).format("L") === moment().format("L")) {
      return moment(createdDate).format("L") === moment().format("L");
    } else {
      return (
        moment(createdDate).format("L") ===
        moment().subtract(1, "days").format("L")
      );
    }
  });
  const stockByUser = newestStockList?.filter((stock) => {
    return stock.author === currentUserId;
  });
  let defaultRows = stockByUser?.map((row, idx) => {
    return {
      id: `${idx + 1}`,
      name: row.product.name,
      start: row.real,
      stockIn: 0,
      stockOut: 0,
      estimate: row.estimate,
      real: 0,
      note: "",
    };
  });
  const updateRows = (value, id, field) => {
    const item = defaultRows.find((item) => item.id === id);
    item[field] = value;
  };
  const columns = [
    {
      field: "name",
      headerName: "Product Name",
      width: 130,
    },
    {
      field: "start",
      headerName: "Start",
      width: 130,
    },
    {
      field: "stockIn",
      headerName: "In",
      width: 130,
      editable: true,
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
    {
      field: "stockOut",
      headerName: "Out",
      width: 130,
      editable: true,
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
    { field: "estimate", headerName: "Estimate", width: 130 },
    {
      field: "real",
      headerName: "Real Stock",
      width: 130,
      editable: true,
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
    {
      field: "note",
      headerName: "Note",
      width: 130,
      editable: true,
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
  ];

  const handleClickButton = () => {
    const orderIdArr = listOrder?.map((e) => e._id);
    const authorIdArr = listOrder?.map((e) => e.author._id);
    const productIdArr = stockByUser?.map((e) => e.product._id);
    const final = defaultRows?.map((row, idx) => {
      return {
        ...row,
        order: orderIdArr[idx],
        author: authorIdArr[idx],
        product: productIdArr[idx],
      };
    });
    final?.forEach((obj) => dispatch(stockActions.createStock(obj)));
    defaultRows = undefined;
  };
  useEffect(() => {
    dispatch(productActions.getProducts());
    dispatch(stockActions.getStocks());
    dispatch(orderActions.getOrders());
  }, [dispatch]);

  return (
    <>
      {defaultRows ? (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={defaultRows}
            columns={columns}
            autoHeight={true}
            checkboxSelection={false}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#2EC0FF", color: "white" }}
            color="primary"
            onClick={handleClickButton}
          >
            Submit
          </Button>
        </div>
      ) : (
        <div>Today Stock has been created. Please come back tomorrow</div>
      )}
    </>
  );
}
