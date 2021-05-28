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
  const { deleteUser, userId } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        style={{ backgroundColor: "red" }}
      >
        <IconButton aria-label="delete">
          <DeleteOutlineOutlinedIcon style={{ color: "white" }} />
        </IconButton>
      </Button>
      <Popover
        id={id}
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
          Do you want to delete this user?
          <Button
            color="primary"
            onClick={() => {
              deleteUser(userId);
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
