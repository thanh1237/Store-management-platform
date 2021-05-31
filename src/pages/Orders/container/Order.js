import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "redux/actions";

function getFullName(params) {
  return `${params.getValue(params.id, "firstName") || ""} ${
    params.getValue(params.id, "lastName") || ""
  }`;
}

export default function ValueGetterGrid() {
  const [rows, setRows] = React.useState(defaultRows);
  const dispatch = useDispatch();
  const listProducts = useSelector((state) => state.product.products.products);

  // const handleEditCellChangeCommitted = React.useCallback(
  //   ({ id, field, props }) => {
  //     if (field === "fullName") {
  //       const data = props; // Fix eslint value is missing in prop-types for JS files
  //       const [firstName, lastName] = data.value.toString().split(" ");
  //       const updatedRows = rows.map((row) => {
  //         if (row.id === id) {
  //           return { ...row, firstName, lastName };
  //         }
  //         return row;
  //       });
  //       setRows(updatedRows);
  //     }
  //   },
  //   [rows]
  // );

  console.log(listProducts);
  useEffect(() => {
    dispatch(productActions.getProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Stock Management</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // onEditCellChangeCommitted={handleEditCellChangeCommitted}
        />
      </div>
    </>
  );
}

const columns = [
  { field: "name", headerName: "Product Name", width: 160, editable: true },
  { field: "unit", headerName: "Unit", width: 130, editable: true },
  {
    field: "yesterday",
    headerName: "Yesterday Stock",
    width: 200,
    editable: true,
    valueGetter: getFullName,
    sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
  },
  {
    field: "in",
    headerName: "In",
    width: 100,
    editable: true,
    valueGetter: getFullName,
    sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
  },
  {
    field: "out",
    headerName: "Out",
    width: 100,
    editable: true,
    valueGetter: getFullName,
    sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
  },
  {
    field: "estimate",
    headerName: "Estimate",
    width: 160,
    editable: true,
    valueGetter: getFullName,
    sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
  },
  {
    field: "real",
    headerName: "Real Stock",
    width: 160,
    editable: true,
    valueGetter: getFullName,
    sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
  },
  {
    field: "note",
    headerName: "Note",
    width: 300,
    editable: true,
    valueGetter: getFullName,
    sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
  },
];

const defaultRows = [
  { id: 1, name: "Snow", unit: "Jon" },
  { id: 2, name: "Lannister", unit: "Cersei" },
  { id: 3, name: "Lannister", unit: "Jaime" },
  { id: 4, name: "Stark", unit: "Arya" },
  { id: 5, name: "Targaryen", unit: "Daenerys" },
];
