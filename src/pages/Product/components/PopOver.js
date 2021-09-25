import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { Button, IconButton } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function PopOver(props) {
  const { handleDelete, id, role } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const productId = open ? "simple-popover" : undefined;
  return (
    <div>
      <Button
        aria-describedby={id}
        style={{ backgroundColor: "#FF4D4F", height: "40px", width: "20px" }}
        variant="contained"
        onClick={handleClick}
        disabled={role !== "Admin"}
      >
        <IconButton aria-label="delete" color="secondary">
          <DeleteOutlineOutlinedIcon style={{ color: "white" }} />
        </IconButton>
      </Button>
      <Popover
        id={productId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          Do you want to delete this product?
          <Button
            color="primary"
            onClick={() => {
              handleDelete(id);
              handleClose();
            }}
          >
            Yes
          </Button>
          <Button color="secondary" onClick={handleClose}>
            No
          </Button>
        </Typography>
      </Popover>
    </div>
  );
}
