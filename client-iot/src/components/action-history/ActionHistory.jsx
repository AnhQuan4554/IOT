import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = useState("ASC");
  const [sortForColumnName, setSortForColumnName] = useState("id");
  const [isLoading, setIsLoading] = useState(true);
  const [totalElement, setTotalElement] = useState(null);
  const fetchData = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `http://localhost:3001/action-history?rowsPerPage=${rowsPerPage}&page=${page}&sort=${sort}&sortForColumnName=${sortForColumnName}`
    );

    if (data) {
      setIsLoading(false);
    }

    await setRows(data.data);
    await setTotalElement(data.totalItems);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // end handle table show data
  useEffect(() => {
    fetchData();
  }, [sort, sortForColumnName, page, rowsPerPage]);
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };
  const handleChangeSortForColum = (event) => {
    setSortForColumnName(event.target.value);
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Grid container padding="30px">
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort For</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortForColumnName}
              label="Option"
              onChange={handleChangeSortForColum}
            >
              <MenuItem value="id">Id</MenuItem>
              <MenuItem value="deviceName">Device Name</MenuItem>
              <MenuItem value="action">Action</MenuItem>
              <MenuItem value="create_at">Create at</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Option"
              onChange={handleChangeSort}
            >
              <MenuItem value="ASC">Từ bé đến lớn</MenuItem>
              <MenuItem value="DESC">Từ lớn đến bé</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Device Name</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Create at</TableCell>
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
                  <TableCell align="center">{row.deviceName}</TableCell>
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
        count={totalElement && totalElement}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Thêm transform
            width: "100%",
            height: "100%",
          }}
        >
          <CircularProgress
            size={"100px"}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ActionHistory;
