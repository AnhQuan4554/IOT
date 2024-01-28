import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Box, TableContainer } from "@mui/material";

const ActionHistory = () => {
  function createData(id, deviceId, action, time) {
    return { id, deviceId, action, time };
  }
  const rows = [
    createData(1, 159, 1, "2024-05-05"),
    createData(2, 237, 1, "2024-05-05"),
    createData(3, 262, 0, "2024-05-05"),
    createData(4, 305, 1, "2024-05-05"),
    createData(5, 356, 0, "2024-05-05"),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">id</TableCell>
            <TableCell align="center">deviceId</TableCell>
            <TableCell align="center">action</TableCell>
            <TableCell align="center">time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.deviceId}</TableCell>
              <TableCell align="center">{row.action}</TableCell>
              <TableCell align="center">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActionHistory;
