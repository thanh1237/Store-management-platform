import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "redux/actions";
import PopOver from "pages/Account/components/PopOver";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(id, name, email, password, role, action) {
  return { id, name, email, password, role, action };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Account() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.user.users.users);

  const deleteUser = (id) => {
    dispatch(userActions.deleteUser(id));
  };

  const rows = listUsers?.map((user, index) => {
    return createData(
      index,
      user.name,
      user.email,
      user.password,
      user.role,
      <PopOver deleteUser={deleteUser} userId={user._id} />
    );
  });

  useEffect(() => {
    dispatch(userActions.getUsers());
  }, [dispatch]);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Index</StyledTableCell>
            <StyledTableCell align="middle">User Name</StyledTableCell>
            <StyledTableCell align="middle">Email</StyledTableCell>
            <StyledTableCell align="middle">Password</StyledTableCell>
            <StyledTableCell align="middle">Role</StyledTableCell>
            <StyledTableCell align="middle">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="middle">{row.name}</StyledTableCell>
              <StyledTableCell align="middle">{row.email}</StyledTableCell>
              <StyledTableCell align="middle">{row.password}</StyledTableCell>
              <StyledTableCell align="middle">{row.role}</StyledTableCell>
              <StyledTableCell align="middle">{row.action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
