import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { productActions } from "redux/actions";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import { Autocomplete } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loading: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function CreateUpdateIngredient(props) {
  const { handleClose, singleProduct, listProducts } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = listProducts?.map((e) => e);
  const loading = useSelector((state) => state.supplier.loading);
  const suppList = useSelector((state) => state.supplier.suppliers.suppliers);
  const [fields, setFields] = useState([
    {
      ingredient: "",
      consumption: 0,
      unit: "",
    },
  ]);
  const [form, setForm] = useState({
    type: "",
    unit: "",
    name: "",
    supplier: "",
    capacity: "",
    capacityUnit: "",
    cost: "",
    price: "",
    ingredients: [
      {
        ingredient: "",
        consumption: 0,
        unit: "",
      },
    ],
    quantity: "",
    stock: "",
  });

  function handleChangeInputs(i, event, val) {
    let values = [...fields];
    if (!singleProduct) {
    }
    if (val) {
      values[i].ingredient = val.name;
    }
    if (event.target.name === "consumption") {
      values[i].consumption = event.target.value;
    }
    if (event.target.name === "unit") {
      values[i].unit = event.target.value;
    }
    setFields(values);
    setForm({ ...form, ingredients: fields });
  }

  function handleAdd() {
    const values = [...fields];
    values.push({
      ingredient: "",
      consumption: 0,
      unit: "",
    });
    setFields(values);
  }

  function handleRemove() {
    const values = [...fields];
    values.splice(values.length - 1, 1);
    setFields(values);
  }

  const handleChangeType = (event) => {
    setForm({ ...form, type: event.target.value });
  };

  const handleChangeSupp = (event) => {
    setForm({ ...form, supplier: event.target.value });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getDefaultValue = (idx) => {
    products.find((e) => {
      return e.name === fields[idx].ingredient;
    });
  };

  const handleCreateOrUpdateProduct = (e) => {
    e.preventDefault();
    if (!singleProduct) {
      if (
        form.ingredients ===
        [
          {
            ingredient: "",
            consumption: 0,
            unit: "",
          },
        ]
      ) {
        setForm({ ...form, ingredients: [] });
      }
      dispatch(productActions.createProducts({ ...form }));
    } else if (singleProduct) {
      dispatch(productActions.updateProduct(singleProduct._id, form));
    }
    dispatch(productActions.getProducts());
    setForm({
      type: "",
      unit: "",
      name: "",
      supplier: "",
      capacity: "",
      capacityUnit: "ml",
      price: "",
      ingredients: [
        {
          ingredient: "",
          consumption: 0,
          unit: "",
        },
      ],
      quantity: "",
      stock: "",
    });
    handleClose();
  };

  useEffect(() => {
    if (singleProduct) {
      setForm({
        type: singleProduct.type,
        unit: singleProduct.unit,
        name: singleProduct.name,
        supplier: singleProduct.supplier,
        cost: singleProduct.cost,
        capacity: singleProduct.capacity,
        capacityUnit: singleProduct.capacityUnit,
        price: singleProduct.price,
        ingredients: singleProduct.ingredients,
        quantity: singleProduct.quantity,
        stock: singleProduct.stock,
      });
      setFields(singleProduct?.ingredients);
    }
    if (form.type && form.type === "Cocktail") {
      setForm({ ...form, unit: "glass" });
    }
    if (form.type && form.type === "Mocktail") {
      setForm({ ...form, unit: "glass" });
    }
    if (form.type && form.type === "Beer") {
      setForm({ ...form, unit: "btl" });
    }
    if (form.type && form.type === "Alcohol") {
      setForm({ ...form, unit: "btl" });
    }
    if (singleProduct && form.type && form.type === "Ingredient") {
      setForm({ ...form, unit: singleProduct.unit });
    }
    if (!singleProduct && form.type && form.type === "Ingredient") {
      setForm({ ...form, unit: "" });
    }
  }, [dispatch, form.type, singleProduct]);

  return loading ? (
    <div className={classes.loading}>
      {" "}
      <CircularProgress />
    </div>
  ) : (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {singleProduct ? "Update Ingredient" : "Create New Ingredient"}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={form.type}
                  onChange={handleChangeType}
                  label="Type"
                  name="type"
                >
                  <MenuItem value={"Beer"}>Beer</MenuItem>
                  <MenuItem value={"Alcohol"}>Alcohol</MenuItem>
                  <MenuItem value={"Ingredient"}>Ingredient</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="unit"
                label="Unit"
                name="unit"
                onChange={handleChange}
                value={form.unit}
                disabled={form.type !== "Ingredient"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Product Name"
                name="name"
                autoComplete="name"
                onChange={handleChange}
                value={form.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Supplier
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={form.supplier}
                  onChange={handleChangeSupp}
                  label="Supplier"
                  name="supplier"
                >
                  {suppList?.map((e) => {
                    return <MenuItem value={e.name}>{e.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>

              {/* <TextField
                variant="outlined"
                required
                fullWidth
                id="supplier"
                label="Supplier"
                name="supplier"
                autoComplete="supplier"
                onChange={handleChange}
                value={form.supplier}
              /> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="cost"
                variant="outlined"
                id="cost"
                name="cost"
                label="Cost"
                type="number"
                onChange={handleChange}
                fullWidth
                value={form.cost}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                display:
                  form.type === "Cocktail" ||
                  form.type === "Mocktail" ||
                  !form.type
                    ? "none"
                    : null,
                marginBottom: "10px",
              }}
            >
              <TextField
                id="quantity"
                name="quantity"
                label="Daily Quantity Needed"
                type="number"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                value={form.quantity}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                display:
                  form.type === "Cocktail" ||
                  !form.type ||
                  form.type === "Mocktail"
                    ? "none"
                    : null,
                marginBottom: "10px",
              }}
            >
              <TextField
                id="stock"
                name="stock"
                label="Stock"
                type="number"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                value={form.stock}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                display:
                  form.type === "Mocktail" || form.type === "Cocktail"
                    ? "none"
                    : null,
              }}
            >
              <TextField
                autoComplete="capacity"
                variant="outlined"
                id="capacity"
                name="capacity"
                label="Unit Capacity"
                type="number"
                onChange={handleChange}
                fullWidth
                value={form.capacity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="capacityUnit"
                label="Unit Of Capacity Unit"
                name="capacityUnit"
                onChange={handleChange}
                value={form.capacityUnit}
                style={{
                  display:
                    form.type === "Beer" ||
                    form.type === "Alcohol" ||
                    form.type === "Ingredient" ||
                    !form.type
                      ? null
                      : "none",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display:
                  form.type === "Beer" ||
                  form.type === "Alcohol" ||
                  form.type === "Ingredient" ||
                  !form.type
                    ? "none"
                    : null,
              }}
            >
              <TextField
                id="price"
                name="price"
                label="Price"
                type="number"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                value={form.price}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display:
                  form.type === "Beer" ||
                  form.type === "Alcohol" ||
                  form.type === "Ingredient" ||
                  !form.type
                    ? "none"
                    : null,
              }}
            >
              <div
                style={{
                  color: "#2EC0FF",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                Add Ingredients
              </div>
            </Grid>
            {fields?.map((field, idx) => {
              return (
                <Grid
                  spacing={1}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  xs={12}
                  style={{
                    minWidth: "100%",
                    display:
                      form.type === "Beer" ||
                      form.type === "Alcohol" ||
                      form.type === "Ingredient" ||
                      !form.type
                        ? "none"
                        : null,
                    marginBottom: "10px",
                  }}
                >
                  <Grid item xs={4}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={products}
                      value={getDefaultValue(idx)}
                      getOptionLabel={(option) => option.name}
                      name="ingredient"
                      onChange={(event, value) =>
                        handleChangeInputs(idx, event, value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          key={`${idx}` + 1 + `${field}`}
                          variant="outlined"
                          label="Ingredient"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      key={`${idx}` + 2 + `${field}`}
                      autoComplete="consumption"
                      variant="outlined"
                      id="consumption"
                      name="consumption"
                      label="Consumption"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => handleChangeInputs(idx, e)}
                      value={fields[idx]?.consumption}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      key={`${idx}`}
                      autoComplete="unit"
                      variant="outlined"
                      id="filled-number"
                      name="unit"
                      label="Unit"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => handleChangeInputs(idx, e)}
                      value={fields[idx]?.unit}
                    />
                  </Grid>
                </Grid>
              );
            })}
            <Grid
              item
              xs={12}
              style={{
                display:
                  form.type === "Beer" ||
                  form.type === "Alcohol" ||
                  form.type === "Ingredient" ||
                  !form.type
                    ? "none"
                    : "flex",
                justifyContent: "center",
              }}
            >
              <Button
                color="primary"
                onClick={handleAdd}
                style={{ color: "#2EC0FF" }}
              >
                <AddCircleOutlineOutlinedIcon />
              </Button>
              <Button
                color="primary"
                onClick={() => handleRemove()}
                style={{ color: "red" }}
              >
                <RemoveCircleOutlineOutlinedIcon />
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleCreateOrUpdateProduct}
            style={{ backgroundColor: "#2EC0FF", color: "white" }}
          >
            {singleProduct ? "Update" : "Create"}
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
