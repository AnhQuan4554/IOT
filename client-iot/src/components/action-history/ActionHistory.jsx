import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";

import {
  Grid,
  TableContainer,
  TablePagination,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const ActionHistory = () => {
  const [rows, setRows] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = useState("ASC");
  const [sortForColumnName, setSortForColumnName] = useState("id");
  const [isLoading, setIsLoading] = useState(true);
  const [totalElement, setTotalElement] = useState(null);
  const [optionData, setOptionData] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
  const searchData = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `http://localhost:3001/action-history/search?rowsPerPage=${rowsPerPage}&page=${page}&sort=${sort}&searchForColumnName=${
        Array.isArray(optionData) ? optionData[0] : optionData
      }&value=${searchValue}&startDate=${startDate}&endDate=${endDate}`
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
    searchValue || startDate ? searchData() : fetchData();
  }, [sort, sortForColumnName, page, rowsPerPage]);
  const handleSearch = async () => {
    if (startDate !== "" && endDate === "") {
      alert("End Date not empty");
      return;
    }
    if (startDate === "" && endDate !== "") {
      alert("End Date not empty");
      return;
    }
    searchValue || startDate ? searchData() : fetchData();
  };

  ///
  const handleChangeOptionData = (event) => {
    const { value } = event.target;
    setOptionData(value);
    setStartDate("");
    setEndDate("");
  };
  // change sort
  const handleChangeSortData = (sortflow) => {
    setSortForColumnName(sortflow);
    if (sort === "ASC") {
      setSort("DESC");
    } else {
      setSort("ASC");
    }
  };
  function formatDate(inputDateString) {
    const originalDate = new Date(inputDateString);

    const formattedDate = `${originalDate.getFullYear()}-${(
      originalDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${originalDate.getDate().toString().padStart(2, "0")}`;

    return formattedDate;
  }

  const idOptions = ["id", "deviceName", "action", "create_at"];
  const createOptions = ["create_at", "deviceName", "action", "id"];
  return (
    <Box sx={{ position: "relative" }}>
      <Grid container padding="30px">
        <Grid item xs={6}>
          {optionData[0] === createOptions[0] ? (
            <Grid item xs={12}>
              <Grid container justifyContent={"space-around"}>
                <Grid item xs={5.5}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start date"
                      onChange={(newDate) =>
                        setStartDate(newDate ? formatDate(newDate) : "")
                      }
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={5.5}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End date"
                      onChange={(newDate) =>
                        setEndDate(newDate ? formatDate(newDate) : "")
                      }
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Button onClick={handleSearch}>Search</Button>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <TextField
                label="Search"
                variant="outlined"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <Button onClick={handleSearch}>Search</Button>
            </Grid>
          )}
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Search</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={
                Array.isArray(optionData)
                  ? optionData[0] !== "id"
                    ? createOptions
                    : idOptions
                  : optionData
              }
              label="Option"
              onChange={handleChangeOptionData}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value={idOptions}>id</MenuItem>
              <MenuItem value="deviceName">Device Name</MenuItem>
              <MenuItem value="action">Action</MenuItem>
              <MenuItem value={createOptions}>Create at</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => handleChangeSortData("id")}
                align="center"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography>Id</Typography>{" "}
                  {sort == "ASC" && sortForColumnName == "id" && (
                    <ArrowDropUpOutlinedIcon />
                  )}
                  {sort == "DESC" && sortForColumnName == "id" && (
                    <ArrowDropDownOutlinedIcon />
                  )}
                </Box>
              </TableCell>
              {optionData.includes("all") ||
              optionData.includes("deviceName") ? (
                <TableCell
                  onClick={() => handleChangeSortData("deviceName")}
                  align="center"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Device Name</Typography>{" "}
                    {sort == "ASC" && sortForColumnName == "deviceName" && (
                      <ArrowDropUpOutlinedIcon />
                    )}
                    {sort == "DESC" && sortForColumnName == "deviceName" && (
                      <ArrowDropDownOutlinedIcon />
                    )}
                  </Box>
                </TableCell>
              ) : (
                ""
              )}
              {optionData.includes("all") || optionData.includes("action") ? (
                <TableCell
                  onClick={() => handleChangeSortData("action")}
                  align="center"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Action</Typography>{" "}
                    {sort === "ASC" && sortForColumnName === "action" && (
                      <ArrowDropUpOutlinedIcon />
                    )}
                    {sort === "DESC" && sortForColumnName === "action" && (
                      <ArrowDropDownOutlinedIcon />
                    )}
                  </Box>
                </TableCell>
              ) : (
                ""
              )}
              <TableCell
                onClick={() => handleChangeSortData("create_at")}
                align="center"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography>Creat at</Typography>{" "}
                  {sort === "ASC" && sortForColumnName === "create_at" && (
                    <ArrowDropUpOutlinedIcon />
                  )}
                  {sort === "DESC" && sortForColumnName === "create_at" && (
                    <ArrowDropDownOutlinedIcon />
                  )}
                </Box>
              </TableCell>
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
                  {optionData.includes("all") ||
                  optionData.includes("deviceName") ? (
                    <TableCell align="center">{row.deviceName}</TableCell>
                  ) : (
                    ""
                  )}

                  {optionData.includes("all") ||
                  optionData.includes("action") ? (
                    <TableCell
                      sx={{
                        background: row.action > 0 ? "#23e04a" : "#db7c0b",
                      }}
                      align="center"
                    >
                      {row.action}
                    </TableCell>
                  ) : (
                    ""
                  )}

                  <TableCell align="center" sx={{ width: "200px" }}>
                    {formatDate(row.create_at)}
                  </TableCell>
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
