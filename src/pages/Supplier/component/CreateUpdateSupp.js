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
import {
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@material-ui/core";
import { productActions, supplierActions } from "redux/actions";
import DoneIcon from "@material-ui/icons/Done";
import { toast } from "react-toastify";

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
  root: {
    width: "90%",
    marginTop: theme.spacing(3),
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    color: "#2EC0FF",
    border: "1px solid #2EC0FF",
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

export default function CreateUpdateSupp(props) {
  const { handleClose, singleSupp } = props;
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products.products);
  const [personName, setPersonName] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    link: "",
    products: [],
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdateSupp = (e) => {
    e.preventDefault();
    if (!singleSupp) {
      try {
        dispatch(supplierActions.createSupplier(form));
      } catch (error) {
        console.log(error);
      }

      toast.success("Create Supplier Success");
    } else if (singleSupp) {
      try {
        dispatch(supplierActions.updateSupplier(singleSupp._id, form));
        toast.success("Update Supplier Success");
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(supplierActions.getSuppliers());
    setForm({
      name: "",
      email: "",
      phone: "",
      link: "",
      products: [],
    });
    handleClose();
  };

  const names = products?.map((product) => {
    return product;
  });

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName?.map((e) => e._id).indexOf(name._id) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChangeSelect = (event) => {
    const values = event.target.value;
    const reduceVal = values.reduce((total, value) => {
      let nameIdArr = total?.map((name) => name._id);
      if (nameIdArr.includes(value._id)) {
        return total.filter((e) => {
          return e._id !== value._id;
        });
      } else {
        return [...total, value];
      }
    }, []);
    setPersonName(reduceVal);
    setForm({ ...form, products: reduceVal });
  };

  useEffect(() => {
    dispatch(productActions.getProducts());
    if (singleSupp) {
      setPersonName(singleSupp.products);
      setForm({
        name: singleSupp.name,
        email: singleSupp.email,
        phone: singleSupp.phone,
        link: singleSupp.link,
        products: singleSupp.products,
      });
    }
  }, [dispatch, singleSupp]);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {singleSupp ? "Update Supplier" : "Create New Supplier"}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={handleChange}
                value={form.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                value={form.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="link"
                label="Link"
                name="link"
                onChange={handleChange}
                value={form.link}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel id="demo-mutiple-chip-label">Products</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                fullWidth
                value={personName}
                onChange={handleChangeSelect}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => {
                  return (
                    <div className={classes.chips}>
                      {selected?.map((value) => {
                        return (
                          <Chip
                            className={classes.chip}
                            color="primary"
                            label={value.name}
                            key={value._id}
                            variant="outlined"
                            size="small"
                            clickable
                            deleteIcon={<DoneIcon />}
                          />
                        );
                      })}
                    </div>
                  );
                }}
                MenuProps={MenuProps}
              >
                {names?.map((name) => {
                  return (
                    <MenuItem
                      key={name._id}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleCreateOrUpdateSupp}
            style={{ backgroundColor: "#2EC0FF", color: "white" }}
          >
            {singleSupp ? "Update" : "Create"}
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
