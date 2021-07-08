import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import { productActions, stockActions, orderActions } from "redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import moment from "moment";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function ValueGetterGrid() {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.auth.user._id);
  const listStock = useSelector((state) => state.stock.stocks.stocks);
  const listOrder = useSelector((state) => state.order.orders.orders);
  const loading = useSelector((state) => state.stock.loading);
  let defaultRows = [];
  let bottle;
  let nearestDate;
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

  if (nearestDate === moment().format("YYYY-MM-DD")) {
    bottle = [];
  } else {
    bottle = newestStockList?.filter(
      (e) =>
        e.product?.type === "Alcohol" ||
        e.product?.type === "Beer" ||
        e.product?.type === "Ingredient"
    );
  }
  console.log("nearestDate", nearestDate);
  const reduceList = bottle?.reduce((total, product) => {
    let tableArray = total.map((pro) => pro.product.name);
    if (!tableArray.includes(product.product.name)) {
      return [...total, product];
    }
    return total;
  }, []);
  if (reduceList) {
    defaultRows = reduceList?.map((row, idx) => {
      return {
        id: `${idx + 1}`,
        name: row.product?.name,
        start: row?.real,
        stockIn: 0,
        stockOut: 0,
        estimate: 0,
        real: 0,
        note: "",
      };
    });
  } else {
    defaultRows = [];
  }

  const getEstimate = (params) => {
    const estimate =
      Number(params.getValue(params.id, "start")) +
      Number(params.getValue(params.id, "stockIn")) -
      Number(params.getValue(params.id, "stockOut"));
    return estimate;
  };

  const updateRows = (value, id, field) => {
    const item = defaultRows.find((item) => item.id === id);
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
    {
      field: "estimate",
      headerName: "Estimate",
      width: 130,
      valueGetter: getEstimate,
    },
    {
      field: "real",
      headerName: "Real Stock",
      width: 200,
      editable: true,
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
    {
      field: "note",
      headerName: "Note",
      width: 300,
      editable: true,
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
  ];
  const handleClickButton = () => {
    const orderIdArr = listOrder?.find((e) => e.author._id === currentUserId);
    const productIdArr = bottle?.map((e) => e.product?._id);
    const final = defaultRows?.map((row, idx) => {
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
  return loading ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </div>
  ) : (
    <>
      {defaultRows.length > 0 ? (
        <div className="order" style={{ height: "100%", width: "100%" }}>
          <h2 disabled>Stock of {moment().format("DD-MM-YYYY")}</h2>
          <DataGrid
            rows={defaultRows}
            columns={columns}
            autoHeight={true}
            checkboxSelection={false}
          />
          <div className="button-container">
            <Button
              className="order-button"
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#2EC0FF" }}
              onClick={handleClickButton}
            >
              Submit Order
            </Button>
          </div>
        </div>
      ) : (
        <div>Today Stock has been created. Please come back tomorrow</div>
      )}
    </>
  );
}
