import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export type TableData = {
  name: string;
  age?: string;
  gender?: string;
  referer?: string;
  type?: string;
  dateOfVisit?: string;
};

type Props = { tableData: TableData[] };

const ListTable: React.FC<Props> = ({ tableData }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Referer</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Appointment Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row?.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row?.age}
              </TableCell>
              <TableCell component="th" scope="row">
                {row?.gender}
              </TableCell>
              <TableCell component="th" scope="row">
                {row?.referer}
              </TableCell>
              <TableCell component="th" scope="row">
                {row?.type}
              </TableCell>
              <TableCell component="th" scope="row">
                {row?.dateOfVisit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTable;
