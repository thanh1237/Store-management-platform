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
  const { handleClose, singleProduct } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
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
    ingredients: [
      {
        ingredient: "",
        consumption: 0,
        unit: "",
      },
    ],
  });

  function handleChangeInputs(i, event) {
    let values = [...fields];
    if (!singleProduct) {
    }
    if (event.target.name === "ingredient") {
      values[i].ingredient = event.target.value;
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
  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
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
      console.log("form", form);
      dispatch(productActions.updateProduct(singleProduct._id, form));
    }
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
    });
  };
  useEffect(() => {
    if (singleProduct) {
      setForm({
        type: singleProduct.type,
        unit: singleProduct.unit,
        name: singleProduct.name,
        cost: singleProduct.cost,
        price: singleProduct.price,
        ingredients: singleProduct.ingredients,
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
      setForm({ ...form, unit: "bth" });
    }
  }, [dispatch, form.type, singleProduct]);
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
                autoComplete="cost"
                variant="outlined"
                id="filled-number"
                name="cost"
                label="Cost"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                display: form.type === "Beer" || !form.type ? "none" : null,
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
                    display: form.type === "Beer" || !form.type ? "none" : null,
                    marginBottom: "10px",
                  }}
                >
                  <Grid item xs={3}>
                    <TextField
                      key={`${idx}` + 1 + `${field}`}
                      autoComplete="ingredient"
                      variant="outlined"
                      id="filled-number"
                      name="ingredient"
                      label="Ingredient"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => handleChangeInputs(idx, e)}
                      value={fields[idx]?.ingredient}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      key={`${idx}` + 2 + `${field}`}
                      autoComplete="consumption"
                      variant="outlined"
                      id="filled-number"
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
                  <Grid item xs={3}>
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
                display: form.type === "Beer" || !form.type ? "none" : "flex",
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
