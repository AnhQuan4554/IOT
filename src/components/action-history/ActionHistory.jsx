import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableContainer } from "@mui/material";
import axios from "axios";
const ActionHistory = () => {
  const [rows, setRows] = useState();

  const fetchData = async () => {
    const data = await axios.get(`http://localhost:3001/action-history`);

    setRows(data.data);
  };
  console.log("rowssss", rows);

  useEffect(() => {
    fetchData();
  }, []);

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
          {rows &&
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.deviceId}</TableCell>
                <TableCell
                  sx={{ background: row.action > 0 ? "#23e04a" : "#db7c0b" }}
                  align="center"
                >
                  {row.action}
                </TableCell>
                <TableCell align="center">{row.create_at}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActionHistory;
