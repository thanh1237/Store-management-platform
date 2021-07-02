import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import PopOver from "pages/Product/components/PopOver";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "redux/actions";
import ProductModal from "pages/Product/container/ProductModal";
import { Backdrop, Button, Fade, Modal } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CreateUpdateFrom from "pages/Product/components/CreateUpdateFrom";
import CircularProgress from "@material-ui/core/CircularProgress";

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

function createData(
  id,
  name,
  type,
  unit,
  quantity,
  cost,
  price,
  ingredients,
  action
) {
  return {
    id,
    name,
    type,
    unit,
    quantity,
    cost,
    price,
    ingredients,
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
        <TableCell align="middle">{row.type}</TableCell>
        <TableCell align="middle">{row.unit}</TableCell>
        <TableCell align="middle">{row.quantity}</TableCell>
        <TableCell align="middle">{row.cost}</TableCell>
        <TableCell align="middle">{row.price}</TableCell>
        <TableCell align="middle">{row.action}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Ingredients
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Ingredient</TableCell>
                    <TableCell>Consumption</TableCell>
                    <TableCell align="middle">Unit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.ingredients.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell component="th" scope="row">
                        {e.ingredient}
                      </TableCell>
                      <TableCell>{e.consumption}</TableCell>
                      <TableCell align="middle">{e.unit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listProducts = useSelector(
    (state) => state?.product?.products?.products
  );
  const loading = useSelector((state) => state.product.loading);
  const singleProduct = useSelector((state) => state.product?.singleProduct);
  const [open, setOpen] = React.useState(false);
  const nonIngredientList = listProducts?.filter(
    (e) => e.type !== "Ingredient"
  );
  const nonAlcoholList = nonIngredientList?.filter((e) => e.type !== "Alcohol");

  const deleteProduct = (id) => {
    dispatch(productActions.deleteProduct(id));
  };

  const handleOpen = async (id) => {
    await dispatch(productActions.getSingleProduct(id));
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await dispatch(productActions.getProducts());
  };
  let vietNamD = Intl.NumberFormat("vi-VI");
  let rows = nonAlcoholList?.map((product, index) => {
    return createData(
      index,
      product.name,
      product.type,
      product.unit,
      product.quantity,
      `${vietNamD.format(product.cost)} đ`,
      `${vietNamD.format(product.price)} đ`,
      product.ingredients,
      <div className="actions">
        <Button
          variant="contained"
          style={{ backgroundColor: "#2EC0FF", color: "white" }}
          onClick={() => handleOpen(product._id)}
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
            {!loading ? (
              <CreateUpdateFrom
                handleClose={handleClose}
                singleProduct={singleProduct}
                listProducts={listProducts}
              />
            ) : (
              <div className={classes.loading}>
                <CircularProgress />
              </div>
            )}
          </Fade>
        </Modal>
        <PopOver handleDelete={deleteProduct} id={product._id} />
      </div>
    );
  });
  useEffect(() => {
    dispatch(productActions.getProducts());
  }, [dispatch]);
  return loading ? (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  ) : (
    <div className="create-button">
      <ProductModal listProducts={listProducts} />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead style={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell />
              <TableCell style={{ color: "white" }}>Index</TableCell>
              <TableCell style={{ color: "white" }} align="middle">
                Name
              </TableCell>
              <TableCell style={{ color: "white" }} align="middle">
                Type
              </TableCell>
              <TableCell style={{ color: "white" }} align="middle">
                Unit
              </TableCell>
              <TableCell style={{ color: "white" }} align="middle">
                Quantity
              </TableCell>
              <TableCell style={{ color: "white" }} align="middle">
                Cost
              </TableCell>
              <TableCell style={{ color: "white" }} align="middle">
                Price
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
