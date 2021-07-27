import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch } from "react-redux";
import { stockActions } from "redux/actions";
import { toast } from "react-toastify";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

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

export default function OrderDialog(props) {
  const {
    authorId,
    open,
    setOpen,
    stockListWithProduct,
    nearestDate,
    author,
    role,
    orderId,
    setUpdated,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    setUpdated(false);
  };

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

  let defaultRows = stockListWithProduct?.map((row, idx) => {
    return {
      id: `${idx + 1}`,
      name: row.product?.name,
      start: row?.start,
      stockIn: row.stockIn,
      stockOut: row.stockOut,
      estimate: row.estimate,
      real: row.real,
      note: row.note,
      orderNeeded: row.orderNeeded,
      orderQuantity: row.orderQuantity,
      quantity: row.product?.quantity,
    };
  });

  const handleUpdateStock = () => {
    try {
      const stockIdArr = stockListWithProduct?.map((e) => e._id);
      const productArr = stockListWithProduct?.map((e) => e.product);
      const productIdArr = productArr?.map((e) => e._id);
      const final = defaultRows?.map((row, idx) => {
        return {
          ...row,
          stockId: stockIdArr[idx],
          author: authorId,
          order: orderId,
          product: productIdArr[idx],
        };
      });
      dispatch(stockActions.updateStock(final));
      toast.success(`Update Successes ${moment().format("DD-MM-YYY")} Stock`);
      setUpdated(true);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
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
      editable: true,
      width: 130,
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
    {
      field: "stockIn",
      headerName: "In",
      width: 110,
      editable: true,
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
    {
      field: "stockOut",
      headerName: "Out",
      width: 110,
      editable: true,
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
    },
    {
      field: "estimate",
      headerName: "Estimate",
      width: 130,
      renderCell: (params) => {
        updateRows(params.value, params.row.id, params.field);
      },
      valueGetter: getEstimate,
    },
    {
      field: "real",
      headerName: "Real Stock",
      width: 140,
      editable: true,
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
  const ColumnFluidWidthGrid = () => {
    return (
      <div style={{ width: "100%", height: "400px" }} className={classes.root}>
        <DataGrid
          rows={defaultRows}
          columns={columns}
          autoHeight={true}
          checkboxSelection={false}
        />
      </div>
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">
          Stock of {`${author} - ${role}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {moment(nearestDate).format("DD-MM-YYYY")}
          </DialogContentText>
          {ColumnFluidWidthGrid()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#2EC0FF" }}>
            Cancel
          </Button>
          <Button onClick={handleUpdateStock} style={{ color: "#2EC0FF" }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
