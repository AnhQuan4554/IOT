import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import "../../App.css";

import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import fan from "../../img/fan.png";
import Switch from "@mui/material/Switch";
import WbIncandescentRoundedIcon from "@mui/icons-material/WbIncandescentRounded";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { WeatherInforGrid, WrapDashboard } from "./DasboardStyled";
const Dashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const [isGlow, setIsGlow] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [humidity, setHumidity] = useState();
  const [temperature, setTemperature] = useState();
  const handleFan = () => {
    setIsActive(!isActive);
  };
  const handleLightBulb = () => {
    setIsGlow(!isGlow);
  };
  useEffect(() => {
    const randomValue = Math.floor(Math.random() * 100) + 1;
    const randomValue2 = Math.floor(Math.random() * (50 - -10 + 1)) + -10;

    setHumidity(randomValue);
    setTemperature(randomValue2);
  }, []);
  const getHumidityColor = () => {
    const hue = (humidity / 100) * 120;

    return `hsl(${hue}, 100%, 50%)`;
  };
  const getTemperatureColor = () => {
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
  useEffect(() => {
    if (temperature >= 30) {
      setIsWarning(true);
    }
  }, [temperature]);
  console.log("is temperature", temperature);
  console.log("is humidity", humidity);
  return (
    <WrapDashboard className="wrapDashboard">
      <Grid container>
        <Grid xs={12} item display={"flex"}>
          <WeatherInforGrid
            className={`temperature ${isWarning ? "warning" : ""}`}
            xs={4}
            item
            sx={{ background: getTemperatureColor() }}
          >
            <Grid sx={{ textAlign: "center" }} xs={12}>
              {temperature && temperature}
            </Grid>
            <Grid sx={{ textAlign: "center" }} xs={12}>
              Nhiệt độ
            </Grid>
          </WeatherInforGrid>
          <WeatherInforGrid
            xs={4}
            item
            sx={{ backgroundColor: getHumidityColor() }}
          >
            <Grid sx={{ textAlign: "center" }} xs={12}>
              {humidity && humidity} %
            </Grid>
            <Grid sx={{ textAlign: "center" }} xs={12}>
              Độ ẩm
            </Grid>
          </WeatherInforGrid>
          <WeatherInforGrid xs={4} item>
            <Grid sx={{ textAlign: "center" }} xs={12}>
              20
            </Grid>
            <Grid sx={{ textAlign: "center" }} xs={12}>
              Km/h
            </Grid>
          </WeatherInforGrid>
        </Grid>
        <Grid xs={12} item display={"flex"}>
          <Grid sx={{ border: "1px solid black" }} xs={8} item>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12] }]}
              series={[
                {
                  data: [2, 4.5, 2, 8.5, 1.5, 5],
                },
                {
                  data: [3, 4.5, 5, 6.5, 6.5, 7],
                },
                {
                  data: [5, 7.5, 8, 1.5, 6.5, 7],
                },
              ]}
              height={300}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid sx={{ border: "1px solid black" }} xs={4} item>
            <Grid
              sx={{ border: "1px solid black", padding: "5px" }}
              xs={12}
              item
            >
              <img
                className={`fan-image ${isActive ? "active" : ""}`}
                style={{ maxHeight: "100px" }}
                src={fan}
                alt="fan"
              />
              <Stack
                direction="row"
                display={"flex"}
                justifyContent={"center"}
                spacing={1}
                alignItems="center"
              >
                <Typography>Off</Typography>
                <Switch
                  onClick={handleFan}
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography>On</Typography>
              </Stack>
            </Grid>
            <Grid xs={12} item>
              {isGlow ? (
                <WbIncandescentRoundedIcon
                  sx={{ minWidth: "80px", minHeight: "80px" }}
                />
              ) : (
                <WbIncandescentOutlinedIcon
                  sx={{ minWidth: "80px", minHeight: "80px" }}
                />
              )}
              <Stack
                direction="row"
                display={"flex"}
                justifyContent={"center"}
                spacing={1}
                alignItems="center"
              >
                <Typography>Off</Typography>
                <Switch
                  onClick={handleLightBulb}
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography>On</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WrapDashboard>
  );
};

export default Dashboard;
