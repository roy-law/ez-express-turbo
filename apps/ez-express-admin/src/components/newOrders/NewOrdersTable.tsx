import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { CSVParcel } from "../CSVReader";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";

type Column = {
  id: keyof CSVParcel;
  label: string;
  minWidth?: number;
  align?: "left" | "right";
  format?: (value: number) => string;
};

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "orderNumber", label: "Order Number", minWidth: 100 },
  { id: "address", label: "Address", minWidth: 170, align: "left" },
  { id: "city", label: "City", minWidth: 100, align: "left" },
  { id: "postalCode", label: "Postal Code", minWidth: 100, align: "left" },
  { id: "phone", label: "Phone", minWidth: 100, align: "left" },
  { id: "notes", label: "Notes", minWidth: 100, align: "left" },
  { id: "parcelsCount", label: "Parcels Count", minWidth: 100, align: "left" },
  { id: "depotEmail", label: "Depot Email", minWidth: 100, align: "left" },
];

interface NewOrdersTableProps {
  rows: CSVParcel[];
  onAddRow: (row: CSVParcel) => void;
  rowsCreationStatus: ParcelCreationStatus;
}

type ParcelCreationStatus = {
  [key: string]: {
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
  };
};

export function NewOrdersTable({
  rows,
  rowsCreationStatus,
  onAddRow,
}: NewOrdersTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                key={"cta buttons"}
                align={"left"}
                style={{ minWidth: 100 }}
              >
                {" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isSuccess =
                  rowsCreationStatus?.[row.orderNumber]?.isSuccess;
                const isLoading =
                  rowsCreationStatus?.[row.orderNumber]?.isLoading;
                const isError = rowsCreationStatus?.[row.orderNumber]?.isError;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.orderNumber}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="left" key={row.orderNumber}>
                      {isSuccess && <CheckCircleOutline />}
                      {isError && <ErrorOutline />}
                      {!isLoading && !isSuccess && !isError && (
                        <button
                          onClick={() => onAddRow(row)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Add
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
