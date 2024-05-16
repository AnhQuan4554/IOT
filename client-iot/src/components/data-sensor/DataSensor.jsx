import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TableContainer,
  TextField,
  Button,
  Grid,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";

const DataSensor = () => {
  const [rows, setRows] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = useState("ASC");
  const [sortForColumnName, setSortForColumnName] = useState("id");
  const [isLoading, setIsLoading] = useState(true);
  const [optionData, setOptionData] = useState("all");
  const [totalElement, setTotalElement] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const fetchData = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `http://localhost:3001/data-sensor?rowsPerPage=${rowsPerPage}&page=${page}&sort=${sort}&sortForColumnName=${sortForColumnName}`
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
      `http://localhost:3001/data-sensor/search?rowsPerPage=${rowsPerPage}&page=${page}&sort=${sort}&searchForColumnName=${
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
  const getTemperatureColor = (temperature) => {
    const normalizedTemperature = Math.min(Math.max(temperature, -10), 40);
    if (temperature <= 4) {
      return "#1565c0";
    } else if (temperature >= 4 && temperature <= 12) {
      return "#64b5f6";
    } else if (temperature > 12 && temperature <= 20) {
      return "#ffcdd2";
    } else if (temperature > 20 && temperature <= 25) {
      return "#ef5350";
    } else if (temperature > 25 && temperature < 30) {
      return "#e53935";
    } else {
      return "#b71c1c";
    }
  };
  const getHumidityColor = (humidity) => {
    const hue = (humidity / 100) * 120;

    return `hsl(${hue}, 100%, 50%)`;
  };
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

  //get all data
  useEffect(() => {
    searchValue || startDate ? searchData() : fetchData();
  }, [sort, sortForColumnName, page, rowsPerPage]);
  const handleChangeOptionData = (event) => {
    const { value } = event.target;
    setOptionData(value);
    setStartDate("");
    setEndDate("");
    setSearchValue("");
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

  // change sort
  const handleChangeSortData = (sortflow) => {
    setSortForColumnName(sortflow);
    if (sort === "ASC") {
      setSort("DESC");
    } else {
      setSort("ASC");
    }
  };
  const idOptions = ["id", "temperature", "humb", "light", "create_at"];
  const createOptions = ["create_at", "temperature", "humb", "light", "id"];

  return (
    <Box sx={{ position: "relative" }}>
      <Grid container marginLeft={"30px"}>
        {optionData[0] === createOptions[0] ? (
          <Grid item xs={4}>
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
          <Grid item xs={4}>
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
              <MenuItem value="temperature">Temperature</MenuItem>
              <MenuItem value="humb">Humb</MenuItem>
              <MenuItem value="light">Light</MenuItem>
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
              optionData.includes("temperature") ? (
                <TableCell
                  onClick={() => handleChangeSortData("temperature")}
                  align="center"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Temperature</Typography>{" "}
                    {sort == "ASC" && sortForColumnName == "temperature" && (
                      <ArrowDropUpOutlinedIcon />
                    )}
                    {sort == "DESC" && sortForColumnName == "temperature" && (
                      <ArrowDropDownOutlinedIcon />
                    )}
                  </Box>
                </TableCell>
              ) : (
                ""
              )}
              {optionData.includes("all") || optionData.includes("humb") ? (
                <TableCell
                  onClick={() => handleChangeSortData("humb")}
                  align="center"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Humb</Typography>{" "}
                    {sort == "ASC" && sortForColumnName == "humb" && (
                      <ArrowDropUpOutlinedIcon />
                    )}
                    {sort == "DESC" && sortForColumnName == "humb" && (
                      <ArrowDropDownOutlinedIcon />
                    )}
                  </Box>
                </TableCell>
              ) : (
                ""
              )}
              {optionData.includes("all") || optionData.includes("light") ? (
                <TableCell
                  onClick={() => handleChangeSortData("light")}
                  align="center"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography>Light</Typography>{" "}
                    {sort == "ASC" && sortForColumnName == "light" && (
                      <ArrowDropUpOutlinedIcon />
                    )}
                    {sort == "DESC" && sortForColumnName == "light" && (
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
                  {sort == "ASC" && sortForColumnName == "create_at" && (
                    <ArrowDropUpOutlinedIcon />
                  )}
                  {sort == "DESC" && sortForColumnName == "create_at" && (
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
                  <TableCell
                    width={"200px"}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    {row.id}
                  </TableCell>
                  {optionData.includes("all") ||
                  optionData.includes("temperature") ? (
                    <TableCell
                      sx={{
                        background: getTemperatureColor(row.temperature),
                        width: "200px",
                      }}
                      align="center"
                    >
                      {row.temperature}
                    </TableCell>
                  ) : (
                    ""
                  )}
                  {optionData.includes("all") || optionData.includes("humb") ? (
                    <TableCell
                      sx={{
                        background: getHumidityColor(row.humb),
                        width: "200px",
                      }}
                      align="center"
                    >
                      {row.humb}
                    </TableCell>
                  ) : (
                    ""
                  )}
                  {optionData.includes("all") ||
                  optionData.includes("light") ? (
                    <TableCell
                      sx={{
                        width: "200px",
                        background: row.light == "1" ? "#00c853" : "#455a64",
                      }}
                      align="center"
                    >
                      {row.light}
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
export default DataSensor;
