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

const DataSensor = () => {
  const [rows, setRows] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [optionData, setOptionData] = useState("All");
  const [sortOrder, setSortOrder] = useState("up");
  const [sortFor, setSortFor] = useState("temperature");
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    setIsLoading(true);
    const data = await axios.get(
      `http://localhost:3001/data-sensor?sortFor=${sortFor}&&sort=${sortOrder}`
    );
    if (data) {
      setIsLoading(false);
    }
    await setRows(data.data);
  };
  const getById = async (id) => {
    if (id) {
      const data = await axios.get(`http://localhost:3001/data-sensor/${id}`);
      setRows([data.data]);
    } else {
      const data = await axios.get(`http://localhost:3001/data-sensor`);
      setRows(data.data);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    await getById(searchTerm);
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
  // change sort
  const handleChangeSortData = (sortflow) => {
    setSortFor(sortflow);
    if (sortOrder === "dow") {
      setSortOrder("up");
    } else {
      setSortOrder("dow");
    }
  };

  //get all data
  useEffect(() => {
    fetchData();
  }, [sortFor, sortOrder]);
  const handleChangeOptionData = (event) => {
    setOptionData(event.target.value);
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

  return (
    <Box sx={{ position: "relative" }}>
      <Grid container marginLeft={"30px"}>
        <Grid item xs={4}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Search </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={optionData}
              label="Option"
              onChange={handleChangeOptionData}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Temperature">Temperature</MenuItem>
              <MenuItem value="Humb">Humb</MenuItem>
              <MenuItem value="Light">Light</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Option</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={optionData}
              label="Option"
              onChange={handleChangeOptionData}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Temperature">Temperature</MenuItem>
              <MenuItem value="Humb">Humb</MenuItem>
              <MenuItem value="Light">Light</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              {optionData === "All" || optionData === "Temperature" ? (
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
                    {sortOrder == "up" && sortFor == "temperature" && (
                      <ArrowDropUpOutlinedIcon />
                    )}
                    {sortOrder == "dow" && sortFor == "temperature" && (
                      <ArrowDropDownOutlinedIcon />
                    )}
                  </Box>
                </TableCell>
              ) : (
                ""
              )}
              {optionData === "All" || optionData === "Humb" ? (
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
                    {sortOrder == "up" && sortFor == "humb" && (
                      <ArrowDropUpOutlinedIcon />
                    )}
                    {sortOrder == "dow" && sortFor == "humb" && (
                      <ArrowDropDownOutlinedIcon />
                    )}
                  </Box>
                </TableCell>
              ) : (
                ""
              )}
              {optionData === "All" || optionData === "Light" ? (
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
                    {sortOrder == "up" && sortFor == "light" && (
                      <ArrowDropUpOutlinedIcon />
                    )}
                    {sortOrder == "dow" && sortFor == "light" && (
                      <ArrowDropDownOutlinedIcon />
                    )}
                  </Box>
                </TableCell>
              ) : (
                ""
              )}
              <TableCell
                onClick={() => handleChangeSortData("creat_at")}
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
                  {sortOrder == "up" && sortFor == "creat_at" && (
                    <ArrowDropUpOutlinedIcon />
                  )}
                  {sortOrder == "dow" && sortFor == "creat_at" && (
                    <ArrowDropDownOutlinedIcon />
                  )}
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows &&
              visibleRows.map((row) => (
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
                  {optionData === "All" || optionData === "Temperature" ? (
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
                  {optionData === "All" || optionData === "Humb" ? (
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
                  {optionData === "All" || optionData === "Light" ? (
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
        count={rows && rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
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
