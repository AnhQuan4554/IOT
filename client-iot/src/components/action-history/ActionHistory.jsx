import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Grid,
  TableContainer,
  TablePagination,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { Box } from "@mui/system";
const ActionHistory = () => {
  const [rows, setRows] = useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [timeOrder, setTimeOrder] = useState("None");
  const fetchData = async () => {
    const data = await axios.get(
      `http://localhost:3001/action-history?sort=${timeOrder}`
    );

    setRows(data.data);
  };

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // start handle table show data
  function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);

    return stabilizedThis.map((el) => el[0]);
  }

  const visibleRows = React.useMemo(
    () =>
      rows
        ? stableSort(rows).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
        : [],
    [page, rowsPerPage, rows]
  );

  // end handle table show data
  useEffect(() => {
    fetchData();
  }, [timeOrder]);
  const handleChangeTimeOrder = (event) => {
    setTimeOrder(event.target.value);
  };
  return (
    <Box>
      <Grid container padding="30px">
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Option</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={timeOrder}
              label="Option"
              onChange={handleChangeTimeOrder}
            >
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="LatestFirst">Từ mới nhất đến cũ nhất</MenuItem>
              <MenuItem value="OldestFirst">Từ cũ nhất đến mới nhất</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
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
            {visibleRows &&
              visibleRows.map((row) => (
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows && rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ActionHistory;
