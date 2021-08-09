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
import { useDispatch } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { productActions } from "redux/actions";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined";
import { Autocomplete } from "@material-ui/lab";

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
}));

export default function CreateUpdateFrom(props) {
  const { totalArr, handleClose, singleProduct, listProducts } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
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
    cost: "",
    price: "",
    capacity: "",
    capacityUnit: "",
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
  let costArr = [];

  function handleChangeInputs(i, event, val) {
    let values = [...fields];
    if (event.target.name === "consumption") {
      values[i].consumption = event.target.value;
    }
    if (event.target.name === "unit") {
      values[i].unit = event.target.value;
    }

    let consumptionArr = values.map((e) => e.consumption);
    let cost = consumptionArr.map((e, idx) => {
      return (e = Number(
        Math.ceil(values[idx].cost / values[idx]?.capacity) * Number(e)
      ));
    });
    costArr.push(cost);
    let final = cost?.reduce((a, b) => a + b, 0);
    if (form.type === "Cocktail") {
      final = final + Math.floor((final * 10) / 100);
    }
    if (form.type === "Food") {
      final = final + Math.floor((final * 20) / 100);
    }
    setFields(values);
    setForm({
      ...form,
      cost: Intl.NumberFormat().format(final),
      ingredients: fields,
    });
  }

  function handleAdd() {
    const values = [...fields];
    values.push({
      ingredient: "",
      consumption: 0,
      unit: "",
    });
    setFields(values);
    setCount(count + 1);
  }

  function handleRemove() {
    const values = [...fields];
    values.splice(values.length - 1, 1);
    setFields(values);
    setForm({ ...form, ingredients: values });
    setCount(count - 1);
  }

  const handleChangeType = (event) => {
    setForm({ ...form, type: event.target.value });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateOrUpdateProduct = (e) => {
    e.preventDefault();
    if (!singleProduct) {
      dispatch(productActions.createProducts({ ...form, ingredients: fields }));
    } else if (singleProduct) {
      dispatch(productActions.updateProduct(singleProduct._id, form));
    }
    dispatch(productActions.getProducts());
    handleClose();
    setForm({
      type: "",
      unit: "",
      name: "",
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
  };

  const nonCocktailList = listProducts?.filter((e) => {
    return e.type !== "Cocktail";
  });

  const nonMocktailList = nonCocktailList?.filter((e) => {
    return e.type !== "Mocktail";
  });

  const defaultProps = {
    options: nonMocktailList,
    getOptionLabel: (option) => option.name,
  };

  const handleChangeAuto = (event, newValue, idx) => {
    let values = [...fields];
    values[idx].ingredient = newValue?.name;
    values[idx].unit = newValue?.capacityUnit;
    values.forEach((ob, i) => {
      ob.index = i;
      if (i === values[idx].index) {
        ob.cost = newValue?.cost;
        ob.capacity = newValue?.capacity;
      }
    });
    const totalArr = [...values];
    for (var i = 0; i < totalArr.length; i++) {
      if (totalArr[i]._id === newValue?._id) {
        totalArr.splice(i, 1);
      }
    }
    costArr = totalArr.map((e) => e.cost);
    setFields(values);
  };

  useEffect(() => {
    if (singleProduct) {
      setForm({
        type: singleProduct.type,
        unit: singleProduct.unit,
        name: singleProduct.name,
        cost: singleProduct.cost,
        capacity: singleProduct.capacity,
        price: singleProduct.price,
        ingredients: singleProduct.ingredients,
        quantity: singleProduct.quantity,
        capacityUnit: singleProduct.capacityUnit,
        stock: singleProduct.stock,
      });
      setFields(singleProduct.ingredients);
    }
    if (form.type && form.type === "Cocktail") {
      setForm({ ...form, unit: "Ly" });
    }
    if (form.type && form.type === "Food") {
      setForm({ ...form, unit: "Dish" });
    }
    if (form.type && form.type === "Mocktail") {
      setForm({ ...form, unit: "Ly" });
    }
    if (form.type && form.type === "Beer") {
      setForm({ ...form, unit: "Chai" });
    }
    if (form.type && form.type === "Alcohol") {
      setForm({ ...form, unit: "Chai" });
    }
  }, [dispatch, form.type, singleProduct, totalArr]);
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {singleProduct ? "Update Product" : "Create New Product"}
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
                  <MenuItem value={"Cocktail"}>Cocktail</MenuItem>
                  <MenuItem value={"Mocktail"}>Mocktail</MenuItem>
                  <MenuItem value={"Food"}>Food</MenuItem>
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
                disabled
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                disabled={
                  form.type === "Cocktail" ||
                  form.type === "Mocktail" ||
                  form.type === "Food"
                }
                autoComplete="cost"
                variant="outlined"
                id="filled-number"
                name="cost"
                label="Cost"
                type="number"
                onChange={handleChange}
                fullWidth
                value={form.cost}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-number"
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
                  form.type === "Beer" || form.type === "Alcohol" || !form.type
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
                      !form.type
                        ? "none"
                        : null,
                    marginBottom: "10px",
                  }}
                >
                  <Grid item xs={4}>
                    <Autocomplete
                      {...defaultProps}
                      id="combo-box-demo"
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      onChange={(event, newValue) => {
                        handleChangeAuto(event, newValue, idx);
                      }}
                      value={{ name: fields[idx]?.ingredient }}
                      getOptionSelected={(option) => {
                        return option.name === fields[idx]?.ingredient;
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Ingredient"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      key={`${idx}` + 2 + `${field}`}
                      autoComplete="consumption"
                      variant="outlined"
                      id="filled-number"
                      name="consumption"
                      label="Consumption"
                      onChange={(e) => handleChangeInputs(idx, e)}
                      value={fields[idx]?.consumption}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      disabled
                      key={`${idx}`}
                      autoComplete="unit"
                      variant="outlined"
                      id="filled-number"
                      name="unit"
                      label="Unit"
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
                  form.type === "Beer" || form.type === "Alcohol" || !form.type
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
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                display:
                  form.type === "Cocktail" ||
                  !form.type ||
                  form.type === "Mocktail" ||
                  form.type === "Food"
                    ? "none"
                    : null,
                marginBottom: "10px",
              }}
            >
              <TextField
                id="filled-number"
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
                  form.type === "Mocktail" ||
                  form.type === "Food"
                    ? "none"
                    : null,
                marginBottom: "10px",
              }}
            >
              <TextField
                id="filled-number"
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
                  form.type === "Mocktail" ||
                  form.type === "Cocktail" ||
                  form.type === "Food"
                    ? "none"
                    : null,
              }}
            >
              <TextField
                autoComplete="capacity"
                variant="outlined"
                id="filled-number"
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
                id="unit"
                label="Unit Of Capacity Unit"
                name="capacityUnit"
                onChange={handleChange}
                value={form.capacityUnit}
                disabled={true}
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
