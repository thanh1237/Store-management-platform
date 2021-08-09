import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PopOver from "pages/Product/components/PopOver";
import { useDispatch, useSelector } from "react-redux";
import { supplierActions } from "redux/actions";
import { Backdrop, Button, Fade, Modal } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import CreateUpdateSupp from "pages/Supplier/component/CreateUpdateSupp";
import SuppModal from "pages/Supplier/component/SuppModal";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  loading: {
    display: "flex",
    justifyContent: "center",
  },
}));

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "100%",
    },
  },
});

function createData(id, name, email, phone, link, action) {
  return {
    id,
    name,
    email,
    phone,
    link,
    action,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const isCocktail = (type) => {
    if (type === "Cocktail" || type === "Mocktail") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {isCocktail(row.type) ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : null}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="middle">{row.name}</TableCell>
        <TableCell align="middle">{row.email}</TableCell>
        <TableCell align="middle">{row.phone}</TableCell>
        <TableCell align="middle">{row.link}</TableCell>
        <TableCell align="middle">{row.action}</TableCell>
      </TableRow>
      <TableRow></TableRow>
    </React.Fragment>
  );
}

export default function Suppliers() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.supplier.loading);
  const listSupp = useSelector((state) => state.supplier.suppliers.suppliers);
  const singleSupp = useSelector((state) => state.supplier?.singleSupplier);
  const [open, setOpen] = React.useState(false);

  const deleteSupp = (id) => {
    dispatch(supplierActions.deleteSuppler(id));
  };

  const handleOpen = async (id) => {
    await dispatch(supplierActions.getSingleSuppler(id));
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await dispatch(supplierActions.getSuppliers());
  };
  let rows = listSupp?.map((supp, index) => {
    return createData(
      index,
      supp.name,
      supp.email,
      supp.phone,
      supp.link,

      <div className="actions">
        <Button
          variant="contained"
          style={{ backgroundColor: "#2EC0FF", color: "white" }}
          onClick={() => handleOpen(supp._id)}
        >
          <EditOutlinedIcon style={{ color: "white" }} />
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <CreateUpdateSupp
              handleClose={handleClose}
              singleSupp={singleSupp}
              listSupp={listSupp}
            />
          </Fade>
        </Modal>
        <PopOver handleDelete={deleteSupp} id={supp._id} />
      </div>
    );
  });
  useEffect(() => {
    dispatch(supplierActions.getSuppliers());
  }, [dispatch]);
  return loading ? (
    <div className={classes.loading}>
      {" "}
      <CircularProgress />
    </div>
  ) : (
    <div className="create-button">
      <SuppModal listSupp={listSupp} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead style={{ backgroundColor: "black", width: "100%" }}>
            <TableRow>
              <TableCell />
              <TableCell style={{ color: "white" }}>Index</TableCell>
              <TableCell style={{ color: "white" }} align="middle">
                Name
              </TableCell>
              <TableCell style={{ color: "white" }} align="middle">
                Email
              </TableCell>
              <TableCell style={{ color: "white" }} align="middle">
                Phone
              </TableCell>
              <TableCell style={{ color: "white" }} align="middle">
                Link
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                }}
                align="middle"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
