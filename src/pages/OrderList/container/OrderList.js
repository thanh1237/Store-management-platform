import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { orderActions } from "redux/actions";
import { useDispatch, useSelector } from "react-redux";
import TableOrder from "pages/OrderList/component/TableOrder";
import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "white",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.loading);
  const listOrders = useSelector((state) => state.order.orders.orders);
  const [updated, setUpdated] = useState(false);

  const noneAdminList = listOrders?.filter(
    (order) => order.author.role !== "Admin"
  );

  useEffect(() => {
    dispatch(orderActions.getOrders());
  }, [dispatch, updated]);

  return loading ? (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  ) : (
    <div className={classes.root} style={{ paddingBottom: "10px" }}>
      {noneAdminList?.map((e) => {
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{
                backgroundColor: "Black",
                borderBottom: "white 1px solid",
              }}
            >
              <Typography className={classes.heading}>
                {`${e.author.name} - ${e.author.role}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableOrder stock={e} setUpdated={setUpdated} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
