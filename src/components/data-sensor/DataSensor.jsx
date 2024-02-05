import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TableContainer,
  TextField,
  Button,
  Grid,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const DataSensor = () => {
  const [rows, setRows] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const fetchData = async () => {
    const data = await axios.get(`http://localhost:3001/data-sensor`);
    setRows(data.data);
  };
  const getById = async (id) => {
    const data = await axios.get(`http://localhost:3001/data-sensor/${id}`);

    setRows([data.data]);
  };
  console.log("rowssss", rows);

  useEffect(() => {
    fetchData();
  }, []);
  const getTemperatureColor = (temperature) => {
    const normalizedTemperature = Math.min(Math.max(temperature, -10), 40);
    if (temperature <= 12) {
      return "#244782";
    } else if (temperature > 12 && temperature <= 20) {
      return "#00d4ff";
    } else if (temperature > 20 && temperature <= 25) {
      return "##6a6d73";
    } else if (temperature > 25 && temperature < 30) {
      return "#ff9500";
    } else {
      return "#ff3700";
    }
  };
  const getHumidityColor = (humidity) => {
    const hue = (humidity / 100) * 120;

    return `hsl(${hue}, 100%, 50%)`;
  };
  const handleSearch = async () => {
    console.log("searchTermsearchTerm", searchTerm);
    const data = await getById(searchTerm);
    console.log("da taa byID", data);
  };

  return (
    <Box>
      <Grid container marginLeft={"30px"}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">Temperature</TableCell>
              <TableCell align="center">Humb</TableCell>
              <TableCell align="center">Light</TableCell>
              <TableCell align="center">Creat at</TableCell>
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
                  <TableCell
                    sx={{ background: getTemperatureColor(row.temperature) }}
                    align="center"
                  >
                    {row.temperature}
                  </TableCell>
                  <TableCell
                    sx={{ background: getHumidityColor(row.humb) }}
                    align="center"
                  >
                    {row.humb}
                  </TableCell>
                  <TableCell align="center">{row.light}</TableCell>
                  <TableCell align="center">{row.create_at}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default DataSensor;
